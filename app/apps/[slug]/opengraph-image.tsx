import { ImageResponse } from 'next/og';
import { appList, getAppBySlug } from '../app-data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return appList.map((app) => ({ slug: app.slug }));
}

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const app = getAppBySlug(params.slug);
  return [{ id: 'og', size, contentType, alt: app ? `${app.name}. ${app.headline}` : 'Ohana Labs' }];
}

/* Per-app share cards. Without these, a link to any app page rendered as
   a bare URL. Text only on purpose: Satori cannot read local image files
   without inlining them, and the headline is the thing worth showing. */
export default async function AppOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const name = app?.name ?? 'Ohana Labs';
  const headline = app?.headline ?? 'Built with aloha.';
  const status = app?.statusLabel ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#070d0c',
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(47,126,216,0.28), transparent 58%), radial-gradient(circle at 10% 90%, rgba(19,56,139,0.20), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <svg width="44" height="30" viewBox="0 0 32 22" fill="none">
            <path
              d="M2 15.5c3.1 0 3.1-4.4 6.2-4.4s3.1 4.4 6.2 4.4 3.1-4.4 6.2-4.4 3.1 4.4 6.2 4.4"
              stroke="#2F7ED8"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontSize: 26, color: '#878175' }}>Ohana Labs</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 112,
              lineHeight: 1.05,
              fontWeight: 700,
              color: '#f2ede2',
              letterSpacing: '-0.04em',
              display: 'flex',
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 38,
              lineHeight: 1.35,
              color: '#cfc7b6',
              maxWidth: 900,
              display: 'flex',
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ fontSize: 26, color: '#2F7ED8', display: 'flex' }}>{status}</div>
      </div>
    ),
    size,
  );
}
