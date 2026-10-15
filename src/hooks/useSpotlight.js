import { useEffect } from 'react';

/**
 * Cursor spotlight: tracks the pointer over any `.card` and exposes it as --mx / --my,
 * which index.css uses for a soft highlight. Fine pointers only; one delegated listener.
 */
export default function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let frame = 0;
    const onMove = (e) => {
      const card = e.target.closest?.('.card');
      if (!card || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
