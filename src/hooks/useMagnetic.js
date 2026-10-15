import { useEffect } from 'react';

const SELECTOR = '.btn-accent, .btn-ghost, .btn-primary';

/**
 * Magnetic buttons: while the cursor is over a button it leans a few pixels toward the pointer,
 * then eases back. Uses the independent `translate` property so it never fights hover/press scaling.
 * One delegated listener; fine pointers only; skipped for reduced motion.
 */
export default function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let active = null;
    const reset = (el) => {
      el.style.translate = '';
    };

    const onMove = (e) => {
      const el = e.target.closest?.(SELECTOR);
      if (active && active !== el) reset(active);
      active = el || null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.translate = `${(x * 6).toFixed(1)}px ${(y * 4).toFixed(1)}px`;
    };
    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}
