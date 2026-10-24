import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    title: 'A.R.I.A.',
    year: '2026',
    tags: ['Motion', 'AI', 'Interface'],
    image: '/assets/photo-art.jpg',
    alt: 'A.R.I.A. study render',
  },
  {
    title: 'Motion Web',
    year: '2026',
    tags: ['Design', 'Animation', 'Web'],
    image: '/assets/photo-art.jpg',
    alt: 'Motion system study',
  },
  {
    title: 'Mainframe',
    year: '2026',
    tags: ['Brand', 'Identity', 'Type'],
    image: '/assets/photo-art.jpg',
    alt: 'Mainframe identity study',
  },
];

/**
 * Projects — a staggered grid of work.
 * Each card fades up as it enters the viewport, staggered by index.
 */
export function ProjectsSection() {
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="studio"
      ref={ref}
      className="section-normal px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs sm:text-sm uppercase tracking-[0.14em] mb-3"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
            >
              Studio
            </p>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                color: '#000',
              }}
            >
              Selected work.
            </h2>
          </div>
          <p
            className="hidden sm:block text-sm"
            style={{ color: 'var(--ink-500)' }}
          >
            {PROJECTS.length} pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className={`group cursor-pointer transition-all duration-700 ease-out
                          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <figure className="relative overflow-hidden rounded-2xl bg-surface-sunk aspect-[4/5] mb-4">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(250,249,247,0.15), rgba(250,249,247,0.55))',
                  }}
                />
              </figure>
              <div className="flex items-baseline justify-between">
                <h3
                  className="font-heading"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', color: '#000' }}
                >
                  {p.title}
                </h3>
                <span className="text-sm" style={{ color: 'var(--ink-300)' }}>
                  {p.year}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs"
                    style={{ color: 'var(--ink-500)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}