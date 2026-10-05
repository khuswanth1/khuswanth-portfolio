"""
Django settings for the portfolio contact API.

Everything is driven by server/.env (same keys the old Node server used), so the
file can be shared between local dev and the hosting provider's env settings.
The API is stateless: no database, no sessions, no admin.
"""
import logging
import os
import secrets
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

logger = logging.getLogger(__name__)


def env(name, default=""):
    return os.environ.get(name, default).strip()


def env_bool(name, default=False):
    value = env(name)
    return value.lower() in {"1", "true", "yes", "on"} if value else default


def env_list(name, default=""):
    return [item.strip() for item in env(name, default).split(",") if item.strip()]


def env_int(name, default):
    try:
        return int(env(name) or default)
    except ValueError as exc:
        raise ImproperlyConfigured(f"{name} must be an integer") from exc


# ── Core ──────────────────────────────────────────────────────────────
APP_ENV = (env("APP_ENV") or env("NODE_ENV") or "production").lower()
IS_PRODUCTION = APP_ENV == "production"
DEBUG = env_bool("DJANGO_DEBUG", default=not IS_PRODUCTION)

# Nothing in this API is signed (no sessions/cookies), so a per-process random
# key is safe as a fallback. Set DJANGO_SECRET_KEY anyway for production.
SECRET_KEY = env("DJANGO_SECRET_KEY") or secrets.token_urlsafe(50)

ALLOWED_HOSTS = env_list("ALLOWED_HOSTS")
if env("RENDER_EXTERNAL_HOSTNAME"):
    ALLOWED_HOSTS.append(env("RENDER_EXTERNAL_HOSTNAME"))
if not IS_PRODUCTION:
    ALLOWED_HOSTS += ["localhost", "127.0.0.1", "[::1]", "testserver"]
if IS_PRODUCTION and not ALLOWED_HOSTS:
    raise ImproperlyConfigured("Set ALLOWED_HOSTS (e.g. api.yourdomain.com) when NODE_ENV=production")

PORT = env_int("PORT", 5000)

INSTALLED_APPS = [
    "corsheaders",
    "contact",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "portfolio_api.urls"
WSGI_APPLICATION = "portfolio_api.wsgi.application"
APPEND_SLASH = False

DATABASES = {}
USE_TZ = True
TIME_ZONE = "UTC"

# ── Request limits ────────────────────────────────────────────────────
# A contact message is < 3 KB of JSON; refuse anything far bigger before parsing.
DATA_UPLOAD_MAX_MEMORY_SIZE = 16 * 1024
DATA_UPLOAD_MAX_NUMBER_FIELDS = 20

# ── Security headers ──────────────────────────────────────────────────
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "no-referrer"
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin"
X_FRAME_OPTIONS = "DENY"

# Number of reverse proxies in front of the app (Render/Railway/Nginx = 1).
# Used to read the real client IP for rate limiting. 0 = trust REMOTE_ADDR only.
TRUSTED_PROXY_COUNT = env_int("TRUSTED_PROXY_COUNT", 1 if IS_PRODUCTION else 0)
if TRUSTED_PROXY_COUNT:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

if IS_PRODUCTION:
    SECURE_SSL_REDIRECT = env_bool("SECURE_SSL_REDIRECT", True)
    SECURE_REDIRECT_EXEMPT = [r"^api/health$"]
    SECURE_HSTS_SECONDS = env_int("SECURE_HSTS_SECONDS", 31536000)

# ── CORS ──────────────────────────────────────────────────────────────
# The frontend sends no cookies, so credentials stay off.
CORS_ALLOWED_ORIGINS = env_list("ALLOWED_ORIGIN", "http://localhost:3000")
if not IS_PRODUCTION:
    CORS_ALLOWED_ORIGIN_REGEXES = [r"^http://(localhost|127\.0\.0\.1)(:\d+)?$"]
CORS_ALLOW_METHODS = ["GET", "POST", "OPTIONS"]
CORS_ALLOW_HEADERS = ["content-type"]
CORS_ALLOW_CREDENTIALS = False
CORS_PREFLIGHT_MAX_AGE = 86400
CORS_URLS_REGEX = r"^/api/.*$"

# ── Cache (rate limiting) ─────────────────────────────────────────────
# In-process memory is enough for one instance. With several workers or
# instances, point REDIS_URL at Redis (and `pip install redis`) so the limit is shared.
if env("REDIS_URL"):
    CACHES = {"default": {"BACKEND": "django.core.cache.backends.redis.RedisCache", "LOCATION": env("REDIS_URL")}}
else:
    CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache", "LOCATION": "contact"}}

CONTACT_RATE_LIMIT = env_int("CONTACT_RATE_LIMIT", 5 if IS_PRODUCTION else 100)
CONTACT_RATE_WINDOW_SECONDS = env_int("CONTACT_RATE_WINDOW_SECONDS", 15 * 60)

# ── Email (SMTP) ──────────────────────────────────────────────────────
EMAIL_HOST = env("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = env_int("EMAIL_PORT", 587)
EMAIL_USE_SSL = env_bool("EMAIL_SECURE")  # implicit TLS, usually port 465
EMAIL_USE_TLS = not EMAIL_USE_SSL  # STARTTLS, usually port 587
EMAIL_HOST_USER = env("EMAIL_USER")
# Google shows app passwords as "abcd efgh ijkl mnop"; SMTP wants them without spaces.
EMAIL_HOST_PASSWORD = env("EMAIL_PASS").replace(" ", "")
EMAIL_TIMEOUT = env_int("EMAIL_TIMEOUT", 10)

EMAIL_TO = env("EMAIL_TO") or EMAIL_HOST_USER
EMAIL_FROM = env("EMAIL_FROM") or EMAIL_HOST_USER

if EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
elif IS_PRODUCTION:
    raise ImproperlyConfigured("EMAIL_PASS is required when NODE_ENV=production")
else:
    # Dev without credentials: print emails to the terminal instead of sending.
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

if EMAIL_HOST_PASSWORD and not EMAIL_TO:
    raise ImproperlyConfigured("Set EMAIL_TO (or EMAIL_USER) so messages have a recipient")

if EMAIL_PORT not in {25, 465, 587, 2525}:
    logger.warning("EMAIL_PORT=%s is unusual; Gmail uses 587 (STARTTLS) or 465 (EMAIL_SECURE=true)", EMAIL_PORT)
if EMAIL_USE_SSL and EMAIL_PORT == 587:
    logger.warning("EMAIL_SECURE=true with port 587 will fail; use 465, or EMAIL_SECURE=false")

# Optional fallback provider when SMTP fails (e.g. Gmail daily quota).
RESEND_API_KEY = env("RESEND_API_KEY")
RESEND_FROM = env("RESEND_FROM").strip('"')

# Optional notification (Discord / Slack / any HTTPS endpoint).
WEBHOOK_URL = env("WEBHOOK_URL")
if WEBHOOK_URL and not WEBHOOK_URL.startswith("https://"):
    raise ImproperlyConfigured("WEBHOOK_URL must use https://")

OUTBOUND_HTTP_TIMEOUT = 8

# ── Logging ───────────────────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"plain": {"format": "%(asctime)s %(levelname)s %(name)s: %(message)s"}},
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "plain"},
        "file": {"class": "logging.FileHandler", "filename": "django_debug.log", "formatter": "plain"},
    },
    "root": {"handlers": ["console", "file"], "level": "INFO"},
    "loggers": {"django.request": {"handlers": ["console", "file"], "level": "ERROR", "propagate": False}},
}
