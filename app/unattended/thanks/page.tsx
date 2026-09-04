import Link from 'next/link';

export default function UnattendedThanksPage() {
  return (
    <div className="unattended min-h-[100dvh] bg-[#0b0b0b] text-[#efece4] selection:bg-[#f2c14e] selection:text-[#111]">
      <main id="main" className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col justify-center px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#f2c14e]">
          Unattended
        </p>
        <h1 className="mt-8 text-[clamp(2rem,6.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Payment received.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#c8c2b4]">
          Check your email for install steps.
        </p>
        <p className="mt-10">
          <Link
            href="/unattended"
            className="text-sm text-[#9c9688] underline decoration-[#9c9688]/50 underline-offset-4 transition hover:text-[#efece4] hover:decoration-[#efece4]"
          >
            Back to Unattended
          </Link>
        </p>
      </main>
    </div>
  );
}
