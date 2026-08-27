import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { appList, getAppBySlug } from '../../app-data';
import { SiteNav } from '../../../site-chrome';
import { BackLink, ContactCard, InnerPage, MailLink, PageHeader, ProseSections } from '../../../page-shell';

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
    title: `${app.name} privacy`,
    description: `Privacy information for ${app.name}.`,
    alternates: { canonical: `https://www.ohanalabs.app/apps/${app.slug}/privacy` },
  };
}

export default async function AppPrivacyPage({ params }: PageProps) {
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
          eyebrow="Privacy"
          title={`${app.name} privacy`}
          lede={`How ${app.name} handles your information, and how to reach Ohana Labs LLC with privacy questions.`}
          meta="Effective date: July 18, 2026"
        />

        <ProseSections sections={app.privacySections} />

        <ContactCard>
          For privacy questions about {app.name}, contact <MailLink />.
        </ContactCard>
      </InnerPage>
    </>
  );
}
