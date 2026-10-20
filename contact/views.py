import json
import logging
import time
import uuid
from datetime import datetime, timezone

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from . import ratelimit, services
from .forms import ContactForm

logger = logging.getLogger(__name__)

_STARTED = time.monotonic()
# Global cap on sends per day, so a botnet rotating IPs can't burn the Gmail quota.


def _error(status, message, **extra):
    return JsonResponse({"success": False, "message": message, "error": message, **extra}, status=status)


@require_GET
def index(request):
    return JsonResponse({
        "name": "Khuswanth Rao Jadav — Portfolio API",
        "endpoints": ["POST /api/contact", "GET /api/health"],
    })


@require_GET
def health(request):
    return JsonResponse({"status": "ok", "uptime": round(time.monotonic() - _STARTED)})


@require_GET
def submissions(request):
    key = request.GET.get("key", "")
    expected = settings.SECRET_KEY[:10]
    if key != expected:
        return JsonResponse({"error": "Unauthorized. Pass ?key=<secret-prefix>"}, status=401)

    submissions_file = settings.BASE_DIR / "contact_submissions.jsonl"
    if not submissions_file.exists():
        return JsonResponse({"count": 0, "submissions": []})
    try:
        with open(submissions_file, "r", encoding="utf-8") as f:
            items = [json.loads(line) for line in f if line.strip()]
        return JsonResponse({"count": len(items), "submissions": items[-50:]})
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=500)


# CSRF protection guards cookie-authenticated requests. This endpoint uses no
# cookies or sessions, and cross-site abuse is handled by CORS + rate limiting.
@csrf_exempt
@require_POST
def contact(request):
    request_id = uuid.uuid4().hex[:12]

    if request.content_type == "application/json":
        try:
            payload = json.loads(request.body or b"{}")
        except (json.JSONDecodeError, UnicodeDecodeError):
            return _error(400, "Request body must be valid JSON.")
        if not isinstance(payload, dict):
            return _error(400, "Request body must be a JSON object.")
        # Only strings are accepted; anything else is treated as missing.
        payload = {k: v for k, v in payload.items() if isinstance(v, str)}
    else:
        payload = request.POST

    form = ContactForm(payload)
    if not form.is_valid():
        errors = [
            {"field": field, "message": str(messages[0])}
            for field, messages in form.errors.items()
        ]
        return _error(422, "Please fix the highlighted fields.", errors=errors)

    # Sending is unlimited by default. Set CONTACT_RATE_LIMIT (per IP) and/or CONTACT_DAILY_LIMIT
    # to a number above 0 to switch the limits on.
    if settings.CONTACT_RATE_LIMIT > 0 or settings.CONTACT_DAILY_LIMIT > 0:
        allowed, retry_after = True, 0
        if settings.CONTACT_RATE_LIMIT > 0:
            allowed, retry_after = ratelimit.hit(
                "contact",
                ratelimit.client_ip(request),
                settings.CONTACT_RATE_LIMIT,
                settings.CONTACT_RATE_WINDOW_SECONDS,
            )
        if allowed and settings.CONTACT_DAILY_LIMIT > 0:
            allowed, retry_after = ratelimit.hit("contact-global", "all", settings.CONTACT_DAILY_LIMIT, 24 * 3600)
        if not allowed:
            response = _error(429, "Too many messages sent. Please try again later.")
            response["Retry-After"] = str(retry_after)
            return response

    data = form.cleaned_data

    # Persist the submission locally so incoming messages are never lost
    submissions_file = settings.BASE_DIR / "contact_submissions.jsonl"
    try:
        with open(submissions_file, "a", encoding="utf-8") as f:
            f.write(json.dumps({
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "request_id": request_id,
                "name": data["name"],
                "email": data["email"],
                "message": data["message"],
            }) + "\n")
    except Exception as save_err:
        logger.error("[%s] Failed to save submission to file: %s", request_id, save_err)

    try:
        channel = services.deliver(data, request_id)
        logger.info("[%s] Contact message delivered via %s (sender domain: %s)",
                    request_id, channel, data["email"].rsplit("@", 1)[-1])
        if channel != "webhook":
            services.notify_webhook(data, channel, request_id)
    except services.DeliveryError:
        # On hosts where outbound SMTP is blocked (e.g. Render Free Tier) and no external API key is active,
        # log the full message prominently to server logs so the developer can see it in Render dashboard
        logger.warning(
            "[%s] CONTACT MESSAGE RECEIVED (Logged & saved; external SMTP/API unavailable on host):\n"
            "From: %s <%s>\nMessage: %s",
            request_id, data["name"], data["email"], data["message"],
        )

    return JsonResponse({"success": True, "message": "Message sent! I'll get back to you soon."})


def bad_request(request, exception=None):
    return _error(400, "Bad request.")


def not_found(request, exception=None):
    return _error(404, f"Route not found: {request.method} {request.path}")


def server_error(request):
    return _error(500, "Internal server error.")
