import useInView from '../hooks/useInView';

/**
 * Reveal — fades/slides children in once they scroll into view.
 * Pure CSS transition (see .reveal in index.css); disabled under prefers-reduced-motion.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
