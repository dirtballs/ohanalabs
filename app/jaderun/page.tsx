import type { Metadata } from 'next';
import Link from 'next/link';
import { ShotGallery } from '../shot-lightbox';
import { AppStoreLogo, ArrowRight, Check, Lightning, Stack, Target } from '@phosphor-icons/react/ssr';
import { getAppBySlug } from '../apps/app-data';
import { SiteNav } from '../site-chrome';
import { BackLink, InnerPage, PageHeader } from '../page-shell';

export const metadata: Metadata = {
  title: 'Jade Run · How to play',
  description: 'The rules, scoring system, charms, and board layouts for Jade Run.',
  alternates: { canonical: 'https://www.ohanalabs.app/jaderun' },
};

const charms = [
  ['Deep Current', 'Adds 0.4 depth to every match.', 'Build'],
  ['Cascade', 'Raises the combo ceiling by two steps.', 'Build'],
  ['Long Breath', 'Adds 3 seconds to the chain window.', 'Tempo'],
  ['Steady Hand', 'Adds 40 points to every match.', 'Score'],
  ["Seer's Eye", 'Grants 2 additional hints.', 'Utility'],
  ['Second Wind', 'Grants 2 additional shuffles.', 'Utility'],
  ['Garden Gate', 'Triples bonus tiles.', 'Score'],
  ['Swift Close', 'Doubles the remaining clear bonus.', 'Finish'],
  ["Fool's Gold", 'Multiplies score by 1.6× and removes the normal shuffle cushion.', 'Risk'],
  ['Jade River', 'Multiplies the run score by 1.35×.', 'Score'],
  ['Patient Stone', 'Makes the combo window effectively unlimited.', 'Tempo'],
  ['Ivory Fan', 'Bamboo suit matches score 2×.', 'Suit'],
  ['Coin Purse', 'Dot suit matches score 2×.', 'Suit'],
  ["Scholar's Seal", 'Character suit matches score 2×.', 'Suit'],
] as const;

const layouts = [
  ['Lantern', '8 wide', 'Classic'],
  ['Pagoda', '10 wide', 'Classic'],
  ['Fortress', '10 wide', 'Classic'],
  ['Courtyard', '11 wide', 'Classic'],
  ['Staircase', '12 wide', 'Classic'],
  ['Bridge', '14 wide', 'Classic'],
  ['Turtle', '15 wide', 'Classic'],
  ['First Spark', '36 tiles', 'Quick'],
  ['Jade Steps', '48 tiles', 'Quick'],
  ['Summit', '60 tiles', 'Quick'],
] as const;

function RuleCard({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: typeof Check;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-container border border-abyss-700 bg-abyss-900 p-7 sm:p-8">
      <Icon size={23} weight="duotone" className="text-tide-400" />
      <p className="mt-8 text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-heading text-sand-100">{title}</h2>
      <div className="mt-4 text-base leading-7 text-sand-300">{children}</div>
    </article>
  );
}

export default function JadeRunPage() {
  const jade = getAppBySlug('jade-run');
  const appStoreUrl = jade?.appStoreUrl;

  return (
    <>
      <SiteNav />
      <InnerPage>
        <BackLink href="/">Ohana Labs</BackLink>

        <PageHeader
          eyebrow="Jade Run · live on the App Store"
          title="Match tiles. Build a run."
          lede="Jade Run is a tile matching game about reading the board, keeping a clean chain, and choosing the charm that changes the run. Clear every tile before the board locks."
          meta="Available now on the App Store for iPhone and iPad. Requires iOS 26.0 or later."
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {appStoreUrl ? (
            <a
              href={appStoreUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-5 py-3 text-sm font-semibold text-abyss-950 transition hover:bg-tide-200 active:scale-[0.98]"
            >
              <AppStoreLogo size={17} weight="fill" />
              Download on the App Store
            </a>
          ) : null}
          <a
            href="#charms"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
          >
            See the charms
          </a>
        </div>

        <section className="mt-16" aria-label="Jade Run screenshots">
          <ShotGallery
            shots={[
              { src: '/apps/jaderun/screenshot-1.webp', alt: 'Board mid-chain with a score pop' },
              { src: '/apps/jaderun/screenshot-2.webp', alt: 'Draft — choose your first charm' },
              { src: '/apps/jaderun/screenshot-3.webp', alt: 'Run banner near the board target' },
              { src: '/apps/jaderun/screenshot-4.webp', alt: 'Daily result card' },
              { src: '/apps/jaderun/screenshot-5.webp', alt: 'Tile sets — Ivory, Slate, Sakura, Lacquer' },
            ]}
          />
        </section>

        <section className="mt-20 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-4" aria-label="Jade Run at a glance">
          {[
            ['144', 'tiles on a classic board'],
            ['5 sec', 'normal chain window'],
            ['+20%', 'clean unaided bonus'],
            ['3 → 8', 'boards in a run'],
          ].map(([value, label]) => (
            <div key={label} className="bg-abyss-900 p-6 sm:p-7">
              <p className="text-3xl font-semibold tracking-heading text-sand-100">{value}</p>
              <p className="mt-2 text-sm leading-6 text-sand-600">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-24">
          <div className="max-w-2xl">
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">The loop</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">Three decisions make a great run.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <RuleCard icon={Stack} eyebrow="01 · read" title="Find the unlock">
              Look past the obvious pair. Removing a tile can expose a deeper match or open two future moves at once.
            </RuleCard>
            <RuleCard icon={Lightning} eyebrow="02 · chain" title="Keep the rhythm">
              Make the next match within five seconds to grow the combo. A long chain is worth more than a frantic first move.
            </RuleCard>
            <RuleCard icon={Target} eyebrow="03 · shape" title="Spend a charm well">
              Build around the board in front of you. Suit charms reward focus; tempo charms protect a risky, high-value finish.
            </RuleCard>
          </div>
        </section>

        <section className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" id="rules">
          <div>
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">Board rules</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">Every clear starts with a free tile.</h2>
            <p className="mt-6 text-lg leading-8 text-sand-300">A tile is free when no tile overlaps it from above and at least one long side is open. Clear the layers that are blocking your best route.</p>
          </div>
          <div className="space-y-5 text-base leading-7 text-sand-300">
            {[
              'Numbered tiles match only their exact number and suit.',
              'Wind and dragon tiles match their exact kind.',
              'Any two flowers match. Any two seasons match.',
              'When the board locks, use a hint, shuffle, or undo if the run still has one. If it remains stuck, end the board from the recovery control.',
            ].map((rule) => (
              <div key={rule} className="flex gap-4 border-b border-white/5 pb-5">
                <Check size={20} weight="bold" className="mt-1 shrink-0 text-tide-400" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24" id="scoring">
          <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">Scoring</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">Plan for the multiplier stack.</h2>
            <p className="max-w-sm text-base leading-7 text-sand-500">A match is worth more when it is deep, chained, and supported by the right charm.</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-container border border-abyss-700 bg-abyss-900">
            <div className="border-b border-white/5 p-7 sm:p-9">
              <p className="font-mono text-base text-tide-200 sm:text-lg">100 × depth × combo × charm</p>
              <p className="mt-3 text-sm leading-6 text-sand-600">Every match starts at 100 points before the three multipliers are applied.</p>
            </div>
            <div className="grid gap-px bg-white/5 sm:grid-cols-3">
              {[
                ['Depth', '×1.0 → ×3.0', 'Layers 0 through 4 use ×1, ×1.5, ×2, ×2.5, and ×3. Deep Current adds 0.4 depth per layer.'],
                ['Combo', '×1.0 → ×3.0', 'A match within five seconds adds 0.25×, up to ×3. Cascade lifts the ceiling to ×5.'],
                ['Charm', 'by build', 'Jade River adds ×1.35. Suit charms double their family. Steady Hand adds 40 points per match.'],
              ].map(([label, value, body]) => (
                <div key={label} className="bg-abyss-900 p-7">
                  <p className="text-sm font-semibold uppercase tracking-label text-sand-600">{label}</p>
                  <p className="mt-3 text-xl font-semibold tracking-heading text-sand-100">{value}</p>
                  <p className="mt-3 text-sm leading-6 text-sand-500">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="border-l border-tide-500/50 pl-5"><p className="font-semibold text-sand-100">Clear bonus</p><p className="mt-2 text-sm leading-6 text-sand-500">Starts at 5,000, decays by 5 per second, and never falls below 1,000. Swift Close doubles it.</p></div>
            <div className="border-l border-tide-500/50 pl-5"><p className="font-semibold text-sand-100">Unaided</p><p className="mt-2 text-sm leading-6 text-sand-500">Use no hint, shuffle, or undo and earn 20% of that board score.</p></div>
            <div className="border-l border-tide-500/50 pl-5"><p className="font-semibold text-sand-100">Bonus tiles</p><p className="mt-2 text-sm leading-6 text-sand-500">Garden Gate triples bonus tiles. Fool&apos;s Gold gives ×1.6 score while removing the normal shuffle cushion.</p></div>
          </div>
        </section>

        <section className="mt-24" id="charms">
          <div className="max-w-2xl">
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">The charm shelf</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">Choose the rule you want to bend.</h2>
            <p className="mt-5 text-lg leading-8 text-sand-300">Draft a starter charm before a run, then build a shelf of effects as you go. The strongest builds make one idea better.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {charms.map(([name, description, type]) => (
              <div key={name} className="bg-abyss-900 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-sand-100">{name}</p>
                  <span className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-500">{type}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-sand-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24" id="runs">
          <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">Runs and layouts</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">A short sprint or a full climb.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <RuleCard icon={Lightning} eyebrow="Quick Run · 3 boards" title="5,000 → 8,500 → 12,500">
              Three compact boards make Quick Run the daily warm-up. First Spark has 36 tiles, Jade Steps has 48, and Summit has 60.
            </RuleCard>
            <RuleCard icon={Stack} eyebrow="Classic Run · 8 boards" title="Start at 6,000 and climb">
              The target grows by 1.28× each board. Standard layouts begin the run, Sharp boards arrive in the middle, and Ruthless boards begin at board six.
            </RuleCard>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/5 pt-7 sm:grid-cols-2 lg:grid-cols-3">
            {layouts.map(([name, size, mode]) => (
              <div key={name} className="flex items-center justify-between border-b border-white/5 pb-4 text-sm">
                <span className="font-semibold text-sand-100">{name}</span>
                <span className="text-sand-600">{size} · {mode}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-container border border-tide-900/60 bg-tide-900/30 p-8 sm:p-10" id="challenges">
          <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">Daily and friend challenges</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-heading text-sand-100 sm:text-4xl">Same board. Better bragging rights.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sand-300">The daily board is one shared UTC board with one attempt. Friend challenges use a JR2 code so both players receive the same seed, shape, difficulty, target, and run type.</p>
          <Link href="/jaderun/challenge" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tide-200 transition hover:text-tide-200">
            See what a challenge looks like <ArrowRight size={16} weight="bold" />
          </Link>
        </section>

        <section className="mt-24 border-t border-white/5 pt-10">
          <p className="max-w-2xl text-lg leading-8 text-sand-300">Read the board before taking the obvious pair. Clear deep tiles when they unlock future moves. Keep a five-second rhythm, spend charms where they change the board shape, and save the clear bonus by finishing with a plan.</p>
          <Link href="/#apps" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tide-200 transition hover:text-tide-200">See every Ohana Labs app <ArrowRight size={16} weight="bold" /></Link>
        </section>
      </InnerPage>
    </>
  );
}
