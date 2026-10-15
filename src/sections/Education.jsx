import { LuGraduationCap, LuAward, LuMapPin } from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { education, certifications } from '../data/personal';

export default function Education() {
  const [degree, ...schooling] = education;

  return (
    <Section
      id="education"
      kicker="Education & certifications"
      title="Foundations and continued learning"
      className="bg-navy-900/40"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <Reveal as="article" className="card p-6 sm:p-7 border-line/20 bg-surface/90">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30">
                <LuGraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{degree.degree}</h3>
                <p className="mt-0.5 text-sm font-semibold text-blue-400">{degree.field}</p>
              </div>
            </div>
            <p className="mt-5 font-semibold text-slate-200">{degree.institution}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1">
                <LuMapPin className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                {degree.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-xs">{degree.period}</span>
            </div>
            <p className="mt-5 inline-flex rounded-xl border border-blue-500/30 bg-blue-950/60 px-3.5 py-2 font-display text-base font-bold text-blue-300">
              {degree.score}
            </p>
          </Reveal>

          {schooling.map((item, i) => (
            <Reveal as="article" key={item.id} delay={(i + 1) * 70} className="card flex flex-wrap items-center justify-between gap-3 p-5 border-line/20 bg-surface/90">
              <div>
                <h3 className="text-base font-bold text-white">{item.degree}</h3>
                <p className="text-sm text-slate-400">
                  {item.institution}, {item.location}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold text-blue-400">{item.score}</p>
                <p className="text-slate-400 font-mono text-xs">{item.period}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="card p-6 sm:p-7 border-line/20 bg-surface/90">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/30">
              <LuAward className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Certifications</h3>
              <p className="text-xs text-slate-400">Verified credentials & course completions</p>
            </div>
          </div>
          <ul className="mt-6 divide-y divide-line/15">
            {certifications.map((cert) => (
              <li key={cert.title} className="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-white">{cert.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ''}
                  </p>
                </div>
                <span className="chip shrink-0 !text-slate-300">{cert.category}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}