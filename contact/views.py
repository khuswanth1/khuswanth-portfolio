import json
import logging
import time
import uuid

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from . import ratelimit, services
from .forms import ContactForm

logger = logging.getLogger(__name__)

_STARTED = time.monotonic()
# Global cap on sends per day, so a botnet rotating IPs can't burn the Gmail quota.
_DAILY_SEND_LIMIT = 200


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

    allowed, retry_after = ratelimit.hit(
        "contact",
        ratelimit.client_ip(request),
        settings.CONTACT_RATE_LIMIT,
        settings.CONTACT_RATE_WINDOW_SECONDS,
    )
    if allowed:
        allowed, retry_after = ratelimit.hit("contact-global", "all", _DAILY_SEND_LIMIT, 24 * 3600)
    if not allowed:
        response = _error(429, "Too many messages sent. Please try again later.")
        response["Retry-After"] = str(retry_after)
        return response

    data = form.cleaned_data
    try:
        channel = services.deliver(data, request_id)
    except services.DeliveryError:
        return _error(
            502,
            f"Sorry, your message couldn't be sent right now. Please email me directly at {settings.EMAIL_TO}.",
        )

    # Log metadata only; the message itself lives in the inbox, not in server logs.
    logger.info("[%s] Contact message delivered via %s (sender domain: %s)",
                request_id, channel, data["email"].rsplit("@", 1)[-1])
    services.notify_webhook(data, channel, request_id)

    return JsonResponse({"success": True, "message": "Message sent! I'll get back to you soon."})


def bad_request(request, exception=None):
    return _error(400, "Bad request.")


def not_found(request, exception=None):
    return _error(404, f"Route not found: {request.method} {request.path}")


def server_error(request):
    return _error(500, "Internal server error.")
