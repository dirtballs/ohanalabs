import Image from 'next/image';
import Link from 'next/link';
import { previewApps, releasedApps } from './apps/app-data';
import type { AppData } from './apps/app-data';

const values = [
  'Calm by default',
  'Useful before flashy',
  'Privacy-conscious',
  'Designed for real life',
];

function AppPreview({ app }: { app: AppData }) {
  if (app.previewImageSrc) {
    return (
      <div className="relative mx-auto w-full max-w-[24rem]">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-white/70 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/70 p-3 shadow-2xl shadow-slate-950/[0.10] backdrop-blur">
          <div className="relative overflow-hidden rounded-[1.8rem]">
            <Image
              src={app.previewImageSrc}
              alt={app.previewImageAlt ?? `${app.name} preview`}
              width={945}
              height={2048}
              className="h-auto w-full scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.18))]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-full min-h-[26rem] w-full max-w-[24rem] items-end overflow-hidden rounded-[2.25rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(226,232,240,0.95))] p-6 shadow-2xl shadow-slate-950/[0.10]">
      <div className="absolute inset-x-8 top-8 flex items-center gap-4">
        <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-lg ring-1 ring-white/80">
          <Image src={app.iconSrc} alt={app.iconAlt} width={80} height={80} className="block size-20 object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{app.statusLabel}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{app.name}</p>
        </div>
      </div>
      <div className="absolute left-8 right-8 top-36 space-y-3">
        {app.highlights.slice(0, 3).map((highlight) => (
          <div key={highlight} className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur">
            {highlight}
          </div>
        ))}
      </div>
      <div className="relative w-full rounded-[1.9rem] border border-white/80 bg-white/82 p-5 shadow-lg backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Now testing</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          {app.name} is in active TestFlight and still getting polished.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <section className="relative isolate px-6 pb-28 pt-6 sm:px-10 lg:pb-36">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_55%,#eef9ff_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[34rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#a7f3d0_0%,#bae6fd_38%,transparent_70%)] opacity-60 blur-3xl" />
        <div className="absolute right-[-12rem] top-40 -z-10 h-96 w-96 rounded-full bg-rose-100 opacity-70 blur-3xl" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/80 bg-white/70 px-5 py-3 shadow-sm shadow-slate-950/5 backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-full bg-slate-950 text-sm text-white">🌺</span>
            <span>Ohana Labs</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 sm:flex">
            <a className="transition hover:text-slate-950" href="#apps">Apps</a>
            <a className="transition hover:text-slate-950" href="#ohana">Why Ohana</a>
            <a className="transition hover:text-slate-950" href="mailto:support@ohanalabs.app">Contact</a>
          </div>
          <a
            href="#apps"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            View apps
          </a>
        </nav>

        <div id="top" className="mx-auto grid max-w-7xl gap-14 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-32">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-semibold text-sky-950 shadow-sm backdrop-blur">
              <span>🌊</span>
              <span>Thoughtful software, inspired by ohana</span>
            </p>
            <h1 className="max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-8xl lg:text-9xl">
              Built with aloha.
            </h1>
            <p className="mt-7 text-3xl font-semibold tracking-[-0.035em] text-slate-800 sm:text-5xl">
              Health, weather, listening, and kitchen apps with a human touch.
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Inspired by the spirit of Ohana, we build software that helps everyday routines feel clearer, calmer, and easier to keep up with.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#apps"
                className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Explore the apps
              </a>
              <a
                href="mailto:support@ohanalabs.app"
                className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky-200 via-emerald-100 to-rose-100 opacity-70 blur-2xl" />
            <div className="relative rounded-[2.75rem] border border-white/80 bg-white/65 p-4 shadow-2xl shadow-sky-950/10 backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[2.25rem] bg-slate-950 text-white">
                <div className="bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.35),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(244,114,182,0.28),transparent_24%),linear-gradient(145deg,#020617,#0f172a_55%,#082f49)] p-7">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                    <span>Ohana Labs</span>
                    <span>Four active apps</span>
                  </div>
                  <div className="mt-24 space-y-4">
                    <div className="text-7xl">🌺</div>
                    <h2 className="text-4xl font-semibold tracking-[-0.04em]">Made to support, not distract.</h2>
                    <p className="max-w-sm leading-7 text-white/65">
                      Personal software for health, weather, books, and home routines, built with warmth, clarity, and a little island air.
                    </p>
                  </div>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {values.map((value) => (
                    <div key={value} className="bg-white/[0.04] p-5 text-sm font-medium text-white/75">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">Our apps</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Four focused products, each built with real life in mind.
            </h2>
          </div>

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Available now</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Ready on the App Store
              </h3>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {releasedApps.map((app) => (
              <article
                key={app.name}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white bg-gradient-to-br ${app.gradient} p-8 shadow-2xl shadow-slate-950/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-sky-950/10 sm:p-10`}
              >
                <div className="absolute right-[-6rem] top-[-6rem] size-72 rounded-full bg-white/60 blur-3xl transition group-hover:scale-110" />
                <div className="relative">
                  <div className="mb-20 flex items-center justify-between">
                    <div className="overflow-hidden rounded-3xl bg-white/80 shadow-sm ring-1 ring-white/70 backdrop-blur">
                      <Image
                        src={app.iconSrc}
                        alt={app.iconAlt}
                        width={64}
                        height={64}
                        className="block size-16 object-cover"
                      />
                    </div>
                    <span className="rounded-full border border-white/80 bg-white/65 px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur">
                      {app.category}
                    </span>
                  </div>
                  <h3 className="text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">{app.name}</h3>
                  <p className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-slate-800">{app.headline}</p>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{app.shortDescription}</p>
                  <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <span className={`h-2.5 w-2.5 rounded-full ${app.accent}`} />
                    <span>{app.availability}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-600">{app.priceLabel}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {app.primaryLink ? (
                      <a
                        href={app.primaryLink.href}
                        className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                      >
                        {app.primaryLink.label}
                      </a>
                    ) : null}
                    <Link
                      href={`/apps/${app.slug}`}
                      className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      View app details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mb-6 mt-16 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">In progress</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Currently in TestFlight
              </h3>
            </div>
          </div>

          <div className="grid gap-6">
            {previewApps.map((app) => (
              <article
                key={app.name}
                className={`relative overflow-hidden rounded-[2.75rem] border border-white bg-gradient-to-br ${app.gradient} p-8 shadow-2xl shadow-slate-950/[0.06] sm:p-10`}
              >
                <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/50 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">{app.statusLabel}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="overflow-hidden rounded-3xl bg-white/80 shadow-sm ring-1 ring-white/70 backdrop-blur">
                        <Image
                          src={app.iconSrc}
                          alt={app.iconAlt}
                          width={64}
                          height={64}
                          className="block size-16 object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                          {app.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-600">{app.category}</p>
                      </div>
                    </div>
                    <p className="mt-6 max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
                      {app.headline}
                    </p>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{app.shortDescription}</p>
                    <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur">
                      <span className={`h-2.5 w-2.5 rounded-full ${app.accent}`} />
                      <span>{app.availability}</span>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/apps/${app.slug}`}
                        className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                      >
                        View preview details
                      </Link>
                      {app.primaryLink ? (
                        <a
                          href={app.primaryLink.href}
                          className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                        >
                          {app.primaryLink.label}
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <AppPreview app={app} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ohana" className="px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-300">Why Ohana</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Family is the standard.</h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Ohana Labs is built around a simple idea: the best software should feel dependable, thoughtful, and close at hand, like something made by people who care.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-950/[0.04] sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ['🌿', 'Gentle by design', 'Interfaces should reduce stress, not add to it.'],
                ['🔒', 'Respectful with data', 'Health and everyday details deserve careful handling.'],
                ['✨', 'Polished where it matters', 'Small interactions can make routines feel easier.'],
                ['🤝', 'Built for people', 'The goal is software that helps without getting in the way.'],
              ].map(([icon, title, copy]) => (
                <div key={title} className="rounded-3xl bg-slate-50 p-6">
                  <div className="text-3xl">{icon}</div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.75rem] border border-white bg-[linear-gradient(135deg,#e0f2fe,#ffffff_45%,#dcfce7)] p-8 text-center shadow-2xl shadow-sky-950/[0.07] sm:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-800">Say aloha</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Building something useful, one app at a time.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            For support, TestFlight questions, or partnership ideas, reach out anytime.
          </p>
          <a
            href="mailto:support@ohanalabs.app"
            className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            support@ohanalabs.app
          </a>
        </div>
      </section>

      <footer className="px-6 pb-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ohana Labs LLC. Built with aloha.</p>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-slate-950" href="mailto:support@ohanalabs.app">Contact</a>
            <a className="transition hover:text-slate-950" href="/privacy">Privacy</a>
            <a className="transition hover:text-slate-950" href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
