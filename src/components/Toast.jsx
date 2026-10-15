import { useEffect } from 'react';
import { LuCircleCheck, LuCircleAlert, LuX } from 'react-icons/lu';

const DURATION = { success: 6000, error: 9000 };

const STYLES = {
  success: { icon: LuCircleCheck, tone: 'text-emerald-400', ring: 'border-emerald-500/30', bar: 'bg-emerald-400' },
  error: { icon: LuCircleAlert, tone: 'text-rose-400', ring: 'border-rose-500/30', bar: 'bg-rose-400' },
};

/**
 * Toast — a single dismissible notification pinned to the bottom of the screen.
 * Errors use role="alert" (announced immediately); successes use role="status".
 * Pass a new `toast` object (with a fresh `id`) to show it again; pass null to hide it.
 */
export default function Toast({ toast, onClose }) {
  const id = toast?.id;
  const type = toast?.type;

  useEffect(() => {
    if (!id) return undefined;
    const timer = setTimeout(onClose, DURATION[type] ?? DURATION.success);
    return () => clearTimeout(timer);
  }, [id, type, onClose]);

  if (!toast) return null;
  const { icon: Icon, tone, ring, bar } = STYLES[toast.type] || STYLES.success;

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-20 z-[70] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end">
      <div
        key={toast.id}
        role={toast.type === 'error' ? 'alert' : 'status'}
        className={`toast-in pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl border bg-navy-900/95 p-4 pr-10 shadow-2xl shadow-black/50 backdrop-blur-xl ${ring}`}
      >
        <div className="flex gap-3">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone}`} aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            {toast.message && <p className="mt-0.5 text-sm leading-relaxed text-slate-300">{toast.message}</p>}
            {toast.action}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-surface-2 hover:text-white"
        >
          <LuX className="h-4 w-4" aria-hidden="true" />
        </button>

        <span
          aria-hidden="true"
          className={`toast-timer absolute inset-x-0 bottom-0 h-0.5 origin-left ${bar}`}
          style={{ animationDuration: `${DURATION[toast.type] ?? DURATION.success}ms` }}
        />
      </div>
    </div>
  );
}
