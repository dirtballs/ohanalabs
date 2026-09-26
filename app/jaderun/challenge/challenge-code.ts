/* Mirrors DuelLink.from(code:) in the app: JR2.<kind>.<seed>.<shape>.<difficulty>.<score>

   Validated against the same allowlists the app uses rather than loosely
   pattern-matched, so a code this page accepts is one the app will also accept.
   Showing a board for a code the app would then reject is worse than saying no
   here. */

export const SHAPES = ['lantern', 'pagoda', 'fortress', 'courtyard', 'staircase', 'turtle', 'bridge'] as const;
export const DIFFICULTIES = ['relaxed', 'standard', 'sharp', 'ruthless'] as const;

/* Compared as a digit string rather than with BigInt: the seed is a UInt64 and
   does not fit a JS number, but this project's TypeScript target predates
   BigInt literals, and a shared compiler setting is not worth changing for one
   bounds check. Same digits, same answer. */
const UINT64_MAX = '18446744073709551615';

function withinUInt64(digits: string): boolean {
  const trimmed = digits.replace(/^0+(?=\d)/, '');
  if (trimmed.length !== UINT64_MAX.length) return trimmed.length < UINT64_MAX.length;
  return trimmed <= UINT64_MAX;
}

export type Invite = {
  code: string;
  kind: 'Board challenge' | 'Quick Run challenge' | 'Classic Run challenge';
  shape: string;
  difficulty: string;
  score: number | null;
};

export function parseCode(raw: string | undefined | null): Invite | null {
  if (!raw) return null;
  const text = String(raw).trim();
  const p = text.split('.');
  if (p.length !== 6 || p[0] !== 'JR2') return null;
  if (!['b', 'q', 'c'].includes(p[1])) return null;
  if (!/^\d{1,20}$/.test(p[2])) return null;
  if (!withinUInt64(p[2])) return null;
  if (!(SHAPES as readonly string[]).includes(p[3])) return null;
  if (!(DIFFICULTIES as readonly string[]).includes(p[4])) return null;
  if (p[5] !== '-' && (!/^\d{1,9}$/.test(p[5]) || Number(p[5]) > 100_000_000)) return null;

  return {
    code: text,
    kind: p[1] === 'b' ? 'Board challenge' : p[1] === 'q' ? 'Quick Run challenge' : 'Classic Run challenge',
    shape: p[3],
    difficulty: p[4],
    score: p[5] === '-' ? null : Number(p[5]),
  };
}

/** The custom scheme. Works whether or not universal links have been validated
 *  on the device, which makes it the reliable way into the app. */
export function appLink(code: string) {
  return `jaderun://duel?code=${encodeURIComponent(code)}`;
}
