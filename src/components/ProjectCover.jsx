import Icon from './Icon';

/**
 * ProjectCover — a screenshot when the project provides one, otherwise a generated cover
 * built from the project's accent colour, icon and stack (no fake screenshots).
 */
export default function ProjectCover({ project, className = '' }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  const accent = project.accent;
  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 100% 0%, ${accent}33, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${accent}20, transparent 60%), #0e1526`,
      }}
    >
      {/* faux window chrome + layout blocks */}
      <div className="absolute inset-x-6 top-6 bottom-0 rounded-t-xl border border-line/20 bg-surface/90 shadow-card backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-line/15 px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="ml-2 h-2 w-24 rounded-full bg-slate-700/60" />
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-3 p-3.5">
          <div className="space-y-2">
            <span className="block h-2 w-3/4 rounded-full bg-slate-700/60" />
            <span className="block h-2 w-1/2 rounded-full bg-slate-700/60" />
            <span className="block h-2 w-2/3 rounded-full bg-slate-700/60" />
          </div>
          <div className="space-y-2">
            <span className="block h-10 rounded-lg" style={{ background: `${accent}2b` }} />
            <div className="grid grid-cols-3 gap-2">
              <span className="block h-6 rounded-md bg-slate-800" />
              <span className="block h-6 rounded-md bg-slate-800" />
              <span className="block h-6 rounded-md bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
      <span
        className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg shadow-black/40"
        style={{ background: accent }}
      >
        <Icon name={project.icon} className="h-6 w-6" />
      </span>
    </div>
  );
}
