import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appList, getAppBySlug } from '../../app-data';

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
    title: `${app.name} Support | Ohana Labs`,
    description: `Support resources for ${app.name}.`,
    alternates: {
      canonical: `https://www.ohanalabs.app/apps/${app.slug}/support`,
    },
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 py-16 text-slate-950 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
        >
          Back to {app.name}
        </Link>

        <div className="mt-8 rounded-[2.5rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-slate-950/[0.05] backdrop-blur sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Support</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{app.name} support</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Questions, bug reports, billing issues, or feature ideas for {app.name} can all start here.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:support@ohanalabs.app"
              className="rounded-3xl bg-slate-50 p-6 transition hover:bg-slate-100"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">support@ohanalabs.app</p>
            </a>
            <a
              href={app.appStoreUrl}
              className="rounded-3xl bg-slate-50 p-6 transition hover:bg-slate-100"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">App Store</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Open {app.name} listing</p>
            </a>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Frequently asked questions</h2>
            <div className="mt-5 space-y-4">
              {app.supportFaqs.map((faq) => (
                <div key={faq.question} className="rounded-3xl bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 leading-8 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-semibold tracking-tight">When you email support</h2>
            <p className="mt-3 leading-8 text-white/75">
              Include the app name, device model, iOS version, and a short description of what happened. Screenshots are helpful when relevant.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
