import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LuSend, LuMail, LuLinkedin, LuGithub, LuMapPin, LuPhone, LuLoaderCircle, LuCopy, LuCheck,
} from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Toast from '../components/Toast';
import { personal } from '../data/personal';
import { track } from '../lib/analytics';

const API_URL = (import.meta.env.VITE_API_URL || '').split(',')[0].trim().replace(/\/$/, '');
const INITIAL_FORM = { name: '', email: '', message: '', website: '' };
const LIMITS = { name: 80 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Mirrors the server rules in server/contact/forms.py.
function validateField(name, value) {
  const v = value.trim();
  switch (name) {
    case 'name':
      if (v.length < 2) return 'Please enter your name.';
      if (v.length > LIMITS.name) return `Name must be at most ${LIMITS.name} characters.`;
      return '';
    case 'email':
      return EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.';
    case 'message':
      if (v.length < 10) return 'Message should be at least 10 characters.';
      return '';
    default:
      return '';
  }
}

const contactLinks = [
  { icon: LuMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: LuLinkedin, label: 'LinkedIn', value: 'in/khuswanth-rao-jadav', href: personal.linkedin, external: true },
  { icon: LuGithub, label: 'GitHub', value: 'github.com/khuswanth1', href: personal.github, external: true },
  { icon: LuPhone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
  { icon: LuMapPin, label: 'Location', value: personal.location },
];

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-slate-200">
          {label}
        </label>
        {hint}
      </div>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-[1.25rem] text-xs font-medium text-rose-400" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' }); // idle | loading | success | error
  const [toast, setToast] = useState(null);

  // Free hosts put idle servers to sleep. A background ping when the page loads wakes the API
  // so it is ready by the time a visitor reaches the form. The response is ignored (no-cors).
  useEffect(() => {
    if (API_URL) fetch(`${API_URL}/`, { mode: 'no-cors' }).catch(() => {});
  }, []);
  const closeToast = useCallback(() => setToast(null), []);
  const notify = (type, title, message, action) => setToast({ id: Date.now(), type, title, message, action });
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = Object.fromEntries(['name', 'email', 'message'].map((k) => [k, validateField(k, form[k])]));
    setErrors(next);
    const firstInvalid = Object.keys(next).find((k) => next[k]);
    if (firstInvalid) {
      notify('error', 'Check your details', next[firstInvalid]);
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    if (form.website) {
      setStatus({ type: 'success', message: "Thanks! Your message has been sent." });
      notify('success', 'Message sent', 'Thanks! Your message has been sent.');
      setForm(INITIAL_FORM);
      return;
    }

    const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };

    // Without a configured API, hand the message to the visitor's email app instead.
    if (!API_URL) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus({ type: 'success', message: 'Your email app should open with the message ready to send.' });
      notify('success', 'Almost there', 'Your email app should open with the message ready to send.');
      return;
    }

    setStatus({ type: 'loading', message: '' });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 422 && Array.isArray(data.errors)) {
        const fieldErrors = Object.fromEntries(
          data.errors.filter((er) => er?.field).map((er) => [er.field, er.message])
        );
        setErrors(fieldErrors);
        throw new Error('Please fix the highlighted fields.');
      }
      if (res.status === 429) {
        throw new Error('Too many messages from this network. Please try again later or email me directly.');
      }
      if (!res.ok) {
        throw new Error(data.error || data.message || 'The message could not be delivered.');
      }

      const okMessage = data.message || "Thanks! Your message has been sent — I'll reply soon.";
      setStatus({ type: 'success', message: okMessage });
      notify('success', 'Message sent', okMessage);
      setForm(INITIAL_FORM);
      setErrors({});
      track('contact_submit');
    } catch (err) {
      const message =
        err.name === 'AbortError' || err instanceof TypeError
          ? "Couldn't reach the server. Please check your connection or email me directly."
          : err.message;
      setStatus({ type: 'error', message });
      notify(
        'error',
        'Message not sent',
        message,
        <a href={`mailto:${personal.email}`} className="mt-1.5 inline-block text-sm font-semibold text-rose-300 underline">
          {personal.email}
        </a>
      );
    } finally {
      clearTimeout(timeout);
    }
  };

  const loading = status.type === 'loading';

  return (
    <Section
      id="contact"
      kicker="Contact"
      title="Let's talk"
      description="Hiring for a Frontend, React or Full-Stack role, or have a project in mind? Send a message — I usually reply within a day."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-3">
          {contactLinks.map(({ icon: IconComp, label, value, href, external }) => {
            const content = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30">
                  <IconComp className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-slate-400">{label}</span>
                  <span className="block truncate text-sm font-semibold text-white">{value}</span>
                </span>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="card card-hover flex items-center gap-4 p-4 border-line/20 bg-surface/90"
              >
                {content}
              </a>
            ) : (
              <div key={label} className="card flex items-center gap-4 p-4 border-line/20 bg-surface/90">
                {content}
              </div>
            );
          })}
          <button type="button" onClick={copyEmail} className="btn-ghost w-full">
            {copied ? <LuCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" /> : <LuCopy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Email copied to clipboard' : 'Copy email address'}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8 border-line/20 bg-surface/90">
            <div className="grid gap-x-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby="name-error"
                  className="field"
                  placeholder="Your name"
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="email-error"
                  className="field"
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field
              id="message"
              label="Message"
              error={errors.message}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby="message-error"
                className="field resize-y"
                placeholder="Tell me about the role or project…"
              />
            </Field>

            {/* Honeypot (hidden from people and assistive tech) */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
            </div>

            <button type="submit" disabled={loading} className="btn-accent w-full sm:w-auto">
              {loading ? (
                <>
                  <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <LuSend className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
      <Toast toast={toast} onClose={closeToast} />
    </Section>
  );
}