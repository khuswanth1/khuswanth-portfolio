import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Email,
  LocationOn,
  Send,
  CheckCircleOutline,
  ErrorOutline,
  Phone,
  GitHub,
  LinkedIn,
  RestartAlt,
} from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { personal } from '../data/personal';
import useInView from '../hooks/useInView';

const INITIAL_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

  const triggerFrontendWebhook = async (payload) => {
    if (!WEBHOOK_URL) return;
    try {
      const isDiscordOrSlack = WEBHOOK_URL.includes('discord.com') || WEBHOOK_URL.includes('slack.com');
      const bodyData = isDiscordOrSlack
        ? {
            content: `**New Portfolio Contact Submission**`,
            embeds: [
              {
                title: "Frontend Contact Submission",
                color: 3719160,
                fields: [
                  { name: "Name", value: payload.name || "N/A", inline: true },
                  { name: "Email", value: payload.email || "N/A", inline: true },
                  { name: "Message", value: payload.message || "N/A" },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : {
            event: 'frontend_contact_submission',
            data: payload,
            timestamp: new Date().toISOString(),
          };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      console.log('Frontend Webhook sent successfully to:', WEBHOOK_URL);
    } catch (err) {
      console.warn('Frontend Webhook warning:', err.message);
    }
  };

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    // Trigger optional frontend webhook
    triggerFrontendWebhook(payload);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorText = Array.isArray(data.errors)
          ? data.errors.map((e) => (typeof e === 'object' ? e.message : e)).join(', ')
          : data.error || data.message || 'Failed to send message';
        throw new Error(errorText);
      }
      setStatus('success');
      setSuccessMessage(data.message || "Message sent! I'll get back to you soon.");
      setForm(INITIAL_FORM);
      setTimeout(() => setStatus(null), 7000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
      console.error('Contact form error:', err.message);
      setTimeout(() => setStatus(null), 8000);
    }
  };

  const githubSocial = personal.socials.find((s) => s.label === 'GitHub') || {};
  const linkedinSocial = personal.socials.find((s) => s.label === 'LinkedIn') || {};

  const infoCards = [
    { icon: <Email />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
    { icon: <LocationOn />, label: 'Location', value: personal.location },
    {
      icon: <GitHub />,
      label: 'GitHub',
      value: 'github.com/khuswanth1',
      href: githubSocial.url || 'https://github.com/khuswanth1',
      external: true,
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/khuswanth-rao-jadav',
      href: linkedinSocial.url || 'https://www.linkedin.com/in/khuswanth-rao-jadav/',
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Get In Touch"
          title="Let's build something great together"
          description="Have a role, project or just want to say hi? My inbox is always open."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* ── Left: info ── */}
          <div className="space-y-4">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: -25 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
                  {card.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noopener noreferrer' : undefined}
                      className="block truncate text-sm font-medium text-white transition-colors hover:text-secondary"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="truncate text-sm font-medium text-white">{card.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="gradient-border rounded-2xl p-5"
            >
              <p className="flex items-center gap-2 text-sm text-slate-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                {personal.availability}
              </p>
              <p className="mt-2 font-mono text-xs text-slate-500">
                Usually replies within 24 hours ⚡
              </p>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-3xl p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`field-input ${errors.name ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`field-input ${errors.email ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Khuswanth Rao Jadav, I'd like discuss ..."
                className={`field-input resize-none ${errors.message ? 'border-red-500/60 focus:border-red-500' : ''}`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircleOutline fontSize="small" />
                {successMessage || "Message sent! I'll get back to you soon."} 
              </div>
            )}
            {status === 'error' && (
              <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <ErrorOutline fontSize="small" />
                {errorMessage || 'Something went wrong. Please try again or email me directly.'}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send fontSize="small" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur transition-all hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 sm:w-auto"
              >
                <RestartAlt fontSize="small" />
                Reset
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}