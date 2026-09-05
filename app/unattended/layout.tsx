import type { Metadata } from 'next';

const description =
  'A desk on your machine. Morning: calendar and email, what needs you today. Drafts in your voice that never send themselves. Weekly: what got done and what is still open. $399 install.';

export const metadata: Metadata = {
  title: { absolute: 'Unattended' },
  description,
  openGraph: {
    title: 'Unattended',
    description,
    url: '/unattended',
    siteName: 'Unattended',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unattended',
    description,
  },
  alternates: { canonical: '/unattended' },
};

/* Google Ads loader + config are injected in the root document <head>
   for this route (see proxy x-pathname). Nested layouts cannot
   hoist the inline config into <head>. */
export const dynamic = 'force-dynamic';

export default function UnattendedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
