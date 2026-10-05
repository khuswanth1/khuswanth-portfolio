import { motion } from 'framer-motion';
import { WorkOutline, CheckCircleOutline } from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { experience } from '../data/personal';
import useInView from '../hooks/useInView';

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Career Path"
          title="Where I've worked & grown"
          description="From internships to professional frontend development — my journey so far."
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <span className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-1/2" />

          <div className="space-y-10">
            {experience.map((job, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.div
                  key={job.role + job.company}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`relative flex sm:w-1/2 ${
                    leftSide ? 'sm:pr-10' : 'sm:ml-auto sm:pl-10'
                  } pl-12 sm:pl-10`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full border-2 border-dark-950 bg-gradient-to-br from-primary to-secondary text-white shadow-glow left-0 sm:left-auto ${
                      leftSide ? 'sm:-right-4' : 'sm:-left-4'
                    }`}
                  >
                    <WorkOutline fontSize="small" />
                  </span>

                  <div className="glass glass-hover w-full rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold text-white">{job.role}</h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-300">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-secondary">{job.company}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-slate-400">
                        {job.period}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-slate-400">
                        {job.type}
                      </span>
                    </div>
                    {job.description && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-300">
                        {job.description}
                      </p>
                    )}
                    {job.points && (
                      <ul className="mt-4 space-y-2">
                        {job.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                            <CheckCircleOutline className="mt-0.5 shrink-0 text-primary" fontSize="small" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    {job.technologies && (
                      <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}