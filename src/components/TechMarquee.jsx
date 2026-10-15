import Icon from './Icon';

const ITEMS = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Redux Toolkit', icon: 'redux' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Java', icon: 'java' },
  { name: 'Spring Boot', icon: 'spring' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Git', icon: 'git' },
  { name: 'Figma', icon: 'figma' },
];

/** Slow, pausable technology ticker. Decorative: the full skill list lives in the Skills section. */
export default function TechMarquee() {
  return (
    <div aria-hidden="true" className="mask-fade-x group relative mt-10 overflow-hidden lg:mt-12">
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={`${item.name}-${i}`} className="chip !px-4 !py-2 !text-xs text-slate-300">
            <Icon name={item.icon} className="h-4 w-4 text-slate-400" />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
