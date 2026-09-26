import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '../../site-chrome';
import { BackLink, InnerPage, PageHeader, SiteFooter } from '../../page-shell';

export const metadata: Metadata = {
  title: 'Jade Run · Challenge',
  description: 'Someone sent you a Jade Run board. Same tiles, same rules, your choices.',
  alternates: { canonical: 'https://www.ohanalabs.app/jaderun/challenge' },
  robots: { index: false, follow: true },
};

const APP_STORE_URL = 'https://apps.apple.com/app/id6802475679';

/* A challenge link has two audiences and they need opposite things.

   Someone who already has Jade Run should never see this page: the universal
   link hands the code straight to the app. This is what the other one sees —
   a person who was sent a score to beat and does not have the game. So the
   page has exactly one job, which is to show them what they were sent and
   where to get it.

   The previous host answered 401 to anonymous visitors, which meant every
   shared challenge led to a login wall. That is the whole reason this moved. */

type Search = { code?: string | string[] };

/** Mirrors DuelLink.from(code:) in the app: JR2.<kind>.<seed>.<shape>.<difficulty>.<score> */
function parseCode(raw: string | undefined) {
  if (!raw) return null;
  const parts = raw.trim().split('.');
  if (parts.length !== 6 || parts[0] !== 'JR2') return null;
  if (!['q', 'c', 'b'].includes(parts[1])) return null;
  if (!/^\d+$/.test(parts[2])) return null;
  const score = parts[5] === '-' ? null : Number(parts[5]);
  if (score !== null && (!Number.isInteger(score) || score < 0 || score > 100_000_000)) return null;
  const kind = parts[1] === 'b' ? 'Board challenge' : parts[1] === 'q' ? 'Quick Run challenge' : 'Classic Run challenge';
  return { kind, shape: parts[3], difficulty: parts[4], score, code: raw.trim() };
}

export default async function ChallengePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  // Only ever one code. Duplicated query keys are a malformed link, not a choice.
  const raw = Array.isArray(params.code) ? undefined : params.code;
  const invite = parseCode(raw);

  return (
    <InnerPage>
      <SiteNav />
      <PageHeader
        eyebrow="Jade Run"
        title={invite ? 'You have been challenged' : 'Jade Run challenge'}
        lede={
          invite
            ? 'Someone sent you their board. Same tiles, same rules — your own charms and your own choices.'
            : 'Challenge links carry a board and a score to beat. This one did not include a valid code.'
        }
      />

      <div className="mt-14 grid gap-10">
        {invite ? (
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            {invite.score !== null ? (
              <>
                <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                  Score to beat
                </p>
                <p className="mt-3 text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-none tracking-display">
                  {invite.score.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-lg text-sand-300">{invite.kind}</p>
            )}
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Type', invite.kind],
                ['Board', invite.shape],
                ['Difficulty', invite.difficulty],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
                    {label}
                  </dt>
                  <dd className="mt-1 text-base capitalize text-sand-200">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-sand-500">
              Challenge code
              <code className="ml-2 select-all break-all font-mono text-sand-300">{invite.code}</code>
            </p>
          </section>
        ) : null}

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold tracking-heading text-sand-100">
            {invite ? 'Play this board' : 'Get Jade Run'}
          </h2>
          <p className="mt-3 max-w-[56ch] text-base leading-8 text-sand-300">
            {invite
              ? 'If you already have Jade Run, opening this link takes you straight to the board. Otherwise install the game, then paste the code above into Menu → Enter a challenge code.'
              : 'Mahjong solitaire where depth and speed both pay, wrapped in a roguelite run.'}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center rounded-full bg-sand-100 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-white"
            >
              Download on the App Store
            </a>
            <Link
              href="/jaderun"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-sand-200 transition hover:border-white/30"
            >
              How to play
            </Link>
          </div>
          <p className="mt-6 text-sm text-sand-600">
            Friend challenges are for fun and are not ranked. The score in a code is self-reported,
            not a verified record.
          </p>
        </section>

        <BackLink href="/jaderun">Back to Jade Run</BackLink>
      </div>

      <SiteFooter />
    </InnerPage>
  );
}
