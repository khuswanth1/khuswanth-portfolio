import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import AnimatedBackground from './components/AnimatedBackground';
import useSpotlight from './hooks/useSpotlight';
import useSectionRouting from './hooks/useSectionRouting';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Education from './sections/Education';
import Contact from './sections/Contact';

export default function App() {
  useSpotlight();
  useSectionRouting();
  return (
    <>
      <AnimatedBackground />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Education />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
