import { useEffect, useState } from 'react';

const LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on resize to a desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between
                   px-5 sm:px-8 py-4 sm:py-5"
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 select-none">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(21px, 3.2vw, 26px)',
              letterSpacing: '-0.02em',
              color: '#000',
            }}
            className="tracking-tight"
          >
            Mainframe<span className="text-[0.6em] align-super leading-none">(R)</span>
          </span>
          <span
            aria-hidden="true"
            style={{
              fontSize: 'clamp(25px, 3.6vw, 30px)',
              letterSpacing: '-0.02em',
              color: '#000',
              userSelect: 'none',
            }}
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0 text-[23px]" style={{ color: '#000' }}>
          {LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:opacity-60 transition-opacity"
            >
              {link}
              {i < LINKS.length - 1 && <span className="text-black/40">, </span>}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity"
          style={{ color: '#000' }}
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] h-10 w-10"
        >
          <span
            className={`hamburger-top w-6 h-[2px] bg-black transition-transform duration-300
                        ${open ? 'is-open' : ''}`}
          />
          <span
            className={`hamburger-middle w-6 h-[2px] bg-black transition-opacity duration-300
                        ${open ? 'is-open' : ''}`}
          />
          <span
            className={`hamburger-bottom w-6 h-[2px] bg-black transition-transform duration-300
                        ${open ? 'is-open' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-menu fixed inset-0 z-9 bg-white/95 backdrop-blur-sm
                    flex flex-col items-start justify-center px-8 gap-8
                    ${open ? 'is-open' : 'is-closed'}`}
      >
        {LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium"
            style={{ color: '#000' }}
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium underline underline-offset-2"
          style={{ color: '#000' }}
        >
          Get in touch
        </a>
      </div>
    </>
  );
}