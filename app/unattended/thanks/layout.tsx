import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Payment received · Unattended' },
  description: 'Payment received. Check your email for install steps.',
  alternates: { canonical: '/unattended/thanks' },
  openGraph: {
    title: 'Payment received · Unattended',
    description: 'Payment received. Check your email for install steps.',
    url: '/unattended/thanks',
    siteName: 'Unattended',
  },
};

/* No conversion event here. Ads has no Purchase send_to yet.
   Loader + config come from the parent /unattended layout. */
export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
