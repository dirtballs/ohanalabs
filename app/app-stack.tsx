'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppStoreLogo, ArrowRight } from '@phosphor-icons/react';
import type { AppData } from './apps/app-data';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky stack of app cards.
 *
 * Motivation (required before adding any animation): storytelling. The
 * studio ships five apps and the point of this section is that they are
 * one family, not a list. Physically stacking them, each card settling
 * over the last, says that in a way a grid cannot.
 *
 * GSAP lives here and only here. Motion drives the reveals in the other
 * sections; the two never share a component tree because they fight over
 * the same frames.
 */
export function AppStack({ apps }: { apps: AppData[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Read the OS preference directly rather than via a hook: this runs
    // once on mount and a hook would re-render the whole stack.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });

        // Each card shrinks and dims as the NEXT one arrives over it.
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      {apps.map((app, i) => (
        <section
          key={app.slug}
          className="stack-card flex min-h-[100dvh] items-center justify-center px-5 py-16 sm:px-8"
        >
          <article className="relative w-full max-w-6xl overflow-hidden rounded-container border border-abyss-700 bg-abyss-900 shadow-lift">
            <div className="caustics opacity-70" aria-hidden="true" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16 lg:p-16">
              <div>
                <div className="flex items-center gap-4">
                  <Image
                    src={app.iconSrc}
                    alt={app.iconAlt}
                    width={56}
                    height={56}
                    className="size-14 rounded-inner ring-1 ring-white/10"
                  />
                  <span className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                    {app.statusLabel}
                  </span>
                </div>

                <h3 className="mt-8 text-5xl font-semibold tracking-display sm:text-7xl">{app.name}</h3>

                <p className="mt-5 max-w-[30ch] text-xl leading-8 text-sand-100 sm:text-2xl sm:leading-9">
                  {app.headline}
                </p>

                <p className="mt-5 max-w-[44ch] leading-7 text-sand-500">{app.shortDescription}</p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {app.appStoreUrl ? (
                    <a
                      href={app.appStoreUrl}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-5 py-3 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                    >
                      <AppStoreLogo size={17} weight="fill" />
                      App Store
                    </a>
                  ) : null}
                  <Link
                    href={`/apps/${app.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                  >
                    {app.appStoreUrl ? 'App details' : 'Preview details'}
                    <ArrowRight size={15} weight="bold" />
                  </Link>
                </div>
              </div>

              {/* Real screenshots. Released apps have three, TestFlight apps
                  have a single preview frame. */}
              <div className="relative flex items-center justify-center gap-4">
                {app.screenshotPaths.length > 0 ? (
                  app.screenshotPaths.slice(0, 3).map((src, n) => (
                    <div
                      key={src}
                      className={`w-1/3 ${n === 1 ? '-translate-y-6' : n === 0 ? 'rotate-[-4deg]' : 'rotate-[4deg]'}`}
                    >
                      <Image
                        src={src}
                        alt={`${app.name} screen ${n + 1}`}
                        width={1179}
                        height={2556}
                        sizes="(min-width: 1024px) 15vw, 28vw"
                        className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10"
                      />
                    </div>
                  ))
                ) : app.previewImageSrc ? (
                  <div className="w-2/3 max-w-[16rem]">
                    <Image
                      src={app.previewImageSrc}
                      alt={app.previewImageAlt ?? `${app.name} on iPhone`}
                      width={945}
                      height={2048}
                      sizes="(min-width: 1024px) 20vw, 55vw"
                      className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
