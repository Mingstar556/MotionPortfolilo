import { useEffect, useRef, useState } from 'react';

/**
 * Selected work — one featured piece.
 * The photo you supplied is the artwork; the copy describes the project.
 * Scroll-driven reveal: the panel fades in as it enters the viewport.
 */
export function WorkSection() {
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
      id="work"
      ref={ref}
      className="section-normal px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Artwork */}
        <figure className="relative overflow-hidden rounded-2xl bg-surface-sunk aspect-[4/5]">
          <img
            src="/assets/photo.jpg"
            alt="A.R.I.A. — Adaptive Response Interface Agent, rendered study"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: visible ? 'scale(1)' : 'scale(1.04)' }}
          />
        </figure>

        {/* Copy */}
        <div className="max-w-md">
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.14em] mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
          >
            Selected work
          </p>
          <h2
            className="font-heading mb-5"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              color: '#000',
            }}
          >
            A.R.I.A.
          </h2>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: 'var(--ink-700)' }}
          >
            An adaptive response interface agent — the system that decides what a
            brand should say next. Built as a motion study: still frame, then the
            frame that moves.
          </p>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--ink-500)' }}
          >
            Design, engineering and the render that carries it. From the brief to
            the shipped page — one team, one motion language.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm sm:text-base underline underline-offset-2 hover:opacity-60 transition-opacity"
            style={{ color: '#000', fontFamily: 'var(--font-heading)' }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}