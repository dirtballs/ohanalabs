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
    title: `${app.name} Privacy | Ohana Labs`,
    description: `Privacy information for ${app.name}.`,
    alternates: {
      canonical: `https://www.ohanalabs.app/apps/${app.slug}/privacy`,
    },
  };
}

export default async function AppPrivacyPage({ params }: PageProps) {
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
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{app.name} privacy</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This page explains the privacy approach for {app.name} and how to contact Ohana Labs LLC with privacy questions.
          </p>
          <p className="mt-4 text-sm text-slate-500">Effective date: June 5, 2026</p>

          <div className="mt-12 space-y-8">
            {app.privacySections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-[2rem] bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Contact</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              For privacy questions about {app.name}, contact{' '}
              <a className="font-semibold text-slate-900" href="mailto:support@ohanalabs.app">
                support@ohanalabs.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
