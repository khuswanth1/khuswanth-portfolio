import { useEffect, useRef } from 'react';
import { LuMapPin, LuArrowUpRight } from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { experience } from '../data/personal';

/**
 * Scroll-linked timeline: the line fills as you scroll through the section and each role's
 * dot lights up once the fill reaches it. Writes straight to the DOM (no React re-renders).
 */
function useTimelineProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.6;
      const box = root.getBoundingClientRect();
      const ratio = Math.min(Math.max((anchor - box.top) / box.height, 0), 1);
      root.style.setProperty('--tl', ratio.toFixed(3));
      root.querySelectorAll('[data-job]').forEach((li) => {
        li.dataset.active = li.getBoundingClientRect().top + 24 < anchor ? 'true' : 'false';
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

export default function Experience() {
  const timelineRef = useTimelineProgress();

  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Where I've worked"
      description="A year and a half in production front-end work, after internships across full-stack Java development, web fundamentals and software engineering."
    >
      <div ref={timelineRef} className="relative">
      <Reveal as="ol" className="relative space-y-6 sm:space-y-8">
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line/30" />
        <span aria-hidden="true" className="timeline-fill absolute bottom-2 left-[6px] top-2 w-[3px] rounded-full" />
        {experience.map((job, i) => (
          <Reveal as="li" key={job.id} data-job delay={i * 80} className="reveal-left relative pl-9 sm:pl-12">
            {i === 0 && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 h-[15px] w-[15px] animate-ping rounded-full bg-blue-500/60 motion-reduce:hidden"
              />
            )}
            <span
              aria-hidden="true"
              className="dot-pop tl-dot absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-[3px] border-bg"
            />
            <article className="card p-6 sm:p-7 border-line/20 bg-surface/90">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">{job.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-400">{job.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <span className="chip !text-blue-200 border-blue-500/30 bg-blue-950/40">{job.period}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <LuMapPin className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                    {job.location} · {job.type}
                  </span>
                </div>
              </header>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">{job.summary}</p>

              <ul className="mt-4 space-y-2.5">
                {job.points.map((point, n) => (
                  <li key={point.slice(0, 32)} style={{ '--i': n }} className="stagger-li flex gap-3 text-sm leading-relaxed text-slate-300">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.6)]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/15 pt-4">
                <ul className="flex flex-wrap gap-1.5" aria-label={`Technologies used at ${job.company}`}>
                  {job.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                {job.link && (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    See internship work
                    <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </Reveal>
      </div>
    </Section>
  );
}