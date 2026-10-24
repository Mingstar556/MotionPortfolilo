import { useEffect, useRef, useState } from 'react';

/**
 * About / approach — short, specific, one real fact.
 * Scroll-driven reveal: the panel fades in as it enters the viewport.
 */
export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`section-loose px-5 sm:px-8 md:px-10 transition-opacity duration-700 ease-out
                  ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-3xl">
        <p
          className="text-xs sm:text-sm uppercase tracking-[0.14em] mb-5"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
        >
          How we operate
        </p>
        <h2
          className="font-heading mb-8"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            color: '#000',
          }}
        >
          We build the thing that moves.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {[
            ['Design', 'Type, spacing and the frame it sits in.'],
            ['Engineering', 'React, TypeScript, Vite — the page that ships.'],
            ['Motion', 'The thing that makes a brand feel alive.'],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-black/10 pt-5">
              <h3
                className="font-heading mb-2"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', color: '#000' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
        <p
          className="mt-12 text-base sm:text-lg leading-relaxed max-w-2xl"
          style={{ color: 'var(--ink-700)' }}
        >
          Freelance web developer. Motion-first pages for studios, founders and
          the people who need a site that doesn't look like one.
        </p>
      </div>
    </section>
  );
}