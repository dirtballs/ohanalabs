'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { parseCode } from './challenge-code';

/* Someone can be sent a code without a link — pasted into a message, read off
   a screenshot, copied from the share sheet. The page tells them to paste it
   somewhere, so it has to be somewhere they can paste it. */

export function CodeEntry() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mt-8"
      onSubmit={(event) => {
        event.preventDefault();
        const invite = parseCode(value);
        if (!invite) {
          setError('That code is invalid or uses different rules. Ask your friend for a new code.');
          return;
        }
        setError(null);
        router.push(`/jaderun/challenge?code=${encodeURIComponent(invite.code)}`);
      }}
    >
      <label htmlFor="code" className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
        Have a code?
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          id="code"
          name="code"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
          }}
          placeholder="JR2.…"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/30 px-6 py-3.5 font-mono text-sm text-sand-100 outline-none transition placeholder:text-sand-600 focus:border-tide-400"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-sand-200 transition hover:border-white/30"
        >
          Show the board
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-sand-400">{error}</p> : null}
    </form>
  );
}

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-4">
      <code className="select-all break-all font-mono text-base text-sand-200">{code}</code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard is blocked in some contexts. The code is select-all, so
            // there is still a way through; just say so rather than failing mute.
            setCopied(false);
          }
        }}
        className="text-sm font-semibold text-tide-200 transition hover:text-tide-100"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
