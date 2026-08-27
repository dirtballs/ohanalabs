import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { appList } from '../apps/app-data';
import { SiteNav } from '../site-chrome';
import { BackLink, ContactCard, InnerPage, MailLink, PageHeader } from '../page-shell';

export const metadata: Metadata = {
  title: 'Help and support',
  description: 'Support for every Ohana Labs app, and how to reach us.',
  alternates: { canonical: 'https://www.ohanalabs.app/help' },
};

/* This route exists because shipped apps link to it. Ohana Kitchen's
   settings screen points at ohanalabs.app/help, which returned a 404
   for every user who tapped it. A hub is more useful than a redirect:
   people arriving from one app often want a different one. */
export default function HelpPage() {
  return (
    <>
      <SiteNav />

      <InnerPage>
        <BackLink href="/">Home</BackLink>

        <PageHeader
          eyebrow="Support"
          title="Help and support"
          lede="Pick the app you need a hand with, or email us directly. Every message goes to the same inbox either way."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-container bg-white/5 sm:grid-cols-2">
          {appList.map((app) => (
            <li key={app.slug} className="bg-abyss-900">
              <Link
                href={`/apps/${app.slug}/support`}
                className="group flex h-full items-center gap-5 p-7 transition hover:bg-abyss-800"
              >
                <Image
                  src={app.iconSrc}
                  alt={app.iconAlt}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-inner ring-1 ring-white/10"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-sand-100">{app.name}</span>
                  <span className="mt-1 block text-sm text-sand-600">{app.statusLabel}</span>
                </span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="shrink-0 text-tide-400 transition group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-heading text-sand-100 sm:text-3xl">
            Other pages
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-abyss-600 px-5 py-3 text-sm font-semibold text-sand-300 transition hover:border-tide-600 hover:text-sand-100 active:scale-[0.98]"
            >
              Terms of Use
            </Link>
          </div>
        </section>

        <ContactCard>
          Include the app name, your device model, and your iOS version so we can get to the
          problem faster. Write to <MailLink />.
        </ContactCard>
      </InnerPage>
    </>
  );
}
