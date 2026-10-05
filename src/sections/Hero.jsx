import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Mail,
  RocketLaunch,
  LocationOn,
  Phone,
} from '@mui/icons-material';
import { personal } from '../data/personal';
import { socialIcon } from '../components/SocialIcon';

const ROLES = [
  'Frontend / React Developer',
  'JavaScript Enthusiast',
  'UI/UX-Focused Engineer',
  'Python / Django Learner'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex % ROLES.length];
    let interval;

    if (!deleting && text.length < current.length) {
      interval = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === current.length) {
      interval = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && text.length > 0) {
      interval = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    } else {
      setDeleting(false);
      setRoleIndex((i) => i + 1);
    }
    return () => clearTimeout(interval);
  }, [text, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient blobs */}
      <div
        className="blob left-[-10%] top-[10%] h-[420px] w-[420px]"
        style={{ background: 'radial-gradient(circle, rgba(109,93,252,0.7), transparent 70%)' }}
      />
      <div
        className="blob right-[-8%] top-[30%] h-[380px] w-[380px]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.55), transparent 70%)', animationDelay: '-6s' }}
      />
      <div
        className="blob bottom-[-10%] left-[30%] h-[400px] w-[400px]"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.45), transparent 70%)', animationDelay: '-12s' }}
      />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Left: intro & contact details ── */}
        <div className="text-left">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 sm:px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {personal.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-5 text-3xl font-extrabold leading-tight text-white xs:text-4xl sm:text-5xl lg:text-6xl"
          >
            Hi, I'm{' '}
            <span className="text-gradient glow-text animate-gradient-x">
              {personal.name}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-3.5 font-mono text-base font-medium text-secondary sm:text-xl"
          >
            <span className="typing-cursor">&gt; {text}</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            {personal.tagline} I build production-grade web applications with{' '}
            <span className="font-medium text-white">React, JavaScript & Python</span> and modern design
            systems — from pixel-perfect UI to rock-solid APIs.
          </motion.p>

          {/* Contact Details (Left Side) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3.5 py-2 backdrop-blur">
              <Mail className="shrink-0 text-primary" fontSize="small" />
              <a href={`mailto:${personal.email}`} className="transition-colors hover:text-white">
                {personal.email}
              </a>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3.5 py-2 backdrop-blur">
              <Phone className="shrink-0 text-secondary" fontSize="small" />
              <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                {personal.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3.5 py-2 backdrop-blur">
              <LocationOn className="shrink-0 text-accent" fontSize="small" />
              <span>{personal.location}</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mt-7 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.04] active:scale-95"
            >
              <Mail className="transition-transform group-hover:-rotate-6" />
              Let's Talk
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-primary/50 hover:bg-primary/10"
            >
              <RocketLaunch />
              View Projects
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-colors hover:border-accent/50 hover:bg-accent/10"
            >
              <Download />
              Resume
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="mt-6 flex items-center gap-3"
          >
            {personal.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-white hover:shadow-glow"
              >
                {socialIcon(s.icon, 20)}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Image card only ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          className="relative mt-8 lg:mt-0 flex items-center justify-center"
        >
          <div className="animate-float relative">
            <div className="gradient-border glass relative overflow-hidden rounded-3xl p-3 sm:p-4 shadow-glow max-w-[320px] sm:max-w-[360px]">
              <img
                src={personal.avatar}
                alt={personal.name}
                className="w-full h-[360px] sm:h-[420px] rounded-2xl object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </div>


          </div>
        </motion.div>
      </div>
    </section>
  );
}