import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { skillIcon, techIcon } from '../components/SocialIcon';
import { skills, techMarquee } from '../data/personal';
import useInView from '../hooks/useInView';

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="relative z-10 py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Tech Stack"
          title="Tools & technologies I work with"
          description="A blend of frontend craft, full-stack exposure and production tooling."
        />

        {/* Marquee */}
        <div className="relative mb-14 overflow-hidden rounded-2xl border border-white/10 bg-transparent py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-10">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex shrink-0 items-center gap-2 font-mono text-sm text-slate-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Skill groups */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.title}
              ref={gi === 0 ? ref : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: gi * 0.12 }}
              className="glass glass-hover flex flex-col rounded-3xl p-6 sm:p-7"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
                  {skillIcon(group.icon)}
                </span>
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-mono text-xs text-secondary">{item.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + gi * 0.15 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: 'ui', label: 'Responsive Design' },
            { icon: 'api', label: 'REST API Integration' },
            { icon: 'node', label: 'Auth: JWT + OAuth' },
            { icon: 'node', label: 'Git Workflows' },
          ].map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-slate-300"
            >
              {techIcon(b.icon, 15)}
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}