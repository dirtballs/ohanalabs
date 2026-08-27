import type { Metadata } from 'next';
import { SiteNav } from '../site-chrome';
import { BackLink, ContactCard, InnerPage, MailLink, PageHeader, ProseSections } from '../page-shell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Ohana Labs website and apps.',
  alternates: { canonical: 'https://www.ohanalabs.app/privacy' },
};

const sections = [
  {
    title: 'Information we collect',
    body:
      'We collect the information you choose to share with us, such as messages sent to support@ohanalabs.app and any details needed to respond to your request.',
  },
  {
    title: 'How we use information',
    body:
      'We use information to operate our website, provide customer support, improve our apps, and communicate about products or support requests you initiate.',
  },
  {
    title: 'How we protect information',
    body:
      'We take reasonable steps to protect the information we receive and aim to keep data collection limited to what is necessary for the service provided.',
  },
  {
    title: 'Third-party services',
    body:
      'Our website and apps may rely on trusted third-party providers for hosting, analytics, payments, support, or app distribution. Those providers process data under their own terms and privacy policies.',
  },
  {
    title: 'Your choices',
    body:
      'You can contact us at support@ohanalabs.app to ask privacy questions, request updates to information you shared with us, or ask for deletion when applicable.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />

      <InnerPage>
        <BackLink href="/">Home</BackLink>

        <PageHeader
          eyebrow="Privacy"
          title="Privacy Policy"
          lede="How Ohana Labs LLC handles information connected to this website and our apps."
          meta="Effective date: June 5, 2026"
        />

        <ProseSections sections={sections} />

        <ContactCard>
          For privacy questions or requests, contact <MailLink />.
        </ContactCard>
      </InnerPage>
    </>
  );
}
