import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { SiteNav } from '../../site-chrome';
import { InnerPage, PageHeader } from '../../page-shell';

export const metadata: Metadata = {
  title: 'Jade Run · Challenge',
  description: 'Someone sent you a Jade Run board. Same tiles, same rules, your choices.',
  alternates: { canonical: 'https://www.ohanalabs.app/jaderun/challenge' },
  robots: { index: false, follow: true },
};

const APP_STORE_URL = 'https://apps.apple.com/app/id6802475679';

/* A challenge link has two readers and they need opposite things.

   Someone who already has Jade Run never sees this page — the universal link
   hands the code straight to the app. This is written for the other one: a
   person who was sent a score to beat and does not have the game. So the page
   has to do two jobs at once, show them what they were sent and make the case
   for the app, and it cannot lean on the code being there. A link that arrives
   without one still has to look like something. */

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
  const kind =
    parts[1] === 'b' ? 'Board challenge' : parts[1] === 'q' ? 'Quick Run challenge' : 'Classic Run challenge';
  return { kind, shape: parts[3], difficulty: parts[4], score, code: raw.trim() };
}

export default async function ChallengePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  // Only ever one code. Duplicated query keys are a malformed link, not a choice.
  const raw = Array.isArray(params.code) ? undefined : params.code;
  const invite = parseCode(raw);

  return (
    <>
      <SiteNav />
      <InnerPage>
        <PageHeader
          eyebrow="Jade Run"
          title={invite ? 'You have been challenged' : 'Same board. Better bragging rights.'}
          lede={
            invite
              ? 'Someone sent you their board. The same tiles in the same places — your own charms, your own choices, your own score.'
              : 'Jade Run challenges hand a friend the exact board you played. Same tiles, same rules, and nothing to argue about afterwards except how you played it.'
          }
        />

        {invite ? (
          <section className="mt-16 rounded-container border border-tide-900/60 bg-tide-900/30 p-8 sm:p-10">
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
              {invite.score !== null ? 'Score to beat' : invite.kind}
            </p>
            {invite.score !== null ? (
              <p className="mt-4 text-[clamp(3rem,10vw,5.5rem)] font-semibold leading-none tracking-display text-sand-100">
                {invite.score.toLocaleString()}
              </p>
            ) : null}
            <dl className="mt-10 grid gap-6 border-t border-white/5 pt-8 sm:grid-cols-3">
              {[
                ['Type', invite.kind],
                ['Board', invite.shape],
                ['Difficulty', invite.difficulty],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">{label}</dt>
                  <dd className="mt-2 text-lg capitalize text-sand-100">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mt-24">
          <h2 className="max-w-xl text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">
            {invite ? 'Play this exact board' : 'Get Jade Run'}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sand-300">
            {invite
              ? 'Install Jade Run, then open this link again and the board loads itself. Already have it? Opening the link takes you straight there.'
              : 'Mahjong solitaire where the tile you take matters. Points scale with how deep the pair sits, and matches inside five seconds build a multiplier — so sweeping the loose edges is the safe line and digging into the middle is the greedy one.'}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center rounded-full bg-sand-100 px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-white"
            >
              Download on the App Store
            </a>
            <Link
              href="/jaderun"
              className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-tide-200 transition hover:text-tide-100"
            >
              How to play <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </section>

        {invite ? (
          <section className="mt-24 border-t border-white/5 pt-10">
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">Challenge code</p>
            <code className="mt-3 block select-all break-all font-mono text-base text-sand-200">{invite.code}</code>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-sand-500">
              If the link does not open the app, paste this into Menu → Enter a challenge code. Friend challenges are
              for fun and are not ranked — the score in a code is self-reported, not a verified record.
            </p>
          </section>
        ) : (
          <section className="mt-24 border-t border-white/5 pt-10">
            <p className="max-w-2xl text-lg leading-8 text-sand-300">
              This link did not carry a challenge code, so there is no board to show. If a friend sent you one, ask
              them to share it again — or install the game and paste the code into Menu → Enter a challenge code.
            </p>
            <Link
              href="/jaderun"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tide-200 transition hover:text-tide-100"
            >
              See how Jade Run plays <ArrowRight size={16} weight="bold" />
            </Link>
          </section>
        )}
      </InnerPage>
    </>
  );
}
