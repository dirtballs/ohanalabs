import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ohana Labs',
  description: 'Privacy policy for Ohana Labs LLC and its apps.',
  alternates: {
    canonical: 'https://www.ohanalabs.app/privacy',
  },
};

const sections = [
  {
    title: 'Information we collect',
    body:
      'We collect the information you choose to share with us, such as messages sent to support@ohanalabs.app and any details needed to respond to your request.',
  },
  {
    title: 'How we use information',
    body:
      'We use information to operate our website, provide customer support, improve our apps, and communicate about products or support requests you initiate.',
  },
  {
    title: 'How we protect information',
    body:
      'We take reasonable steps to protect the information we receive and aim to keep data collection limited to what is necessary for the service provided.',
  },
  {
    title: 'Third-party services',
    body:
      'Our website and apps may rely on trusted third-party providers for hosting, analytics, payments, support, or app distribution. Those providers process data under their own terms and privacy policies.',
  },
  {
    title: 'Your choices',
    body:
      'You can contact us at support@ohanalabs.app to ask privacy questions, request updates to information you shared with us, or ask for deletion when applicable.',
  },
];

export default function PrivacyPage() {
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
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This policy explains how Ohana Labs LLC handles information connected to this website and our apps.
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

          <section className="mt-12 rounded-[2rem] bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Contact</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              For privacy questions or requests, contact{' '}
              <a className="font-semibold text-slate-900" href="mailto:support@ohanalabs.app">
                support@ohanalabs.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
