import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAdsHead, unattendedAdsPath } from './unattended/google-ads-head';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const description =
  'A small studio building iPhone apps for health, weather, listening, and kitchen life. Built with aloha.';

export const metadata: Metadata = {
  title: { default: 'Ohana Labs', template: '%s · Ohana Labs' },
  description,
  metadataBase: new URL('https://www.ohanalabs.app'),
  alternates: { canonical: 'https://www.ohanalabs.app' },
  openGraph: {
    title: 'Ohana Labs',
    description,
    url: 'https://www.ohanalabs.app',
    siteName: 'Ohana Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Ohana Labs', description },
};

/* The page is locked dark by design direction, so there is no theme
   script and no toggle. `color-scheme: dark` in globals.css tells the
   browser to render form controls and scrollbars to match. */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const ads = unattendedAdsPath(pathname);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {ads.showTag ? <GoogleAdsHead conversion={ads.showConversion} /> : null}
        {/* Motion server-renders its `initial` state, so every reveal ships
            as opacity:0. With JS disabled or broken that would leave the
            page blank. Force them visible when no script runs. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
