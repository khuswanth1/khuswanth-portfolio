import useInView from '../hooks/useInView';

/**
 * SectionHeading — consistent heading treatment across all sections.
 */
export default function SectionHeading({ kicker, title, description }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs font-medium tracking-widest text-secondary uppercase">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
        {kicker}
      </span>
      <h2 className="mt-3.5 text-2xl font-bold text-white xs:text-3xl sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}