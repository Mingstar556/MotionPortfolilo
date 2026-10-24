export function Footer() {
  return (
    <footer
      id="contact"
      className="section-loose px-5 sm:px-8 md:px-10 border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <p
            className="font-heading mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.98, letterSpacing: '-0.03em', color: '#000' }}
          >
            Let's build it.
          </p>
          <a
            href="mailto:hello@mainframe.co"
            className="text-base sm:text-lg underline underline-offset-2 hover:opacity-60 transition-opacity"
            style={{ color: 'var(--ink-700)' }}
          >
            hello@mainframe.co
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--ink-500)' }}>
          <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">Approach</a>
          <a href="mailto:hello@mainframe.co" className="hover:opacity-60 transition-opacity">Get in touch</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-black/10 flex items-center justify-between">
        <span
          className="font-heading text-sm"
          style={{ color: 'var(--ink-500)' }}
        >
          Mainframe<span className="text-[0.6em] align-super">(R)</span>
        </span>
        <span className="text-xs" style={{ color: 'var(--ink-300)' }}>
          © {new Date().getFullYear()} Mainframe. Built with motion.
        </span>
      </div>
    </footer>
  );
}