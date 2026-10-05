import json
from unittest import mock

from django.core import mail
from django.core.cache import cache
from django.test import SimpleTestCase, override_settings

VALID = {
    "name": "Jane Doe",
    "email": "Jane@Example.com",
    "message": "I would like to discuss a role with you.",
}


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    EMAIL_TO="owner@example.com",
    EMAIL_FROM="owner@example.com",
    CONTACT_RATE_LIMIT=3,
    TRUSTED_PROXY_COUNT=0,
    WEBHOOK_URL="",
    RESEND_API_KEY="",
)
class ContactApiTests(SimpleTestCase):
    def setUp(self):
        cache.clear()

    def post(self, body, **extra):
        return self.client.post("/api/contact", data=json.dumps(body), content_type="application/json", **extra)

    def test_valid_message_is_emailed_to_owner(self):
        res = self.post(VALID)
        self.assertEqual(res.status_code, 200)
        self.assertTrue(res.json()["success"])
        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertEqual(sent.to, ["owner@example.com"])
        self.assertIn("owner@example.com", sent.from_email)
        self.assertEqual(sent.reply_to, ["Jane Doe <jane@example.com>"])
        self.assertIn(VALID["message"], sent.body)

    def test_validation_errors_match_frontend_shape(self):
        res = self.post({"name": "J", "email": "nope", "message": "short"})
        self.assertEqual(res.status_code, 422)
        fields = {e["field"] for e in res.json()["errors"]}
        self.assertEqual(fields, {"name", "email", "message"})
        self.assertEqual(len(mail.outbox), 0)

    def test_non_string_fields_are_rejected(self):
        res = self.post({**VALID, "name": {"$ne": ""}})
        self.assertEqual(res.status_code, 422)

    def test_malformed_json(self):
        res = self.client.post("/api/contact", data="{bad", content_type="application/json")
        self.assertEqual(res.status_code, 400)
        self.assertFalse(res.json()["success"])

    def test_oversized_body_is_refused(self):
        res = self.post({**VALID, "message": "x" * 50_000})
        self.assertEqual(res.status_code, 400)

    def test_rate_limit(self):
        for _ in range(3):
            self.assertEqual(self.post(VALID).status_code, 200)
        res = self.post(VALID)
        self.assertEqual(res.status_code, 429)
        self.assertIn("Retry-After", res)

    @override_settings(TRUSTED_PROXY_COUNT=1)
    def test_rate_limit_ignores_spoofed_forwarded_for(self):
        for i in range(3):
            self.post(VALID, HTTP_X_FORWARDED_FOR=f"10.0.0.{i}, 203.0.113.9")
        res = self.post(VALID, HTTP_X_FORWARDED_FOR="10.9.9.9, 203.0.113.9")
        self.assertEqual(res.status_code, 429)

    def test_smtp_failure_returns_502_not_fake_success(self):
        with mock.patch("contact.services._send_smtp", side_effect=OSError("smtp down")):
            res = self.post(VALID)
        self.assertEqual(res.status_code, 502)
        self.assertFalse(res.json()["success"])

    @override_settings(RESEND_API_KEY="re_test", RESEND_FROM="x@example.com")
    def test_falls_back_to_resend(self):
        with mock.patch("contact.services._send_smtp", side_effect=OSError("quota")), \
             mock.patch("contact.services._send_resend") as resend:
            res = self.post(VALID)
        self.assertEqual(res.status_code, 200)
        resend.assert_called_once()

    def test_get_not_allowed(self):
        self.assertEqual(self.client.get("/api/contact").status_code, 405)

    def test_cors_preflight_for_allowed_origin(self):
        res = self.client.options(
            "/api/contact",
            HTTP_ORIGIN="http://localhost:3000",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )
        self.assertEqual(res["Access-Control-Allow-Origin"], "http://localhost:3000")

    def test_cors_blocks_unknown_origin(self):
        res = self.post(VALID, HTTP_ORIGIN="https://evil.example")
        self.assertNotIn("Access-Control-Allow-Origin", res)

    def test_health_and_404_are_json(self):
        self.assertEqual(self.client.get("/api/health").json()["status"], "ok")
        res = self.client.get("/nope")
        self.assertEqual(res.status_code, 404)
        self.assertFalse(res.json()["success"])
