import { useEffect, useState } from 'react';
import { CopyButton } from '../components/CopyButton';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const PILL_LABELS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

export function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [pillsVisible, setPillsVisible] = useState(false);

  // Pills become visible 400ms after page load, independent of the typewriter.
  useEffect(() => {
    const t = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className="relative z-10 h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0
                 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <div className="max-w-xl relative z-10">
        {/* 1 · Blurred intro label */}
        <p
          pointer-events-none select-none
          mb-5 sm:mb-6
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,<br />
          Mainframe's Adaptive Response Interface Agent
        </p>

        {/* 2 · Typewriter text */}
        <p
          mb-5 sm:mb-6
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            color: '#000',
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && <span className="cursor-blink" />}
        </p>

        {/* 3 · Action pill buttons */}
        <div className="flex flex-wrap gap-y-1">
          {PILL_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              className={`pill-enter inline-flex items-center justify-center
                          bg-white text-black border border-black/10 rounded-full
                          text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em]
                          mx-[0.2em] mb-[0.4em] whitespace-nowrap
                          hover:bg-black hover:text-white transition-colors duration-200
                          ${pillsVisible ? 'is-visible' : ''}`}
            >
              {label}
            </button>
          ))}
          <CopyButton email="hello@mainframe.co" />
        </div>
      </div>
    </section>
  );
}