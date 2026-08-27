import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/ssr';
import { WaveMark } from './wave-mark';

/* Shared chrome for every page that is not the homepage.
   Before this, each of the five inner pages carried its own copy of the
   shell markup with its own radii, shadows and colours. One shell means
   the next token change reaches all of them. */

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-sand-500 transition hover:text-sand-100"
    >
      <ArrowLeft size={15} weight="bold" className="transition group-hover:-translate-x-0.5" />
      {children}
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/5 pb-14 pt-12">
      <div className="caustics opacity-60" aria-hidden="true" />
      <div className="relative">
        <p className="text-[0.625rem] font-semibold uppercase tracking-label text-tide-400">{eyebrow}</p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-display">
          {title}
        </h1>
        {lede ? (
          <p className="mt-7 max-w-[56ch] text-lg leading-8 text-sand-300">{lede}</p>
        ) : null}
        {meta ? <p className="mt-5 text-sm text-sand-600">{meta}</p> : null}
      </div>
    </header>
  );
}

/** Long-form legal and support copy. Sections are separated by space and
 *  a single hairline above the group, not a border on every row. */
export function ProseSections({ sections }: { sections: Array<{ title: string; body: string }> }) {
  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-x-16">
      {sections.map((section) => (
        <section key={section.title} className="contents">
          <h2 className="text-xl font-semibold tracking-heading text-sand-100 lg:text-right lg:text-base lg:text-sand-500">
            {section.title}
          </h2>
          <p className="mt-3 max-w-[68ch] text-base leading-8 text-sand-300 lg:mt-0">{section.body}</p>
        </section>
      ))}
    </div>
  );
}

export function ContactCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-20 rounded-container border border-abyss-700 bg-abyss-900 p-8 sm:p-10">
      <h2 className="text-xl font-semibold tracking-heading text-sand-100">Contact</h2>
      <p className="mt-3 max-w-[60ch] leading-8 text-sand-500">{children}</p>
    </section>
  );
}

export function MailLink({ children }: { children?: React.ReactNode }) {
  return (
    <a
      className="font-semibold text-tide-400 underline decoration-tide-400/30 underline-offset-4 transition hover:decoration-tide-400"
      href="mailto:support@ohanalabs.app"
    >
      {children ?? 'support@ohanalabs.app'}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 text-sm text-sand-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex items-center gap-2.5">
          <WaveMark className="w-5 text-abyss-600" />
          <span>
            <span className="tabular">{new Date().getFullYear()}</span> Ohana Labs LLC. Built with aloha.
          </span>
        </p>
        <div className="flex flex-wrap gap-6">
          <a className="transition hover:text-sand-100" href="mailto:support@ohanalabs.app">
            Contact
          </a>
          <Link className="transition hover:text-sand-100" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-sand-100" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Standard inner-page wrapper: nav offset, centred measure, footer. */
export function InnerPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="main" className="mx-auto max-w-5xl px-5 pb-24 pt-24 sm:px-8">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
