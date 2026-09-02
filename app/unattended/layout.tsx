import type { Metadata } from 'next';

const description =
  'A Grok Bot desk on your machine. You tap 2FA when it asks. Morning brief, inbox, weekly wrap. $399 install or $29 kit.';

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

export default function UnattendedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
