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

const conversionInline = `
  gtag('event', 'conversion', {
    'send_to': 'AW-18425955930/71m9CKHY0-4cENqMl9JE',
    'value': 399.0,
    'currency': 'USD'
  });
`;

/* Purchase conversion on this route only. Loader + config come from
   the parent /unattended layout. Do not fire this on landing. */
export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: conversionInline }} />
      {children}
    </>
  );
}
