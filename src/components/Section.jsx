import Reveal from './Reveal';

/** Section — consistent spacing and heading treatment for every page section. */
export default function Section({ id, kicker, title, description, className = '', children }) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-12 sm:py-16 ${className}`}>
      <div className="container-x">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <p className="kicker">{kicker}</p>
          <h2 id={headingId} className="mt-3 text-3xl font-bold text-fg sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
