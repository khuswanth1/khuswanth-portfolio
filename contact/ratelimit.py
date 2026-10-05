"""Fixed-window per-IP rate limiting on top of Django's cache."""
import hashlib

from django.conf import settings
from django.core.cache import cache


def client_ip(request):
    """Real client IP, trusting only as many X-Forwarded-For hops as we have proxies.

    Each proxy appends the address it received the request from, so with N trusted
    proxies the client is the N-th entry from the right. Entries further left are
    client-supplied and can be spoofed, so they are ignored.
    """
    hops = settings.TRUSTED_PROXY_COUNT
    if hops:
        forwarded = [ip.strip() for ip in request.META.get("HTTP_X_FORWARDED_FOR", "").split(",") if ip.strip()]
        if len(forwarded) >= hops:
            return forwarded[-hops]
    return request.META.get("REMOTE_ADDR", "unknown")


def hit(scope, ident, limit, window):
    """Record one hit; return (allowed, retry_after_seconds)."""
    digest = hashlib.sha256(ident.encode()).hexdigest()[:32]  # don't keep raw IPs in the cache
    key = f"rl:{scope}:{digest}"
    if cache.add(key, 1, timeout=window):
        return True, 0
    try:
        count = cache.incr(key)
    except ValueError:  # expired between add() and incr()
        cache.add(key, 1, timeout=window)
        return True, 0
    return count <= limit, window
