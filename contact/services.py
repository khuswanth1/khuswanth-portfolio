"""Delivery of contact messages: SMTP first, Resend as fallback, webhook as a side notification."""
import json
import logging
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)

# The webhook is best-effort and must not hold up the response, so it runs on a
# small bounded pool. Bounded so a slow webhook can't pile up unlimited threads.
_webhook_pool = ThreadPoolExecutor(max_workers=2, thread_name_prefix="webhook")


class DeliveryError(Exception):
    pass


def _subject(data):
    return f"[Portfolio] Message from {data['name']}"


def _body(data):
    return (
        "You have received a new message from your portfolio website.\n\n"
        f"Name:    {data['name']}\n"
        f"Email:   {data['email']}\n\n"
        "Message:\n"
        f"{data['message']}\n\n"
        f"Reply directly to this email to respond to {data['name']}.\n"
    )


def _send_smtp(data):
    # The visitor's address goes in Reply-To only. Putting it in From would be
    # spoofing and Gmail/SPF/DMARC would reject or junk it.
    EmailMessage(
        subject=_subject(data),
        body=_body(data),
        from_email=f"Portfolio Contact <{settings.EMAIL_FROM}>",
        to=[settings.EMAIL_TO],
        reply_to=[f"{data['name']} <{data['email']}>"],
    ).send(fail_silently=False)


def _post_json(url, payload, headers=None):
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "User-Agent": "portfolio-api/1.0", **(headers or {})},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=settings.OUTBOUND_HTTP_TIMEOUT) as response:
        return response.status


def _send_resend(data):
    _post_json(
        "https://api.resend.com/emails",
        {
            "from": settings.RESEND_FROM,
            "to": [settings.EMAIL_TO],
            "reply_to": data["email"],
            "subject": _subject(data),
            "text": _body(data),
        },
        headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
    )


def deliver(data, request_id):
    """Send the message to the owner's inbox. Returns the channel used, raises DeliveryError."""
    try:
        _send_smtp(data)
        return "smtp"
    except Exception as exc:  # smtplib/socket/ssl errors all land here
        logger.error("[%s] SMTP delivery failed: %s: %s", request_id, type(exc).__name__, exc)

    if settings.RESEND_API_KEY and settings.RESEND_FROM:
        try:
            _send_resend(data)
            return "resend"
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            logger.error("[%s] Resend fallback failed: %s", request_id, exc)

    raise DeliveryError("All delivery channels failed")


def _webhook_payload(url, data, channel):
    if "discord.com" in url:
        return {
            "content": "**New portfolio contact submission**",
            "allowed_mentions": {"parse": []},  # stop visitors pinging @everyone
            "embeds": [{
                "title": f"Message from {data['name']}",
                "color": 3719160,
                "fields": [
                    {"name": "Name", "value": data["name"], "inline": True},
                    {"name": "Email", "value": data["email"], "inline": True},
                    {"name": "Message", "value": data["message"][:1024]},
                ],
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }],
        }
    if "hooks.slack.com" in url:
        # Escaping &, <, > stops visitors injecting <!channel> pings or fake links.
        esc = {k: v.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") for k, v in data.items()}
        return {"text": f"*New portfolio contact* from {esc['name']} ({esc['email']})\n{esc['message']}"}
    return {
        "event": "contact_form_submission",
        "data": {**data, "delivered_via": channel},
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def _post_webhook(data, channel, request_id):
    url = settings.WEBHOOK_URL
    try:
        _post_json(url, _webhook_payload(url, data, channel))
    except Exception as exc:
        logger.warning("[%s] Webhook failed: %s", request_id, exc)


def notify_webhook(data, channel, request_id):
    if settings.WEBHOOK_URL:
        _webhook_pool.submit(_post_webhook, data, channel, request_id)
