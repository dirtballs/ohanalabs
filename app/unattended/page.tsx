const INSTALL_URL = 'https://buy.stripe.com/6oUdR2effbqycMtgK71B600';
const KIT_URL = 'https://buy.stripe.com/dRm5kw3AB0LU4fX0L91B601';

const jobs = [
  {
    title: 'In the morning',
    body: 'It reads your calendar and email and tells you what actually needs you today. Not a pile of tabs.',
  },
  {
    title: 'When someone emails you',
    body: "It drafts a reply in your voice. You tap send or you don't. It never sends by itself.",
  },
  {
    title: 'Once a week',
    body: "It writes what got done and what's still open.",
  },
];

const how = [
  'Pay $399.',
  'We email the install steps.',
  'You sign in and tap 2FA when asked.',
  'The desk is scheduled: morning brief, inbox drafts, weekly wrap.',
];

const faq = [
  {
    q: 'What do I get?',
    a: 'A desk on your machine. In the morning it reads calendar and email and tells you what needs you. When mail lands, it drafts a reply in your voice. Once a week it writes what got done and what is still open. $399 is us setting that up. $29 is the kit if you do it.',
  },
  {
    q: 'Does it send mail for me?',
    a: "No. It drafts. You tap send, or you don't. It never sends by itself.",
  },
  {
    q: 'What do I still do?',
    a: 'You tap 2FA. You decide what to send. Anything that spends or posts stays yours.',
  },
  {
    q: 'Do you sit in my 2FA?',
    a: 'No. Codes stay on your phone. You tap them. We do not keep your passwords. We do not send as you.',
  },
  {
    q: 'What is the $29 kit?',
    a: 'The files and steps. You install it yourself. No session with us.',
  },
];

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-white/10 pt-8">
      <h2
        id={`${id}-heading`}
        className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#f2c14e]"
      >
        {label}
      </h2>
      <div className="mt-4 space-y-3 text-[0.95rem] leading-7 text-[#c8c2b4]">{children}</div>
    </section>
  );
}

export default function UnattendedPage() {
  return (
    <div className="unattended min-h-[100dvh] bg-[#0b0b0b] text-[#efece4] selection:bg-[#f2c14e] selection:text-[#111]">
      <main id="main" className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#f2c14e]">
          Unattended
        </p>

        <h1 className="mt-8 text-[clamp(2rem,6.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          It sits on your computer and does the desk work.
        </h1>

        <ol className="mt-8 space-y-5">
          {jobs.map((job) => (
            <li key={job.title}>
              <p className="text-sm font-semibold text-[#efece4]">{job.title}</p>
              <p className="mt-1.5 text-[0.95rem] leading-7 text-[#c8c2b4]">{job.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[0.95rem] leading-7 text-[#c8c2b4]">
          You still tap 2FA. You still hit send. That is the whole $399: we set that desk up on your
          machine so it runs on a schedule.
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

        <div className="mt-14 space-y-10">
          <Section id="who" label="Who">
            <p>
              People who already have Grok Bot or Cursor and want a desk that actually runs. Morning
              brief. Inbox drafts. Weekly wrap. Not another prompt PDF.
            </p>
          </Section>

          <Section id="install" label="$399 install">
            <p>We configure the desk on your machine. You tap logins and 2FA.</p>
            <p>We do not sit in 2FA. We do not keep your passwords. We do not send as you.</p>
            <p>After you pay, you get email with next steps.</p>
          </Section>

          <Section id="how" label="How">
            <ol className="space-y-2">
              {how.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-mono text-sm text-[#f2c14e]">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="still-you" label="Still you">
            <p>2FA taps. Deciding what to send. Anything that spends or posts.</p>
          </Section>

          <Section id="kit" label="$29 kit">
            <p>Files and steps. You install it yourself. No session with us.</p>
            <p>
              <a
                href={KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#9c9688] underline decoration-[#9c9688]/50 underline-offset-4 transition hover:text-[#efece4] hover:decoration-[#efece4]"
              >
                $29 kit
              </a>
            </p>
          </Section>

          <section id="faq" aria-labelledby="faq-heading" className="border-t border-white/10 pt-8">
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
