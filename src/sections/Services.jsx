import { LuCheck, LuArrowRight } from 'react-icons/lu';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { services } from '../data/personal';

export default function Services() {
  return (
    <Section
      id="services"
      kicker="Services"
      title="How I can help your team"
      description="Whether you're hiring for a role or need a feature built, this is the work I do best."
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.title} delay={i * 80} className="card card-hover flex flex-col p-6 sm:p-7 border-line/20 bg-surface/90">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-white tracking-tight">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.text}</p>
            <ul className="mt-5 space-y-2.5 border-t border-line/15 pt-5">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-blue-500/30 bg-blue-950/30 p-6 sm:p-7 sm:flex-row sm:items-center shadow-lg shadow-black/20">
        <div>
          <p className="text-lg font-bold text-white">Have a role or a project in mind?</p>
          <p className="text-sm text-slate-400 mt-0.5">Let&apos;s build something high-performance and accessible together.</p>
        </div>
        <a href="#contact" className="btn-accent group shrink-0">
          Start a conversation
          <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}
