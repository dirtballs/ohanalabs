import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { SiteNav } from './site-chrome';
import { SiteFooter } from './page-shell';
import { WaveMark } from './wave-mark';

/* The site had no custom 404, so a mistyped app URL dropped people on
   Next's default black-and-white error page with no way back.

   The backdrop is a real Skylight screenshot, blurred hard and dimmed.
   There is no image-generation tool in this project, so rather than a
   stock photo of nothing in particular this reuses an asset the studio
   actually owns. It reads as depth, not as a recognisable screen. */
export default function NotFound() {
  return (
    <>
      <SiteNav />

      <main id="main" className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/apps/skylight/screenshot-1.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover opacity-70 blur-[80px] saturate-[1.7]"
        />
        {/* Vignette rather than a flat scrim, so the blur stays visible at
            the edges but the copy keeps its contrast in the middle. */}
        <div
          className="absolute inset-0 bg-[radial-gradient(closest-side,rgb(7_13_12/0.92),rgb(7_13_12/0.62))]"
          aria-hidden="true"
        />
        <div className="caustics opacity-80" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-2xl text-center">
          <WaveMark className="mx-auto w-14 text-tide-400" />

          <h1 className="mt-10 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-display">
            This one drifted off.
          </h1>

          <p className="mx-auto mt-7 max-w-[46ch] text-lg leading-8 text-sand-500">
            The page you were after is not here. It may have moved, or the link may have a typo in
            it.
          </p>

          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
            >
              Back home
              <ArrowRight size={16} weight="bold" />
            </Link>
            <a
              href="mailto:support@ohanalabs.app"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-abyss-950/50 px-6 py-3.5 text-sm font-semibold text-sand-100 backdrop-blur-sm transition duration-200 hover:border-tide-400 hover:bg-abyss-950/70 active:scale-[0.98]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
