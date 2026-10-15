import { useEffect, useRef } from 'react';
import { LuX, LuGithub, LuExternalLink, LuCheck } from 'react-icons/lu';
import ProjectCover from './ProjectCover';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Accessible project detail dialog: focus trap, Escape to close, focus restored on close. */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector('[data-autofocus]')?.focus();

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const items = [...dialog.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const titleId = `project-${project.slug}-title`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 animate-fade-in bg-black/50 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92vh] w-full max-w-3xl animate-dialog-in flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-navy-900/50 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:rounded-3xl"
      >
        <div className="relative h-44 shrink-0 sm:h-56">
          <ProjectCover project={project} />
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close project details"
            className="icon-btn absolute right-4 top-4 bg-navy-900/90 border-line/30 text-white backdrop-blur hover:text-blue-400"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <p className="kicker">{project.categoryLabel}{project.year ? ` · ${project.year}` : ''}</p>
          <h3 id={titleId} className="mt-2 text-2xl font-bold text-white sm:text-3xl tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-300">{project.tagline}</p>
          <p className="mt-5 leading-relaxed text-slate-300">{project.description}</p>

          <h4 className="mt-7 font-display text-sm font-semibold uppercase tracking-wider text-slate-400">Key features</h4>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <h4 className="mt-7 font-display text-sm font-semibold uppercase tracking-wider text-slate-400">Tech stack</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-line/15 pt-6 xs:flex-row">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-accent">
                <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5"
              >
                <LuGithub className="h-4 w-4" aria-hidden="true" />
                <span>View on GitHub</span>
              </a>
            ) : (
              <p className="text-sm text-slate-400">Source code isn&apos;t public — happy to walk through it in an interview.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
