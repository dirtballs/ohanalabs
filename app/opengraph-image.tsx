import { ImageResponse } from 'next/og';
import { appList } from './apps/app-data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Ohana Labs. Built with aloha.';

/* The site shipped with no og:image at all, so every share on Messages,
   Slack, or X rendered as a bare link. Generated at build time rather
   than checked in as a PNG, so the app count stays correct. */
export default function OpengraphImage() {
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
            'radial-gradient(circle at 18% 20%, rgba(47,126,216,0.30), transparent 55%), radial-gradient(circle at 88% 85%, rgba(19,56,139,0.22), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <svg width="48" height="48" viewBox="0 0 256 256" fill="#2F7ED8">
            <path d="M239.84,60.33a8,8,0,0,1-4.65,5.75L179,90.55a71.42,71.42,0,0,1,43.36,33.21,70.64,70.64,0,0,1,7.2,54.32A8,8,0,0,1,217,182.36l-81-61.68V224a8,8,0,0,1-16,0V120.68L39,182.36a8,8,0,0,1-12.57-4.28,70.64,70.64,0,0,1,7.2-54.32A71.42,71.42,0,0,1,77,90.55L20.81,66.08a8,8,0,0,1-2.6-12.85,66.86,66.86,0,0,1,97.74,0,72.21,72.21,0,0,1,12,17,72.21,72.21,0,0,1,12.05-17,66.86,66.86,0,0,1,97.74,0A8,8,0,0,1,239.84,60.33Z" />
          </svg>
          <div style={{ fontSize: 34, color: '#f2ede2', fontWeight: 600 }}>Ohana Labs</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1,
              fontWeight: 700,
              color: '#f2ede2',
              letterSpacing: '-0.04em',
              display: 'flex',
            }}
          >
            Built with
          </div>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1.05,
              fontWeight: 700,
              color: '#2F7ED8',
              letterSpacing: '-0.04em',
              display: 'flex',
            }}
          >
            aloha.
          </div>
        </div>

        <div style={{ fontSize: 30, color: '#9a9384', display: 'flex' }}>
          {appList.length} iPhone apps for health, weather, listening, and the kitchen.
        </div>
      </div>
    ),
    size,
  );
}
