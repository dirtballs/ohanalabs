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
  const [steady, skylight] = releasedApps;

  return (
    <>
      <SiteNav />

      <main id="main">
        {/* 1. HERO. Full viewport, type-led, screenshots floating in the
              glow behind the headline. */}
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pt-16 sm:px-8">
          <div className="caustics" aria-hidden="true" />
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(35_191_165/0.22),transparent_66%)] blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Deliberately NOT wrapped in Reveal. Motion server-renders its
                initial state as opacity:0, so reveal-gating the hero left the
                headline invisible until hydration and pushed LCP to 3.1s on a
                throttled phone. Above-the-fold copy paints immediately now;
                only the screenshots animate, which also keeps this view to the
                one-or-two animated elements the motion rules allow. */}
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                iPhone apps, built with ohana in mind
              </p>

              <h1 className="mt-7 text-[clamp(3.5rem,11vw,9rem)] font-semibold leading-[0.88] tracking-display">
                Built with
                <br />
                <span className="text-tide-400">aloha.</span>
              </h1>

              <p className="mt-8 max-w-[38ch] text-lg leading-8 text-sand-500 sm:text-xl">
                {title(spell(appList.length))} apps for your health, your weather, your books, and
                what is for dinner.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#apps"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                >
                  Explore the apps
                  <ArrowRight size={16} weight="bold" />
                </a>
                <a
                  href="mailto:support@ohanalabs.app"
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Get in touch
                </a>
                <a
                  href={CUSTOM_APP_MAIL}
                  className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Want an app built?
                </a>
              </div>
            </div>

            {/* Visible on every size. When this was hidden below lg the
                mobile hero had no image at all, which also handed LCP to
                an un-prioritised screenshot further down the stack. */}
            <Reveal delay={0.14} className="relative">
              <div className="relative mx-auto flex h-[19rem] max-w-sm items-center justify-center sm:h-[26rem] sm:max-w-md lg:h-[34rem] lg:max-w-none">
                <div className="absolute left-0 top-4 w-[50%] -rotate-6 lg:top-6 lg:w-[52%]">
                  <Image
                    src={skylight.screenshotPaths[0]}
                    alt={skylight.screenshotAlts?.[0] ?? 'Skylight Home'}
                    width={1179}
                    height={2556}
                    priority
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
                  />
                </div>
                <div className="absolute right-0 top-14 w-[50%] rotate-3 lg:top-24 lg:w-[52%]">
                  <Image
                    src={steady.screenshotPaths[0]}
                    alt={steady.screenshotAlts?.[0] ?? 'Steady Today'}
                    width={1179}
                    height={2556}
                    priority
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
                  />
                </div>
              </div>
            </Reveal>
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

          <AppStack apps={appList} />
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
