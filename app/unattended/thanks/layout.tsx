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

/* Conversion is injected in the root document <head> for this path
   only. Do not put a conversion event on /unattended. */
export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
