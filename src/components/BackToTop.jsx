import { useEffect, useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`icon-btn fixed bottom-5 right-5 z-40 !h-11 !w-11 shadow-card transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <LuArrowUp className="h-5 w-5" />
    </button>
  );
}
