import { useEffect, useState } from 'react';

/**
 * Typewriter hook.
 * After `startDelay`, reveals one character of `text` every `speed` ms.
 * Returns { displayed, done }. Re-runs whenever `text` changes.
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [length, setLength] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLength(0);
    setDone(false);
    if (!text) return;

    const startTimer = window.setTimeout(() => {
      if (length >= text.length) {
        setDone(true);
        return;
      }
      const stepTimer = window.setInterval(() => {
        setLength((l) => {
          if (l + 1 >= text.length) {
            setDone(true);
            window.clearInterval(stepTimer);
          }
          return l + 1;
        });
      }, speed);
      return () => window.clearInterval(stepTimer);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay]);

  return { displayed: text.slice(0, length), done };
}