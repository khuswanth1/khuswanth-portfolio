/**
 * Privacy-friendly analytics (opt-in).
 *
 * Off by default. Set VITE_ANALYTICS=vercel to load Vercel Web Analytics, which is
 * cookieless and doesn't collect personal data. Visitors who send Do Not Track or
 * Global Privacy Control are never tracked. No third-party script loads otherwise.
 */
const provider = import.meta.env.VITE_ANALYTICS;

const optedOut = () =>
  typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true);

const enabled = () => provider === 'vercel' && import.meta.env.PROD && !optedOut();

export function initAnalytics() {
  if (!enabled()) return;
  window.va =
    window.va ||
    function queue(...args) {
      (window.vaq = window.vaq || []).push(args);
    };
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
}

/** Record a named event (e.g. resume download). No-op when analytics is disabled. */
export function track(name, data) {
  if (enabled() && window.va) window.va('event', { name, data });
}
