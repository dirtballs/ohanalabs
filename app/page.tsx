import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { appList, comingSoonApps, previewApps, releasedApps } from './apps/app-data';
import { SiteNav } from './site-chrome';
import { WaveMark } from './wave-mark';
import { AppStack } from './app-stack';
import { Reveal, RevealGroup, RevealItem } from './reveal';

const CUSTOM_APP_MAIL = 'mailto:support@ohanalabs.app?subject=Custom%20iOS%20macOS%20app';

const values: Array<[string, string]> = [
  ['Calm on purpose', 'An app should lower the volume of your day, not raise it.'],
  ['Your details stay yours', 'Health and home data stays on your device wherever we can manage it.'],
  ['Small things, done right', 'The screens you open every morning get the most attention.'],
  ['Made for the real week', 'Designed around the week you actually have, not an ideal one.'],
];

const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/** Spell small counts so copy stays in sync with app-data rather than
 *  hardcoding a number that goes stale each time an app ships. */
function spell(n: number) {
  return numberWords[n] ?? String(n);
}
const title = (s: string) => s.replace(/^\w/, (c) => c.toUpperCase());

export default function Home() {
  const steady = appList.find((a) => a.slug === 'steady')!;
  const skylight = appList.find((a) => a.slug === 'skylight')!;
  const jade = appList.find((a) => a.slug === 'jade-run')!;
  /* Launch-week stack: Steady → Jade → rest (Jade at #2). */
  const stackApps = [
    steady,
    jade,
    ...appList.filter((a) => a.slug !== 'steady' && a.slug !== 'jade-run'),
  ];

  return (
    <>
      <SiteNav />

      <main id="main">
        {/* 1. HERO. Dual phones + Jade board front-center for launch week. */}
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pt-16 sm:px-8">
          <div className="caustics" aria-hidden="true" />
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(47_126_216/0.22),transparent_66%)] blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-tide-400/40 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-label text-tide-200">
                Jade Run · App Store soon
              </p>

              <h1 className="mt-7 text-[clamp(3.5rem,11vw,9rem)] font-semibold leading-[0.88] tracking-display">
                Built with
                <br />
                <span className="text-tide-400">aloha.</span>
              </h1>

              <p className="mt-8 max-w-[38ch] text-lg leading-8 text-sand-500 sm:text-xl">
                {title(spell(appList.length))} apps for your health, your weather, your books,
                what is for dinner, and a tile-matching run.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/jaderun"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                >
                  Play Jade Run
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <a
                  href="#apps"
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Explore the apps
                </a>
                <a
                  href={CUSTOM_APP_MAIL}
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Want an app built?
                </a>
              </div>
            </div>

            <Reveal delay={0.14} className="relative">
              <div className="relative mx-auto flex h-[19rem] max-w-sm items-center justify-center sm:h-[26rem] sm:max-w-md lg:h-[34rem] lg:max-w-none">
                <div className="absolute left-0 top-6 w-[44%] -rotate-7 lg:top-10 lg:w-[46%]">
                  <Image
                    src={skylight.screenshotPaths[0]}
                    alt={skylight.screenshotAlts?.[0] ?? 'Skylight Home'}
                    width={1179}
                    height={2556}
                    priority
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
                  />
                </div>
                <div className="absolute right-0 top-10 w-[44%] rotate-6 lg:top-16 lg:w-[46%]">
                  <Image
                    src={steady.screenshotPaths[0]}
                    alt={steady.screenshotAlts?.[0] ?? 'Steady Today'}
                    width={1179}
                    height={2556}
                    priority
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
                  />
                </div>
                <div className="absolute left-1/2 top-0 z-10 w-[52%] -translate-x-1/2 lg:w-[54%]">
                  <Image
                    src={jade.screenshotPaths[0]}
                    alt={jade.screenshotAlts?.[0] ?? 'Jade Run board'}
                    width={1206}
                    height={2622}
                    priority
                    sizes="(min-width: 1024px) 22vw, 48vw"
                    className="h-auto w-full rounded-container shadow-glow ring-1 ring-tide-400/50"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 1b. JADE LAUNCH STRIP — between hero and apps. */}
        <section
          aria-label="Jade Run launch"
          className="relative border-y border-white/5 bg-tide-900/25"
        >
          <div className="caustics opacity-50" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                Jade Run · coming to the App Store
              </p>
              <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold tracking-display sm:text-5xl">
                Match tiles. Build a run.
              </h2>
              <p className="mt-5 max-w-[44ch] text-lg leading-8 text-sand-300">
                Read the board, keep the chain, draft the charm that changes the run.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/jaderun"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                >
                  How to play
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <a
                  href="mailto:support@ohanalabs.app?subject=Jade%20Run%20TestFlight"
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Ask for TestFlight
                </a>
              </div>
            </div>
            <div className="mx-auto w-[58%] max-w-[16rem] lg:w-[70%]">
              <Image
                src={jade.screenshotPaths[0]}
                alt={jade.screenshotAlts?.[0] ?? 'Jade Run board'}
                width={1206}
                height={2622}
                sizes="(min-width: 1024px) 18vw, 50vw"
                className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10"
              />
            </div>
          </div>
        </section>

        {/* 2. THE STACK. Every app pins and settles over the last one.
              GSAP island, isolated from the Motion reveals elsewhere. */}
        <section id="apps" className="relative">
          <div className="mx-auto max-w-6xl px-5 pb-4 pt-24 sm:px-8">
            <Reveal>
              <h2 className="max-w-[18ch] text-4xl font-semibold leading-[1.02] tracking-display sm:text-6xl">
                {title(spell(appList.length))} apps for the parts of the day that repeat.
              </h2>
              <p className="mt-7 max-w-[52ch] text-lg leading-8 text-sand-500">
                {[
                  `${title(spell(releasedApps.length))} on the App Store`,
                  `${spell(previewApps.length)} in TestFlight`,
                  comingSoonApps.length
                    ? `${spell(comingSoonApps.length)} coming soon`
                    : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
                . Ohana means family, and that sets the bar.
              </p>
            </Reveal>
          </div>

          <AppStack apps={stackApps} />
        </section>

        {/* 3. WHY OHANA. Full-bleed ambient field, type at poster scale. */}
        <section id="ohana" className="relative overflow-hidden border-t border-white/5">
          <div className="caustics" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:py-40">
            <Reveal>
              <WaveMark className="w-16 text-tide-400" />
              <h2 className="mt-10 max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.98] tracking-display">
                Family is the standard.
              </h2>
              <p className="mt-10 max-w-[54ch] text-lg leading-8 text-sand-300 sm:text-xl sm:leading-9">
                Ohana means nobody gets left behind. For an app that is not a slogan, it is a list:
                open it fast, work when the signal drops, and keep what is personal on the device.
              </p>
            </Reveal>

            <RevealGroup className="mt-20 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(([name, copy]) => (
                <RevealItem key={name} className="bg-abyss-900/80 p-8">
                  <h3 className="text-base font-semibold tracking-heading text-sand-100">{name}</h3>
                  <p className="mt-3 text-sm leading-7 text-sand-500">{copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 4. CONTACT. The quietest thing on the page, on purpose. */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:px-8 lg:py-36">
            <Reveal>
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                Say aloha
              </p>
              <h2 className="mx-auto mt-7 max-w-[16ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-display">
                There is always room at the table.
              </h2>
              <p className="mx-auto mt-7 max-w-[48ch] leading-8 text-sand-500">
                Support, a TestFlight ask, or a custom iOS / macOS build. Same inbox — say which in
                the subject.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:support@ohanalabs.app"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                >
                  Get in touch
                  <ArrowRight size={16} weight="bold" />
                </a>
                <a
                  href={CUSTOM_APP_MAIL}
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Want an app built?
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-sand-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex items-center gap-2.5">
            <WaveMark className="w-5 text-abyss-600" />
            <span>
              <span className="tabular">{new Date().getFullYear()}</span> Ohana Labs LLC. Built with
              aloha.
            </span>
          </p>
          <div className="flex flex-wrap gap-6">
            <a className="transition hover:text-sand-100" href="mailto:support@ohanalabs.app">
              Contact
            </a>
            <Link className="transition hover:text-sand-100" href="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-sand-100" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
