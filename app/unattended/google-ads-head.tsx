const configInline = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18425955930');
`;

const conversionInline = `
  gtag('event', 'conversion', {
    'send_to': 'AW-18425955930/71m9CKHY0-4cENqMl9JE',
    'value': 399.0,
    'currency': 'USD'
  });
`;

/* Rendered inside the root <head> for /unattended and /unattended/thanks.
   Nested layouts cannot hoist inline scripts into the document head. */
export function GoogleAdsHead({ conversion }: { conversion: boolean }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18425955930" />
      <script dangerouslySetInnerHTML={{ __html: configInline }} />
      {conversion ? <script dangerouslySetInnerHTML={{ __html: conversionInline }} /> : null}
    </>
  );
}

export function unattendedAdsPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return {
    showTag: path === '/unattended' || path === '/unattended/thanks',
    showConversion: path === '/unattended/thanks',
  };
}
