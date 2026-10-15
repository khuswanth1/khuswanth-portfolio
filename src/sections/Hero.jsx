import { LuArrowRight, LuDownload, LuMail, LuMapPin } from 'react-icons/lu';
import { personal, socials, projects, certifications } from '../data/personal';
import Icon from '../components/Icon';
import TechMarquee from '../components/TechMarquee';
import RoleTyper from '../components/RoleTyper';
import CountUp from '../components/CountUp';

const ROLES = ['Frontend Engineer', 'React Developer', 'Backend Developer'];

const months = Math.floor((Date.now() - new Date(personal.careerStart).getTime()) / (30.44 * 24 * 3600 * 1000));
const STATS = [
  { value: `${Math.floor((months / 12) * 2) / 2}+`, label: 'Years of experience' },
  { value: String(projects.length), label: 'Projects built' },
  { value: String(certifications.length), label: 'Certifications' },
];

/** Cursor-driven 3D tilt for the portrait (fine pointers only, off for reduced motion). */
const tiltMove = (e) => {
  if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  e.currentTarget.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 10}deg`);
};
const tiltLeave = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-12 pt-24 sm:pt-32 lg:pb-16">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="hero-in container-x relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {personal.availability}
          </p>

          <h1 id="hero-title" className="mt-6 whitespace-nowrap text-[1.65rem] font-extrabold leading-[1.1] text-white tracking-tight xs:text-3xl sm:text-4xl lg:text-5xl">
            <span className="name-shine">{personal.name.split(' ').slice(0, 2).join(' ')}</span>{' '}
            <span className="text-slate-400 font-medium">{personal.name.split(' ').slice(2).join(' ')}</span>
          </h1>

          <p className="mt-5 font-display text-xl font-semibold text-fg sm:text-2xl">
            <RoleTyper words={ROLES} className="text-gradient" />
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{personal.intro}</p>

          <ul aria-label="Core technologies" className="mt-6 flex flex-wrap gap-2">
            {personal.coreStack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a href="#projects" className="btn-accent group">
              View projects
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={personal.resumeUrl} download={personal.resumeFileName} className="btn-ghost">
              <LuDownload className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
            <a href="#contact" className="btn-ghost">
              <LuMail className="h-4 w-4" aria-hidden="true" />
              Contact me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <LuMapPin className="h-4 w-4 text-blue-400" aria-hidden="true" />
              {personal.location}
            </span>
            <ul className="flex items-center gap-2" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    {...(s.icon !== 'mail' && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={s.label}
                    title={s.label}
                    className="icon-btn !h-9 !w-9"
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-line/20 pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-0.5 text-xs text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait with cursor tilt */}
        <div
          className="tilt relative mx-auto w-full max-w-[340px] lg:max-w-none"
          onPointerMove={tiltMove}
          onPointerLeave={tiltLeave}
        >
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-blue-600/20 to-transparent blur-2xl pointer-events-none" />

          <div className="relative overflow-hidden rounded-[28px] border border-line/30 bg-surface/90 p-2.5 shadow-2xl backdrop-blur-md">
            <picture>
              <source type="image/webp" srcSet={personal.avatar.srcSet} sizes="(min-width: 1024px) 360px, 340px" />
              <img
                src={personal.avatar.fallback}
                alt={`Portrait of ${personal.name}`}
                width={personal.avatar.width}
                height={personal.avatar.height}
                fetchpriority="high"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[20px] bg-surface-2 object-cover object-top ring-1 ring-white/10"
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="container-x relative">
        <TechMarquee />
      </div>
    </section>
  );
}