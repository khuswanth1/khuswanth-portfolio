import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global backgrounds */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" />
      <ParticlesBackground />
      <div
        className="blob pointer-events-none fixed -top-32 left-1/4 z-0 h-[480px] w-[480px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(109,93,252,0.8), transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>
      </div>

      <BackToTop />
    </div>
  );
}