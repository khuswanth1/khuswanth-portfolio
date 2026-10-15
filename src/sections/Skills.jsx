import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { skills, SKILL_LEVELS } from '../data/personal';

function LevelDots({ level }) {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span key={n} className="h-1.5 w-4 overflow-hidden rounded-full bg-slate-800">
          {n <= level && (
            <span
              className="lvl block h-full w-full rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]"
              style={{ '--i': n }}
            />
          )}
        </span>
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="Skills"
      title="Tools I use to ship"
      description="Grouped by where they sit in the stack. Levels reflect day-to-day engineering use, not a self-rated percentage."
      className="bg-navy-900/40"
    >
      <div className="lvl-static mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400" aria-hidden="true">
        {[3, 2, 1].map((lvl) => (
          <span key={lvl} className="inline-flex items-center gap-2">
            <LevelDots level={lvl} />
            <span className="font-medium">{SKILL_LEVELS[lvl]}</span>
          </span>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 80} className="card p-6 sm:p-7 border-line/20 bg-surface/90">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                <Icon name={group.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">{group.title}</h3>
            </div>
            <ul className="mt-5 divide-y divide-line/15">
              {group.items.map((skill) => (
                <li key={skill.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="flex items-center gap-3 text-sm font-medium text-slate-200">
                    <span className="grid h-6 w-6 place-items-center text-slate-400">
                      {skill.icon ? (
                        <Icon name={skill.icon} className="h-4 w-4" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      )}
                    </span>
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden text-xs text-slate-400 xs:inline font-mono">{SKILL_LEVELS[skill.level]}</span>
                    <span className="sr-only xs:hidden">{SKILL_LEVELS[skill.level]}</span>
                    <LevelDots level={skill.level} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}