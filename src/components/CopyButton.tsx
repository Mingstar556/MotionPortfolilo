import { useState } from 'react';

export function CopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* fallback: nothing — the address is visible on screen */
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy ${email} to clipboard`}
      className="inline-flex items-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-200"
    >
      <span>
        Reach us: <span className="underline underline-offset-1">{email}</span>
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      {copied && (
        <span className="text-[11px] text-black/60 ml-1">copied</span>
      )}
    </button>
  );
}