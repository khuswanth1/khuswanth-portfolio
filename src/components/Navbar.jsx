import { useEffect, useRef, useState } from 'react';
import { LuMenu, LuX, LuDownload } from 'react-icons/lu';
import { personal } from '../data/personal';

export const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

/** Track which section is currently in the viewport and keep the URL path in sync (/skills). */
function useActiveSection(ids) {
  const [active, setActive] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/^\/|\/$/g, '') || window.location.hash.slice(1) || 'home';
    }
    return 'home';
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check scroll position with offset for fixed header
          const scrollPosition = window.scrollY + 180;
          let currentSection = 'home';

          // Detect active section
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                currentSection = id;
                break;
              }
            }
          }

          // If scrolled near the bottom of the page, activate the last section (contact)
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
            currentSection = ids[ids.length - 1];
          }

          setActive(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  // Reflect the active section as a clean path (/skills). replaceState keeps Back from filling with entries.
  useEffect(() => {
    const target = active === 'home' ? '/' : `/${active}`;
    if (window.location.pathname !== target || window.location.hash) {
      window.history.replaceState(null, '', target + window.location.search);
    }
  }, [active]);

  return active;
}

const SECTION_IDS = ['home', ...NAV_LINKS.map((l) => l.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      // Slide away when scrolling down, come back as soon as the visitor scrolls up.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > 240 && y > lastY);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape closes, focus moves into the menu, close when resizing to desktop.
  useEffect(() => {
    if (!open) return undefined;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const media = window.matchMedia('(min-width: 1024px)');
    const onMedia = () => media.matches && setOpen(false);
    const onOutside = (e) => {
      if (!menuRef.current?.contains(e.target) && !menuButtonRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    media.addEventListener('change', onMedia);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      media.removeEventListener('change', onMedia);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,transform] duration-300 ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || open
          ? 'border-b border-line/20 bg-navy-900/90 shadow-lg shadow-black/40 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3 rounded-lg" aria-label={`${personal.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 font-display text-sm font-bold text-white shadow-md shadow-blue-500/25 transition group-hover:scale-105">
            KJ
          </span>
          <span className="hidden font-display text-base font-semibold text-fg tracking-tight sm:block">
            {personal.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={personal.resumeUrl}
            download={personal.resumeFileName}
            className="btn-accent hidden !px-4 !py-2 sm:inline-flex text-xs uppercase tracking-wider"
          >
            <LuDownload className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="absolute right-4 top-[4.25rem] w-1/2 min-w-[13rem] max-w-[18rem] origin-top-right animate-dialog-in overflow-hidden rounded-2xl border border-line/30 bg-navy-900/95 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:right-6 lg:hidden"
      >
        <ul className="grid gap-1 p-2.5 text-center">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`block rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
                  active === link.id
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-surface-2 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-1.5 sm:hidden">
            <a href={personal.resumeUrl} download={personal.resumeFileName} className="btn-accent w-full whitespace-nowrap !px-3">
              <LuDownload className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
