import { motion } from 'framer-motion';
import {
  RocketLaunch,
  GitHub,
  OpenInNew,
  CheckCircleOutline,
} from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/personal';
import useInView from '../hooks/useInView';

export default function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Portfolio"
          title="Projects I've built"
          description="Production-grade applications spanning React, Spring Boot microservices, and Java logic engines."
        />

        <div ref={ref} className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => {
            const githubUrl = project.github || project.links?.code;
            const liveUrl = project.links?.live !== '#' ? project.links?.live : null;
            const techList = project.techStack || project.tech || [];
            const accentColor = project.color || project.accent || '#6d5dfc';

            return (
              <motion.article
                key={project.id || project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass glass-hover group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7"
              >
                {/* Accent glow */}
                <span
                  className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
                  style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
                />

                <div className="flex items-start justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-glow"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, #0a0c1c)` }}
                  >
                    <RocketLaunch />
                  </span>
                  <div className="flex items-center gap-2">
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-secondary/60 hover:text-white"
                      >
                        <OpenInNew fontSize="small" />
                      </a>
                    )}
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source code`}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-primary/60 hover:text-white"
                      >
                        <GitHub fontSize="small" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-5 font-mono text-[10px] tracking-widest text-secondary uppercase">
                  {project.category}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white">{project.title}</h3>
                {project.subtitle && (
                  <p className="mt-1 font-mono text-xs text-slate-400">{project.subtitle}</p>
                )}

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && (
                  <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                    {project.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircleOutline className="mt-0.5 shrink-0 text-secondary" style={{ fontSize: 14 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech */}
                <div className="mt-5 border-t border-white/5 pt-4 mt-auto">
                  <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    Tech Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {techList.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-gradient-to-r from-primary/15 to-secondary/15 px-2.5 py-1 font-mono text-[10px] text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}