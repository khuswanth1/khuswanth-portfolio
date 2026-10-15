import { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * CountUp — animates a numeric value (e.g. "8.31", "4", "1.5+") from zero once it scrolls into view.
 * Non-numeric values and reduced-motion users get the final text straight away.
 */
export default function CountUp({ value, duration = 1200 }) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value));
  const target = match ? parseFloat(match[1]) : null;
  const decimals = match?.[1].split('.')[1]?.length ?? 0;
  const suffix = match?.[2] ?? '';
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!inView || target === null || reduceMotion()) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCurrent(target * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  const shown = current === null || target === null ? String(value) : `${current.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
