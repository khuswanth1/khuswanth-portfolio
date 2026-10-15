import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { LuArrowUpRight, LuGithub, LuExternalLink, LuInfo, LuSearch, LuX, LuCheck } from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import ProjectCover from '../components/ProjectCover';
import { projects, PROJECT_CATEGORIES } from '../data/personal';
import { track } from '../lib/analytics';

const ProjectModal = lazy(() => import('../components/ProjectModal'));

const categoryLabel = Object.fromEntries(PROJECT_CATEGORIES.map((c) => [c.id, c.label]));
const allProjects = projects.map((p) => ({ ...p, categoryLabel: categoryLabel[p.category] }));

// Technologies used by at least two projects make useful filters (concepts like OOP don't).
const NOT_A_TECH = new Set(['OOP', 'Collections']);
const TECH_FILTERS = Object.entries(
  allProjects.flatMap((p) => p.tech).reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {})
)
  .filter(([tech, count]) => count > 1 && !NOT_A_TECH.has(tech))
  .sort((a, b) => b[1] - a[1])
  .map(([tech]) => tech);

const readProjectParam = () => new URLSearchParams(window.location.search).get('project');

/** Subtle 3D tilt that follows the cursor. Fine pointers only, and skipped for reduced motion. */
function Tilt({ children }) {
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
    el.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 7}deg`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };
  return (
    <div className="tilt h-full" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article
      style={{ '--pc': project.accent }}
      className="card card-hover proj-card group relative flex h-full flex-col overflow-hidden border-line/20 bg-surface/90"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
      {/* Cover with clickable preview for modal */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line/15">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="h-full w-full cursor-pointer focus-visible:outline-none"
          aria-label={`Open details for ${project.title}`}
        >
          <ProjectCover project={project} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        </button>

        {project.featured && (
          <span className="absolute left-3.5 top-3.5 rounded-full border border-blue-500/30 bg-blue-950/80 px-2.5 py-1 text-[11px] font-semibold text-blue-300 shadow-sm backdrop-blur">
            Featured
          </span>
        )}

      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            {project.categoryLabel}
            {project.year ? ` · ${project.year}` : ''}
          </p>
        </div>

        <h3 className="mt-2 text-xl font-bold text-white tracking-tight">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left font-display hover:text-blue-400 transition-colors focus-visible:outline-none"
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-300">{project.tagline}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <ul className="mt-3 space-y-1.5" aria-label="Key features">
          {project.features.slice(0, 2).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs leading-snug text-slate-300">
              <LuCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: project.accent }} aria-hidden="true" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.slice(0, 4).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {project.tech.length > 4 && <li className="chip">+{project.tech.length - 4}</li>}
        </ul>

        {/* Prominent Action Bar with Direct GitHub Redirect */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6 border-t border-line/15">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line/30 bg-surface-2/80 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-600 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/25 active:scale-95"
            >
              <LuGithub className="h-4 w-4 text-slate-200" aria-hidden="true" />
              <span>GitHub</span>
              <LuArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-md hover:shadow-blue-500/35 active:scale-95"
            >
              <LuExternalLink className="h-4 w-4" aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`View details and features of ${project.title}`}
            className="ml-auto inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-400 transition hover:text-blue-400 hover:bg-surface-2"
          >
            <LuInfo className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('all');
  const [tech, setTech] = useState('');
  const [query, setQuery] = useState('');
  const [openSlug, setOpenSlug] = useState(readProjectParam);

  const filtered = useMemo(
    () =>
      allProjects.filter((p) => {
        const q = query.trim().toLowerCase();
        const haystack = `${p.title} ${p.tagline} ${p.description} ${p.tech.join(' ')}`.toLowerCase();
        return (category === 'all' || p.category === category) && (!tech || p.tech.includes(tech)) && (!q || haystack.includes(q));
      }),
    [category, tech, query]
  );

  const openProject = allProjects.find((p) => p.slug === openSlug) || null;

  // Keep ?project=slug in the URL so a project can be shared directly.
  const setProjectParam = (slug) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set('project', slug);
    else url.searchParams.delete('project');
    window.history.replaceState(null, '', url);
  };

  const handleOpen = useCallback((project) => {
    setOpenSlug(project.slug);
    setProjectParam(project.slug);
    track('project_open', { project: project.slug });
  }, []);

  const handleClose = useCallback(() => {
    setOpenSlug(null);
    setProjectParam(null);
  }, []);

  // A shared ?project= link scrolls to the section behind the dialog.
  useEffect(() => {
    if (readProjectParam()) document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' });
  }, []);

  const resetFilters = () => {
    setCategory('all');
    setTech('');
    setQuery('');
  };

  return (
    <Section
      id="projects"
      kicker="Projects"
      title="Selected work"
      description="Every project links directly to its source code on GitHub. Explore repositories, live demos, and technical features."
      className="bg-navy-900/40"
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {PROJECT_CATEGORIES.map((c) => {
            const count = c.id === 'all' ? allProjects.length : allProjects.filter((p) => p.category === c.id).length;
            if (count === 0) return null;
            const selected = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(c.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                  selected
                    ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'border-line/25 bg-surface/80 text-slate-300 hover:border-blue-400/50 hover:text-white hover:bg-surface-2'
                }`}
              >
                {c.label} <span className={selected ? 'opacity-90 font-semibold' : 'opacity-60'}>{count}</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <span className="shrink-0 font-medium">Technology</span>
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="field !w-full !py-2 md:!w-48 bg-surface-2/80 border-line/25 text-slate-200"
          >
            <option value="">Any</option>
            {TECH_FILTERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-72">
          <span className="sr-only">Search projects</span>
          <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or technology"
            className="field !py-2.5 !pl-10 !pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:text-white"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <p className="text-sm text-slate-400" aria-live="polite">
          Showing <span className="font-semibold text-white">{filtered.length}</span> of {allProjects.length} projects
        </p>
      </div>

      {filtered.length ? (
        <ul key={`${category}|${tech}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={(i % 3) * 90} className="reveal-pop">
              <Tilt>
                <ProjectCard project={project} onOpen={handleOpen} />
              </Tilt>
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="card p-10 text-center border-line/20 bg-surface/80">
          <p className="text-slate-400">No projects match these filters.</p>
          <button type="button" onClick={resetFilters} className="btn-ghost mt-4">
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://github.com/khuswanth1?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost !px-6 !py-3 inline-flex items-center gap-2 border-line/30 bg-surface/80 text-white hover:border-blue-500 hover:bg-blue-600/15"
        >
          <LuGithub className="h-5 w-5 text-blue-400" aria-hidden="true" />
          <span>Browse all repositories on GitHub</span>
          <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {openProject && (
        <Suspense fallback={null}>
          <ProjectModal project={openProject} onClose={handleClose} />
        </Suspense>
      )}
    </Section>
  );
}