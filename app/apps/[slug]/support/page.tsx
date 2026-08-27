import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { appList, getAppBySlug } from '../../app-data';
import { SiteNav } from '../../../site-chrome';
import { BackLink, InnerPage, MailLink, PageHeader } from '../../../page-shell';

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
    title: `${app.name} support`,
    description: `Support resources for ${app.name}.`,
    alternates: { canonical: `https://www.ohanalabs.app/apps/${app.slug}/support` },
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      <SiteNav />

      <InnerPage>
        <BackLink href={`/apps/${app.slug}`}>{app.name}</BackLink>

        <PageHeader
          eyebrow="Support"
          title={`${app.name} support`}
          lede={`Questions, bug reports, billing issues, or feature ideas for ${app.name} can all start here.`}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-2">
          <a
            href="mailto:support@ohanalabs.app"
            className="bg-abyss-900 p-7 transition hover:bg-abyss-800"
          >
            <p className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">Email</p>
            <p className="mt-3 text-lg font-semibold text-tide-400">support@ohanalabs.app</p>
          </a>
          {app.appStoreUrl ? (
            <a href={app.appStoreUrl} className="bg-abyss-900 p-7 transition hover:bg-abyss-800">
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
                App Store
              </p>
              <p className="mt-3 text-lg font-semibold text-tide-400">Open the {app.name} listing</p>
            </a>
          ) : (
            <div className="bg-abyss-900 p-7">
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-sand-600">
                Release stage
              </p>
              <p className="mt-3 text-lg font-semibold text-sand-100">{app.statusLabel}</p>
            </div>
          )}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-heading text-sand-100 sm:text-3xl">
            Common questions
          </h2>

          <dl className="mt-10 grid gap-10">
            {app.supportFaqs.map((faq) => (
              <div key={faq.question} className="grid gap-3 lg:grid-cols-[0.45fr_1fr] lg:gap-12">
                <dt className="text-base font-semibold text-sand-100">{faq.question}</dt>
                <dd className="max-w-[64ch] leading-8 text-sand-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-20 rounded-container border border-abyss-700 bg-abyss-900 p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-heading text-sand-100">
            When you email support
          </h2>
          <p className="mt-3 max-w-[62ch] leading-8 text-sand-500">
            Include the app name, device model, iOS version, and a short description of what
            happened. Screenshots help when the problem is something you can see. Send it to{' '}
            <MailLink />.
          </p>
        </section>
      </InnerPage>
    </>
  );
}
