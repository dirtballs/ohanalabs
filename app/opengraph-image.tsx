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
            'radial-gradient(circle at 18% 20%, rgba(35,191,165,0.30), transparent 55%), radial-gradient(circle at 88% 85%, rgba(18,160,138,0.22), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <svg width="56" height="39" viewBox="0 0 32 22" fill="none">
            <path d="M9.5 19.5V9.2" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 9.2C7 8.4 5.2 6.2 4.3 3.8" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 9.2C12 8.4 13.8 6.2 14.7 3.8" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 9.2C6.6 10 4.5 10.4 3 10" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 9.2C12.4 10 14.5 10.4 16 10" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 9.2C8.2 7 7.5 5.2 7.2 3.4" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
            <path d="M9.5 9.2C10.8 7 11.5 5.2 11.8 3.4" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
            <path d="M22.5 19.5V9.2" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
            <path d="M22.5 9.2C20 8.4 18.2 6.2 17.3 3.8" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
            <path d="M22.5 9.2C25 8.4 26.8 6.2 27.7 3.8" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
            <path d="M22.5 9.2C19.6 10 17.5 10.4 16 10" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
            <path d="M22.5 9.2C25.4 10 27.5 10.4 29 10" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
            <path d="M22.5 9.2C21.2 7 20.5 5.2 20.2 3.4" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" />
            <path d="M22.5 9.2C23.8 7 24.5 5.2 24.8 3.4" stroke="#4fd6be" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" />
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
              color: '#4fd6be',
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
