const apps = [
  {
    name: 'Steady',
    tagline: 'GLP-1 tracking that feels calm, clear, and personal.',
    description:
      'Track injections, weight, progress, and routines with a thoughtful companion built for consistency.',
    badge: 'Health',
    icon: '🌺',
  },
  {
    name: 'Skylight',
    tagline: 'Weather, beautifully simplified.',
    description:
      'A clean, focused weather experience designed around the details that matter most.',
    badge: 'Weather',
    icon: '☀️',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative px-6 py-8 sm:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#a7f3d0,transparent_28%),radial-gradient(circle_at_top_right,#bae6fd,transparent_32%),linear-gradient(180deg,#ffffff,#f8fbff)]" />

        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/65 px-5 py-3 shadow-sm backdrop-blur-xl">
          <div className="font-semibold tracking-tight">Ohana Labs</div>
          <a
            href="mailto:support@ohanalabs.app"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Contact
          </a>
        </nav>

        <div className="mx-auto grid max-w-6xl gap-12 pb-20 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-medium text-sky-900 shadow-sm backdrop-blur">
              🌊 Independent app studio from Washington
            </p>
            <h1 className="max-w-4xl text-6xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-8xl">
              Thoughtful apps for everyday life.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-600">
              Ohana Labs builds calm, useful software with the polish of a
              premium product and the warmth of something made by hand.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/80 bg-white/55 p-4 shadow-2xl shadow-sky-950/10 backdrop-blur-2xl">
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="mb-20 flex justify-between text-sm text-white/60">
                <span>Ohana Labs</span>
                <span>2026</span>
              </div>
              <div className="space-y-4">
                <div className="text-7xl">🌺</div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Built with care.
                </h2>
                <p className="text-white/65">
                  Inspired by ohana — software that feels helpful, simple, and
                  never in the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Our apps
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Designed to feel effortless.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {apps.map((app) => (
              <article
                key={app.name}
                className="group rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-950/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-950/10"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-5xl">{app.icon}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {app.badge}
                  </span>
                </div>
                <h3 className="text-3xl font-semibold tracking-tight">
                  {app.name}
                </h3>
                <p className="mt-3 text-xl text-slate-700">{app.tagline}</p>
                <p className="mt-5 leading-7 text-slate-500">
                  {app.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-slate-950 p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Why Ohana
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Small apps, built with intention.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Ohana means family. For us, it means making technology that feels
            supportive, trustworthy, and easy to live with — whether you are
            tracking health progress or checking the day&apos;s weather.
          </p>
        </div>
      </section>

      <footer className="px-6 pb-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ohana Labs LLC. All rights reserved.</p>
          <div className="flex gap-5">
            <a className="hover:text-slate-950" href="mailto:support@ohanalabs.app">
              support@ohanalabs.app
            </a>
            <a className="hover:text-slate-950" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-slate-950" href="/terms">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
