const INSTALL_URL = 'https://buy.stripe.com/6oUdR2effbqycMtgK71B600';
const KIT_URL = 'https://buy.stripe.com/dRm5kw3AB0LU4fX0L91B601';

const gets = [
  'A Grok Bot desk that runs on your machine.',
  'You tap 2FA yourself when asked.',
  'Morning brief, inbox, weekly wrap.',
];

const faq = [
  {
    q: 'What do I get?',
    a: 'A Grok Bot desk on your machine. Morning brief. Inbox. Weekly wrap. $399 is the install. $29 is the kit if you stand it up yourself.',
  },
  {
    q: 'What do I still do?',
    a: 'You tap 2FA when asked. You read the brief. You decide what to send.',
  },
  {
    q: 'Does 2FA leave my phone?',
    a: 'No. Codes stay on your phone. You tap them. The bot waits.',
  },
  {
    q: 'Where does it run?',
    a: 'On your machine. The desk stays local.',
  },
  {
    q: 'What is the $29 kit?',
    a: 'The files and steps. You do the install. No session with us.',
  },
];

export default function UnattendedPage() {
  return (
    <div className="unattended min-h-[100dvh] bg-[#0b0b0b] text-[#efece4] selection:bg-[#f2c14e] selection:text-[#111]">
      <main id="main" className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-5 py-10 sm:px-8 lg:py-14">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#f2c14e]">
          Unattended
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(2.25rem,7vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              A Grok Bot desk on your machine.
            </h1>

            <p className="mt-6 max-w-[36ch] text-lg leading-8 text-[#c8c2b4]">
              You tap 2FA when it asks. Morning brief. Inbox. Weekly wrap.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <a
                href={INSTALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md bg-[#f2c14e] px-6 py-3.5 text-base font-semibold text-[#111] transition hover:bg-[#f6d06a] active:scale-[0.99] sm:w-auto"
              >
                $399 Unattended Install
              </a>
              <a
                href={KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#9c9688] underline decoration-[#9c9688]/50 underline-offset-4 transition hover:text-[#efece4] hover:decoration-[#efece4]"
              >
                $29 kit
              </a>
            </div>

            <ul className="mt-10 max-w-[42ch] space-y-3 border-t border-white/10 pt-8 text-[0.95rem] leading-7 text-[#c8c2b4]">
              {gets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f2c14e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <section aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#9c9688]"
            >
              FAQ
            </h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {faq.map((item) => (
                <div key={item.q} className="py-4">
                  <dt className="text-sm font-semibold text-[#efece4]">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#9c9688]">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
    </div>
  );
}
