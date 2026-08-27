import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppStoreLogo, ArrowRight } from '@phosphor-icons/react/ssr';
import { appList, getAppBySlug } from '../app-data';
import type { AppData } from '../app-data';
import { SiteNav } from '../../site-chrome';
import { BackLink, SiteFooter } from '../../page-shell';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return appList.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return {};
  }

  return {
    title: app.name,
    description: app.shortDescription,
    alternates: { canonical: `https://www.ohanalabs.app/apps/${app.slug}` },
    openGraph: {
      title: `${app.name} · Ohana Labs`,
      description: app.shortDescription,
      url: `https://www.ohanalabs.app/apps/${app.slug}`,
      type: 'website',
    },
  };
}

/** Screenshots when the app has them, the single preview frame when it
 *  does not. Every app in app-data currently has one or the other, so
 *  there is no third fallback branch to go stale. */
function AppVisual({ app }: { app: AppData }) {
  if (app.screenshotPaths.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {app.screenshotPaths.map((path, i) => (
          <div key={path} className={i === 1 ? 'sm:-translate-y-8' : ''}>
            <Image
              src={path}
              alt={`${app.name} screen ${i + 1}`}
              width={1179}
              height={2556}
              priority={i === 0}
              sizes="(min-width: 1024px) 16vw, 30vw"
              className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[17rem]">
      <Image
        src={app.previewImageSrc as string}
        alt={app.previewImageAlt ?? `${app.name} on iPhone`}
        width={945}
        height={2048}
        priority
        sizes="(min-width: 1024px) 20vw, 60vw"
        className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
      />
    </div>
  );
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      <SiteNav />

      <main id="main">
        {/* Hero. Full-bleed ambient field so the detail page reads as part
            of the same site as the homepage stack. */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="caustics" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 sm:px-8 lg:pb-28">
            <BackLink href="/#apps">All apps</BackLink>

            <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <div className="flex items-center gap-4">
                  <Image
                    src={app.iconSrc}
                    alt={app.iconAlt}
                    width={72}
                    height={72}
                    className="size-16 rounded-inner ring-1 ring-white/10 sm:size-18"
                  />
                  <div>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">
                      {app.statusLabel}
                    </p>
                    <p className="mt-1.5 text-sm text-sand-500">{app.category}</p>
                  </div>
                </div>

                <h1 className="mt-9 text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.95] tracking-display">
                  {app.name}
                </h1>

                <p className="mt-6 max-w-[32ch] text-xl leading-8 text-sand-100 sm:text-2xl sm:leading-9">
                  {app.headline}
                </p>

                <p className="mt-6 max-w-[60ch] leading-8 text-sand-500">{app.longDescription}</p>

                <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                    <dt className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
                      Availability
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-sand-100">{app.availability}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
                      Access
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-sand-100">{app.priceLabel}</dd>
                  </div>
                </dl>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  {app.primaryLink ? (
                    <a
                      href={app.primaryLink.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-tide-400 px-6 py-3.5 text-sm font-semibold text-abyss-950 transition duration-200 hover:bg-tide-200 active:scale-[0.98]"
                    >
                      {app.appStoreUrl ? <AppStoreLogo size={17} weight="fill" /> : null}
                      {app.primaryLink.label}
                    </a>
                  ) : null}
                  <Link
                    href={`/apps/${app.slug}/support`}
                    className="inline-flex items-center justify-center rounded-full border border-abyss-600 px-6 py-3.5 text-sm font-semibold text-sand-300 transition duration-200 hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                  >
                    Support
                  </Link>
                </div>
              </div>

              <AppVisual app={app} />
            </div>
          </div>
        </section>

        {/* Highlights. Numbered editorial list, no card per row. */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-display sm:text-5xl">
              What it does well.
            </h2>

            <ol className="mt-14 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-2">
              {app.highlights.map((highlight, i) => (
                <li key={highlight} className="flex gap-5 bg-abyss-900/80 p-7">
                  <span className="tabular shrink-0 text-sm font-semibold text-tide-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-7 text-sand-300">{highlight}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Feature detail. Two-column reference layout, hairlines between
            groups rather than a border on every item. */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-16">
              {app.featureSections.map((section) => (
                <div key={section.title} className="grid gap-6 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
                  <h2 className="text-2xl font-semibold tracking-heading text-sand-100 lg:text-lg lg:text-sand-500">
                    {section.title}
                  </h2>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item} className="leading-7 text-sand-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wayfinding out. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-[18ch] text-3xl font-semibold leading-[1.1] tracking-display sm:text-4xl">
                Support, privacy, and release details in one place.
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/apps/${app.slug}/support`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Support
                  <ArrowRight size={15} weight="bold" />
                </Link>
                <Link
                  href={`/apps/${app.slug}/privacy`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
                >
                  Privacy
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
