import type { Metadata } from 'next';
import { SiteNav } from '../site-chrome';
import { BackLink, ContactCard, InnerPage, MailLink, PageHeader, ProseSections } from '../page-shell';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Ohana Labs website and apps.',
  alternates: { canonical: 'https://www.ohanalabs.app/terms' },
};

const sections = [
  {
    title: 'Use of the site',
    body:
      'You may use the Ohana Labs website for lawful purposes only. You agree not to misuse the site, interfere with its operation, or attempt unauthorized access to any part of the service.',
  },
  {
    title: 'Product information',
    body:
      'We aim to keep information about our apps accurate and current, but features, availability, and timelines may change as products evolve.',
  },
  {
    title: 'No medical advice',
    body:
      'Any health-related app information presented on this site is for general informational purposes only and does not replace professional medical advice, diagnosis, or treatment.',
  },
  {
    title: 'Intellectual property',
    body:
      'The content, branding, design, and software on this site are owned by Ohana Labs LLC unless otherwise noted. You may not copy or reuse them beyond normal personal browsing without permission.',
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteNav />

      <InnerPage>
        <BackLink href="/">Home</BackLink>

        <PageHeader
          eyebrow="Terms"
          title="Terms of Use"
          lede="These terms govern use of the Ohana Labs website and related apps."
          meta="Effective date: June 5, 2026"
        />

        <ProseSections sections={sections} />

        <ContactCard>
          Questions about these terms can be sent to <MailLink />.
        </ContactCard>
      </InnerPage>
    </>
  );
}
