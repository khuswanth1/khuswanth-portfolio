import { motion } from 'framer-motion';
import { Verified, AutoAwesome } from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { about } from '../data/personal';
import useInView from '../hooks/useInView';

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="About Me"
          title="Turning ideas into interactive experiences"
          description="A quick look at who I am, what drives me and what I bring to the table."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── Left: summary card ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass glass-hover rounded-3xl p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
              <AutoAwesome />
            </div>
            <h3 className="text-lg font-bold text-white">Who I am</h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-400">
              {about.summary}
            </p>
          </motion.div>

          {/* ── Right: highlights + stats ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass glass-hover rounded-3xl p-8"
            >
              <h3 className="text-lg font-bold text-white">Highlights</h3>
              <ul className="mt-4 space-y-3">
                {about.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <Verified className="mt-0.5 shrink-0 text-emerald-400" fontSize="small" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="gradient-border rounded-2xl p-5 text-center"
                >
                  <p className="text-gradient text-3xl font-extrabold">{stat.value}</p>
                  <p className="mt-1 font-mono text-[11px] leading-snug text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}