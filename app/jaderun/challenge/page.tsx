import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { SiteNav } from '../../site-chrome';
import { InnerPage, PageHeader } from '../../page-shell';
import { appLink, parseCode } from './challenge-code';
import { CodeEntry, CopyCode } from './code-entry';

export const metadata: Metadata = {
  title: 'Jade Run · Challenge',
  description: 'Someone sent you a Jade Run board. Same tiles, same rules, your choices.',
  alternates: { canonical: 'https://www.ohanalabs.app/jaderun/challenge' },
  robots: { index: false, follow: true },
};

const APP_STORE_URL = 'https://apps.apple.com/app/id6802475679';

/* A challenge link has two readers and they need opposite things.

   Someone who already has Jade Run mostly never sees this page — the universal
   link hands the code straight to the app. This is written for the other one: a
   person who was sent a score to beat and does not have the game. It also has
   to work for a code with no link at all, pasted into a message or read off a
   screenshot, which is why the entry field is here rather than only in the app. */

type Search = { code?: string | string[] };

export default async function ChallengePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  // Only ever one code. Duplicated query keys are a malformed link, not a choice.
  const raw = Array.isArray(params.code) ? undefined : params.code;
  const invite = parseCode(raw);
  const badCode = Boolean(raw) && !invite;

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
          <>
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

            <section className="mt-16">
              <div className="flex flex-wrap items-center gap-3">
                {/* The custom scheme rather than this same https link: it opens
                    the app whether or not universal links have been validated on
                    this device, which makes it the one that always works. */}
                <a
                  href={appLink(invite.code)}
                  className="inline-flex items-center rounded-full bg-tide-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-tide-400"
                >
                  Open in Jade Run
                </a>
                <a
                  href={APP_STORE_URL}
                  className="inline-flex items-center rounded-full bg-sand-100 px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-white"
                >
                  Download on the App Store
                </a>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-sand-400">
                Already have the game? Open in Jade Run loads the board. If nothing happens, install it first — then
                come back, or paste the code below into Menu → Enter a challenge code.
              </p>
            </section>

            <section className="mt-24 border-t border-white/5 pt-10">
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">Challenge code</p>
              <CopyCode code={invite.code} />
              <p className="mt-6 max-w-2xl text-sm leading-7 text-sand-500">
                Friend challenges are for fun and are not ranked — the score in a code is self-reported, not a
                verified record.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mt-16">
              <h2 className="max-w-xl text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">
                Got a code?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-sand-300">
                {badCode
                  ? 'That link carried a code this version does not recognise. Paste the code below, or ask your friend to send a new one.'
                  : 'A challenge code looks like JR2.b.20260925.pagoda.standard.18400 — paste one here to see the board it came from.'}
              </p>
              <CodeEntry />
            </section>

            <section className="mt-24 border-t border-white/5 pt-10">
              <h2 className="max-w-xl text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">
                Get Jade Run
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-sand-300">
                Mahjong solitaire where the tile you take matters. Points scale with how deep the pair sits, and
                matches inside five seconds build a multiplier — so sweeping the loose edges is the safe line and
                digging into the middle is the greedy one.
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
          </>
        )}
      </InnerPage>
    </>
  );
}
