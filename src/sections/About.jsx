import { LuTarget } from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import Icon from '../components/Icon';
import { about, projects, personal, achievements } from '../data/personal';

// Derived so the numbers never go stale.
const monthsWorked = Math.max(
  0,
  Math.floor((Date.now() - new Date(personal.careerStart).getTime()) / (30.44 * 24 * 3600 * 1000))
);
const years = `${Math.floor((monthsWorked / 12) * 2) / 2}+`;

const facts = about.facts.map((f) => {
  if (f.label === 'Projects shown here') return { ...f, value: String(projects.length) };
  if (f.value === '__YEARS__') return { ...f, value: years };
  return f;
});

export default function About() {
  return (
    <Section id="about" kicker="About me" title="Front-end focused, full-stack aware">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          {about.summary.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="card mt-8 flex gap-4 p-5 sm:p-6 border-blue-500/20 bg-blue-950/20">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30">
              <LuTarget className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-white">What I&apos;m looking for</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300 sm:text-base">{about.goals}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <dl className="grid grid-cols-2 gap-3.5 sm:gap-4">
            {facts.map((f) => (
              <div key={f.label} className="card p-5 sm:p-6 bg-surface/90 border-line/25">
                <dt className="text-xs font-medium text-slate-400">{f.label}</dt>
                <dd className="mt-2 font-display text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  <span className="text-gradient">
                    <CountUp value={f.value} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <h3 className="sr-only">Strengths</h3>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.strengths.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 70} className="card card-hover p-6 border-line/25 bg-surface/85">
            <span className="inline-block rounded-md bg-blue-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-blue-400">
              0{i + 1}
            </span>
            <h4 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
          </Reveal>
        ))}
      </ul>

      <h3 className="mt-10 font-display text-xl font-bold text-white">Highlights</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 70} className="card card-hover flex gap-4 p-5 border-line/25 bg-surface/85">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30">
              <Icon name={a.icon} className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-display text-base font-semibold text-white">{a.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{a.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}