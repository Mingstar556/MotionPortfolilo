import { FormEvent, useState } from 'react';

/**
 * Contact form.
 * Validates client-side, then opens the user's mail client with the composed
 * message — a real, reachable submission path with no backend required.
 */
export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required.');
    if (!emailOk(email)) return setError('A real email address, please.');
    if (message.trim().length < 10) return setError('Tell us a little more.');

    const body = `Hello,\n\n${name.trim()} wrote:\n\n${message.trim()}\n\n— sent from mainframe.co`;
    const url = `mailto:hello@mainframe.co?subject=New project — ${encodeURIComponent(
      name.trim()
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="openings"
      className="section-loose px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-3xl">
        <p
          className="text-xs sm:text-sm uppercase tracking-[0.14em] mb-5"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
        >
          Openings
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
          Tell us what you're building.
        </h2>

        <form onSubmit={submit} className="grid grid-cols-1 gap-5">
          <label className="block">
            <span className="text-sm mb-2 block" style={{ color: 'var(--ink-700)' }}>
              Name
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full bg-transparent border-b border-black/20 px-0 py-2 text-base focus:outline-none focus:border-black transition-colors"
              style={{ color: '#000' }}
            />
          </label>

          <label className="block">
            <span className="text-sm mb-2 block" style={{ color: 'var(--ink-700)' }}>
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full bg-transparent border-b border-black/20 px-0 py-2 text-base focus:outline-none focus:border-black transition-colors"
              style={{ color: '#000' }}
            />
          </label>

          <label className="block">
            <span className="text-sm mb-2 block" style={{ color: 'var(--ink-700)' }}>
              What's the project?
            </span>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A short brief — what, who, when."
              className="w-full bg-transparent border-b border-black/20 px-0 py-2 text-base focus:outline-none focus:border-black transition-colors resize-none"
              style={{ color: '#000' }}
            />
          </label>

          {error && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              {error}
            </p>
          )}
          {sent && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              Opening your mail client…
            </p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm sm:text-base hover:bg-black/80 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Send the brief
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-xs" style={{ color: 'var(--ink-300)' }}>
              or hello@mainframe.co
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}