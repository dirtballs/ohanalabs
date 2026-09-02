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

const gtagInline = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18425955930');
  gtag('event', 'conversion', {
      'send_to': 'AW-18425955930/N0ftCKSj9-wcENqM19JE',
      'value': 1.0,
      'currency': 'USD'
  });
`;

/* Google Ads snippet, this route only. The loader hoists into <head>.
   Do not move these tags into the root layout. */
export default function UnattendedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18425955930" />
      <script dangerouslySetInnerHTML={{ __html: gtagInline }} />
      {children}
    </>
  );
}
