import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appList, getAppBySlug } from '../app-data';

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
    title: `${app.name} | Ohana Labs`,
    description: app.shortDescription,
    alternates: {
      canonical: `https://www.ohanalabs.app/apps/${app.slug}`,
    },
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 py-10 text-slate-950 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
        >
          Back to home
        </Link>

        <section className={`mt-8 overflow-hidden rounded-[2.75rem] border border-white bg-gradient-to-br ${app.gradient} p-8 shadow-2xl shadow-slate-950/[0.06] sm:p-12`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">{app.category}</p>
              <div className="mt-5 flex items-center gap-5">
                <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-white/80">
                  <Image src={app.iconSrc} alt={app.iconAlt} width={112} height={112} className="block size-28 object-cover" />
                </div>
                <div>
                  <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">{app.name}</h1>
                  <p className="mt-3 text-sm font-semibold text-slate-700">{app.availability}</p>
                </div>
              </div>
              <p className="mt-8 max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">{app.headline}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{app.longDescription}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={app.appStoreUrl}
                  className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {app.storeLabel}
                </a>
                <Link
                  href={`/apps/${app.slug}/support`}
                  className="rounded-full border border-slate-200 bg-white/85 px-6 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Visit support
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Pricing</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{app.priceLabel}</p>
                </div>
                <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Best for</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{app.shortDescription}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
              {app.screenshotPaths.map((path, index) => (
                <div key={path} className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-lg shadow-slate-950/[0.06]">
                  <Image
                    src={path}
                    alt={`${app.name} screenshot ${index + 1}`}
                    width={300}
                    height={650}
                    className="h-auto w-full rounded-[1.5rem]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-300">Why it stands out</p>
            <div className="mt-6 space-y-4">
              {app.highlights.map((highlight) => (
                <div key={highlight} className="rounded-3xl bg-white/[0.05] p-5 text-base leading-7 text-white/80">
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-950/[0.04] sm:p-10">
            <div className="space-y-8">
              {app.featureSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                  <ul className="mt-4 space-y-3 text-base leading-8 text-slate-600">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50 px-5 py-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-white bg-white p-8 shadow-xl shadow-slate-950/[0.04] sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Need help?</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Support, privacy, and store links in one place.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/apps/${app.slug}/support`}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Support page
              </Link>
              <Link
                href={`/apps/${app.slug}/privacy`}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Privacy page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
