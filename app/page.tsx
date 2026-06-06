export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-12 flex items-center gap-3">
          <div className="text-3xl">🌺</div>
          <div className="text-xl font-semibold">Ohana Labs</div>
        </div>

        <p className="mb-6 text-2xl font-semibold tracking-tight text-slate-700 sm:text-4xl">
          Built with aloha.
        </p>

        <h1 className="max-w-4xl text-6xl font-bold tracking-tight sm:text-8xl">
          Apps that feel like family.
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-slate-600">
          Thoughtful software inspired by the spirit of Ohana. We build simple,
          beautiful apps for calmer, more connected everyday lives.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border p-8">
            <div className="text-4xl mb-4">🌺</div>
            <h2 className="text-3xl font-semibold">Steady</h2>
            <p className="mt-4 text-slate-600">
              A clear, calm way to track progress and stay consistent.
            </p>
          </div>

          <div className="rounded-3xl border p-8">
            <div className="text-4xl mb-4">☀️</div>
            <h2 className="text-3xl font-semibold">Skylight</h2>
            <p className="mt-4 text-slate-600">
              Weather presented with clarity, beauty, and just the details that matter.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
