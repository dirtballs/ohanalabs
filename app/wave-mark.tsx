/**
 * The Ohana Labs mark: two palm trees.
 *
 * Hand-rolled SVG is normally avoided, but the taste skill carves out
 * "a single, simple geometric mark" for brand marks specifically. Replaces
 * the old double-swell waves so the site reads more Hawaiian without a
 * full rebrand. Same currentColor stroke so tide teal still flows through.
 */
export function WaveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 22" fill="none" aria-hidden="true" className={className}>
      {/* left palm */}
      <path
        d="M9.5 19.5V9.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.2C7 8.4 5.2 6.2 4.3 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.2C12 8.4 13.8 6.2 14.7 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.2C6.6 10 4.5 10.4 3 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.2C12.4 10 14.5 10.4 16 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.2C8.2 7 7.5 5.2 7.2 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M9.5 9.2C10.8 7 11.5 5.2 11.8 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* right palm */}
      <path
        d="M22.5 19.5V9.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M22.5 9.2C20 8.4 18.2 6.2 17.3 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M22.5 9.2C25 8.4 26.8 6.2 27.7 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M22.5 9.2C19.6 10 17.5 10.4 16 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M22.5 9.2C25.4 10 27.5 10.4 29 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M22.5 9.2C21.2 7 20.5 5.2 20.2 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M22.5 9.2C23.8 7 24.5 5.2 24.8 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
