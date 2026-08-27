/**
 * The Ohana Labs mark: two stacked swells.
 *
 * Hand-rolled SVG is normally avoided, but the taste skill carves out
 * "a single, simple geometric mark" for brand marks specifically. The
 * old site used a 🌺 emoji here, which renders differently on every
 * platform and reads as a placeholder. Two arcs do not.
 */
export function WaveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 22" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 15.5c3.1 0 3.1-4.4 6.2-4.4s3.1 4.4 6.2 4.4 3.1-4.4 6.2-4.4 3.1 4.4 6.2 4.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M5.1 7.2c2.3 0 2.3-3.2 4.6-3.2s2.3 3.2 4.6 3.2 2.3-3.2 4.6-3.2 2.3 3.2 4.6 3.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.42"
      />
    </svg>
  );
}
