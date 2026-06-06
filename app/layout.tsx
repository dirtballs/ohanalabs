import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ohana Labs',
  description: 'Thoughtful apps for healthier, clearer everyday life.',
  metadataBase: new URL('https://ohanalabs.app'),
  openGraph: {
    title: 'Ohana Labs',
    description: 'Thoughtful apps for healthier, clearer everyday life.',
    url: 'https://ohanalabs.app',
    siteName: 'Ohana Labs',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
