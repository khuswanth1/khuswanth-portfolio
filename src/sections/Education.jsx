import { motion } from 'framer-motion';
import { School, AutoStories, AccountBalance, Star, LocationOn } from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { education } from '../data/personal';
import useInView from '../hooks/useInView';

const getEduIcon = (iconName) => {
  switch (iconName) {
    case 'AutoStories':
      return <AutoStories fontSize="large" />;
    case 'AccountBalance':
      return <AccountBalance fontSize="large" />;
    case 'School':
    default:
      return <School fontSize="large" />;
  }
};

export default function Education() {
  const { ref, inView } = useInView();
  const eduList = Array.isArray(education) ? education : [education];

  return (
    <section id="education" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Education"
          title="Academic background"
          description="The foundation that shaped my engineering mindset and problem-solving skills."
        />

        <div ref={ref} className="mx-auto max-w-4xl space-y-6">
          {eduList.map((item, i) => (
            <motion.div
              key={item.id || item.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="gradient-border glass glass-hover rounded-3xl p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Icon */}
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
                  {getEduIcon(item.icon)}
                </span>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white sm:text-xl">{item.degree}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 font-mono text-xs font-semibold text-amber-300">
                      <Star style={{ fontSize: 12 }} />
                      CGPA: {item.cgpa}
                    </span>
                  </div>

                  {item.field && (
                    <p className="mt-1 text-sm font-medium text-secondary">{item.field}</p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="font-semibold text-white">{item.institution}</span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <LocationOn style={{ fontSize: 14 }} />
                        {item.location}
                      </span>
                    )}
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  {/* Coursework if present */}
                  {Array.isArray(item.coursework) && item.coursework.length > 0 && (
                    <div className="mt-4 border-t border-white/5 pt-3">
                      <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                        Key Coursework
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.coursework.map((c) => (
                          <span
                            key={c}
                            className="rounded-md bg-gradient-to-r from-primary/15 to-secondary/15 px-2.5 py-1 font-mono text-xs text-slate-200"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}