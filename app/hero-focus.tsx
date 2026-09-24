'use client';

import { useState, type FocusEvent, type PointerEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { AppStoreLogo, ArrowRight } from '@phosphor-icons/react';
import type { AppData } from './apps/app-data';
import { Reveal } from './reveal';

export type HeroApp = Pick<
  AppData,
  | 'slug'
  | 'name'
  | 'iconSrc'
  | 'iconAlt'
  | 'screenshotPaths'
  | 'screenshotAlts'
  | 'previewImageSrc'
  | 'previewImageAlt'
  | 'appStoreUrl'
  | 'primaryLink'
  | 'detailHref'
>;

const CUSTOM_APP_MAIL = 'mailto:support@ohanalabs.app?subject=Custom%20iOS%20macOS%20app';

const ctaClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]';
const ghostClass =
  'inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]';

type HeroCta = {
  href: string;
  label: string;
  kind: 'detail' | 'store' | 'link';
};

/**
 * Primary hero CTA for the focused app (hover/focus swap).
 *
 * Live App Store apps use the listing URL. A detail page wins over a
 * mailto primaryLink when there is no listing yet. Mailto primaryLinks
 * stay on this button only — icon clicks never use them.
 */
function heroPrimaryCta(app: HeroApp): HeroCta {
  if (app.appStoreUrl) {
    return { href: app.appStoreUrl, label: 'App Store', kind: 'store' };
  }
  if (app.detailHref) {
    return {
      href: app.detailHref,
      label: app.slug === 'jade-run' ? 'Play Jade Run' : 'How to play',
      kind: 'detail',
    };
  }
  if (app.primaryLink) {
    return { href: app.primaryLink.href, label: app.primaryLink.label, kind: 'link' };
  }
  return { href: `/apps/${app.slug}`, label: app.name, kind: 'detail' };
}

/** In-site page for a strip click. Never mailto, never the App Store URL. */
function heroPageHref(app: HeroApp) {
  return app.detailHref ?? `/apps/${app.slug}`;
}

type Shot = { src: string; alt: string };

function heroShots(app: HeroApp): Shot[] {
  if (app.screenshotPaths.length > 0) {
    return app.screenshotPaths.map((src, i) => ({
      src,
      alt: app.screenshotAlts?.[i] ?? `${app.name} screen`,
    }));
  }
  if (app.previewImageSrc) {
    return [{ src: app.previewImageSrc, alt: app.previewImageAlt ?? `${app.name} on iPhone` }];
  }
  return [];
}

function PhoneShot({
  shot,
  prominent,
  priority,
  sizes,
}: {
  shot: Shot;
  prominent?: boolean;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={1206}
      height={2622}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-full rounded-container shadow-glow ring-1 ${
        prominent ? 'ring-tide-400/50' : 'ring-white/10'
      }`}
    />
  );
}

function HeroPhones({ app }: { app: HeroApp }) {
  const reduce = useReducedMotion();
  const shots = heroShots(app);
  const front = shots[0];
  const left = shots[1];
  const right = shots[2];

  if (!front) return null;

  const collage = Boolean(left || right);

  return (
    <motion.div
      key={app.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex h-[19rem] max-w-sm items-center justify-center sm:h-[26rem] sm:max-w-md lg:h-[34rem] lg:max-w-none"
    >
      {left ? (
        <div className="absolute left-0 top-6 w-[44%] -rotate-7 lg:top-10 lg:w-[46%]">
          <PhoneShot shot={left} sizes="(min-width: 1024px) 18vw, 40vw" />
        </div>
      ) : null}
      {right ? (
        <div className="absolute right-0 top-10 w-[44%] rotate-6 lg:top-16 lg:w-[46%]">
          <PhoneShot shot={right} sizes="(min-width: 1024px) 18vw, 40vw" />
        </div>
      ) : null}
      <div
        className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 ${
          collage ? 'w-[52%] lg:w-[54%]' : 'w-[62%] lg:w-[64%]'
        }`}
      >
        <PhoneShot
          shot={front}
          prominent
          priority={app.slug === 'jade-run'}
          sizes="(min-width: 1024px) 22vw, 48vw"
        />
      </div>
    </motion.div>
  );
}

/**
 * Interactive homepage hero: icon strip + phones + primary CTA.
 *
 * Hover (mouse/pen) or keyboard focus-visible swaps phones and the CTA.
 * Click / tap on an icon goes to that app's page (detailHref or /apps/{slug}),
 * never a mailto. Leaving the strip keeps last focus — no snap-back to Jade.
 */
export function HeroFocus({
  apps,
  defaultSlug,
  children,
}: {
  apps: HeroApp[];
  defaultSlug: string;
  children: ReactNode;
}) {
  const [focusedSlug, setFocusedSlug] = useState(defaultSlug);
  const focused =
    apps.find((app) => app.slug === focusedSlug) ??
    apps.find((app) => app.slug === defaultSlug) ??
    apps[0];

  if (!focused) return null;

  const cta = heroPrimaryCta(focused);
  const ctaInner = (
    <>
      {cta.kind === 'store' ? <AppStoreLogo size={17} weight="fill" /> : null}
      {cta.label}
      {cta.kind !== 'store' ? <ArrowRight size={16} weight="bold" /> : null}
    </>
  );

  function focusApp(slug: string) {
    setFocusedSlug(slug);
  }

  function onIconPointerEnter(event: PointerEvent<HTMLAnchorElement>, slug: string) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    focusApp(slug);
  }

  function onIconFocus(event: FocusEvent<HTMLAnchorElement>, slug: string) {
    if (!event.currentTarget.matches(':focus-visible')) return;
    focusApp(slug);
  }

  return (
    <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        {children}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {cta.href.startsWith('/') ? (
            <Link href={cta.href} className={ctaClass}>
              {ctaInner}
            </Link>
          ) : (
            <a href={cta.href} className={ctaClass}>
              {ctaInner}
            </a>
          )}
          <a href="#apps" className={ghostClass}>
            Explore the apps
          </a>
          <a href={CUSTOM_APP_MAIL} className={ghostClass}>
            Want an app built?
          </a>
        </div>

        <div
          role="group"
          aria-label="Focus an app"
          className="-mx-5 mt-8 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        >
          {apps.map((app) => {
            const selected = app.slug === focused.slug;
            return (
              <Link
                key={app.slug}
                href={heroPageHref(app)}
                title={app.name}
                aria-label={app.name}
                aria-current={selected ? 'true' : undefined}
                onPointerEnter={(event) => onIconPointerEnter(event, app.slug)}
                onFocus={(event) => onIconFocus(event, app.slug)}
                className={`flex shrink-0 flex-col items-center gap-2 rounded-container px-2.5 py-2 transition duration-200 ${
                  selected
                    ? 'bg-tide-400/10 ring-1 ring-tide-400/50'
                    : 'hover:bg-white/5'
                }`}
              >
                <Image
                  src={app.iconSrc}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-inner ring-1 ring-white/10"
                />
                <span
                  className={`max-w-[4.75rem] truncate text-[0.6875rem] ${
                    selected ? 'text-tide-200' : 'text-sand-500'
                  }`}
                >
                  {app.name}
                </span>
              </Link>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {focused.name}
        </p>
      </div>

      <Reveal delay={0.14} className="relative">
        <HeroPhones app={focused} />
      </Reveal>
    </div>
  );
}
