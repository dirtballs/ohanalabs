import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | Ohana Labs',
  description: 'Terms of use for the Ohana Labs website and apps.',
  alternates: {
    canonical: 'https://www.ohanalabs.app/terms',
  },
};

const sections = [
  {
    title: 'Use of the site',
    body:
      'You may use the Ohana Labs website for lawful purposes only. You agree not to misuse the site, interfere with its operation, or attempt unauthorized access to any part of the service.',
  },
  {
    title: 'Product information',
    body:
      'We aim to keep information about our apps accurate and current, but features, availability, and timelines may change as products evolve.',
  },
  {
    title: 'No medical advice',
    body:
      'Any health-related app information presented on this site is for general informational purposes only and does not replace professional medical advice, diagnosis, or treatment.',
  },
  {
    title: 'Intellectual property',
    body:
      'The content, branding, design, and software on this site are owned by Ohana Labs LLC unless otherwise noted. You may not copy or reuse them beyond normal personal browsing without permission.',
  },
  {
    title: 'Contact',
    body:
      'Questions about these terms can be sent to support@ohanalabs.app.',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 py-16 text-slate-950 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
        >
          Back to home
        </Link>
        <div className="mt-8 rounded-[2.5rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-slate-950/[0.05] backdrop-blur sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Terms</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Terms of Use</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            These terms govern use of the Ohana Labs website and related apps.
          </p>
          <p className="mt-4 text-sm text-slate-500">Effective date: June 5, 2026</p>

          <div className="mt-12 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
