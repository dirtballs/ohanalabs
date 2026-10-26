import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '../site-chrome';
import { BackLink, ContactCard, InnerPage, MailLink, PageHeader } from '../page-shell';
import { comingSoonApps, previewApps, releasedApps } from '../apps/app-data';
import type { AppData } from '../apps/app-data';

export const metadata: Metadata = {
  title: 'About & contact',
  description: 'Who Ohana Labs is, the apps we make, and how to reach us.',
  alternates: { canonical: 'https://www.ohanalabs.app/about' },
};

function AppRow({ app }: { app: AppData }) {
  return (
    <li className="border-b border-white/5 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Link href={`/apps/${app.slug}`} className="text-lg font-semibold tracking-heading text-sand-100 hover:text-tide-400">
          {app.name}
          {app.latestVersion ? <span className="tabular text-sand-500"> {app.latestVersion}</span> : null}
        </Link>
        {app.appStoreUrl ? (
          <a href={app.appStoreUrl} className="text-sm font-semibold text-tide-400 hover:text-tide-200">
            App Store
          </a>
        ) : (
          <span className="text-sm text-sand-500">{app.statusLabel}</span>
        )}
      </div>
      <p className="mt-2 max-w-[60ch] leading-7 text-sand-500">{app.headline}</p>
    </li>
  );
}

export default function AboutPage() {
  const others = [...previewApps, ...comingSoonApps];
  return (
    <>
      <SiteNav />
      <InnerPage>
        <BackLink href="/">Home</BackLink>
        <PageHeader
          eyebrow="About & contact"
          title="About Ohana Labs"
          lede="Ohana Labs LLC is a small studio building iPhone apps for health, weather, listening, and kitchen life. Built with aloha."
        />

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-heading text-sand-100">On the App Store</h2>
          <ul className="mt-2">
            {releasedApps.map((app) => (
              <AppRow key={app.slug} app={app} />
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-heading text-sand-100">In TestFlight and coming soon</h2>
          <ul className="mt-2">
            {others.map((app) => (
              <AppRow key={app.slug} app={app} />
            ))}
          </ul>
        </section>

        <ContactCard>
          Support, a TestFlight ask, or a custom iOS / macOS build all go to one inbox: <MailLink />. Say
          which in the subject.
        </ContactCard>
      </InnerPage>
    </>
  );
}
