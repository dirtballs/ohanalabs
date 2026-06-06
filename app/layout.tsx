import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ohana Labs',
  description: 'Thoughtful apps for healthier, clearer everyday life.',
  metadataBase: new URL('https://www.ohanalabs.app'),
  alternates: {
    canonical: 'https://www.ohanalabs.app',
  },
  openGraph: {
    title: 'Ohana Labs',
    description: 'Thoughtful apps for healthier, clearer everyday life.',
    url: 'https://www.ohanalabs.app',
    siteName: 'Ohana Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Ohana Labs',
    description: 'Thoughtful apps for healthier, clearer everyday life.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
