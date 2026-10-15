import { useEffect } from 'react';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'services', 'education', 'contact'];

/**
 * Clean section URLs (/skills instead of /#skills).
 *  - Opening /skills (or an old /#skills link) scrolls straight to that section.
 *  - In-page links such as href="#contact" scroll smoothly; the Navbar keeps the path in sync while scrolling.
 * The host must serve index.html for these paths (see vercel.json).
 */
export default function useSectionRouting() {
  useEffect(() => {
    const target = window.location.pathname.replace(/^\/|\/$/g, '') || window.location.hash.slice(1);
    if (SECTIONS.includes(target) && target !== 'home') {
      const jump = () => document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
      jump();
      // Web fonts can shift the layout after first paint; re-align once, as long as the visitor hasn't scrolled away.
      const landedAt = window.scrollY;
      document.fonts?.ready.then(() => {
        if (Math.abs(window.scrollY - landedAt) < 8) jump();
      });
    }

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      const id = link?.getAttribute('href').slice(1);
      if (!id || !SECTIONS.includes(id)) return;
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
