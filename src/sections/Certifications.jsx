import { motion } from 'framer-motion';
import { WorkspacePremium, Verified } from '@mui/icons-material';
import SectionHeading from '../components/SectionHeading';
import { certifications } from '../data/personal';
import useInView from '../hooks/useInView';

export default function Certifications() {
  const { ref, inView } = useInView();

  return (
    <section id="certifications" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Credentials"
          title="Certifications & Honors"
          description="Verified skills and certifications across frontend, full-stack, database, and cloud engineering."
        />

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id || cert.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5"
            >
              {/* Subtle top accent glow */}
              <span
                className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: `radial-gradient(circle, ${cert.color}, transparent 70%)` }}
              />

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                    {cert.category}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-400">
                    {cert.year}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-glow"
                    style={{ background: `linear-gradient(135deg, ${cert.color}, #0a0c1c)` }}
                  >
                    <WorkspacePremium fontSize="small" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-secondary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <Verified style={{ fontSize: 13 }} className="text-emerald-400" />
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
