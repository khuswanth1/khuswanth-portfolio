import { useEffect, useState } from 'react';

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * RoleTyper — types and deletes a rotating list of role titles.
 * Screen readers get the first title as static text; the animation is aria-hidden.
 * Reduced-motion visitors see the first title with no animation.
 */
export default function RoleTyper({ words, className = '' }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reduceMotion()) return undefined;
    let word = 0;
    let count = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = words[word];
      count += deleting ? -1 : 1;
      setText(current.slice(0, count));
      let delay = deleting ? 35 : 70;
      if (!deleting && count === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && count === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className={className}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}
