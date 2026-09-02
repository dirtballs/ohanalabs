import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Unattended. A Grok Bot desk on your machine.';

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
          backgroundColor: '#0b0b0b',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#f2c14e',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Unattended
        </div>

        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            color: '#efece4',
            letterSpacing: '-0.04em',
            display: 'flex',
            maxWidth: 920,
          }}
        >
          A Grok Bot desk on your machine.
        </div>

        <div style={{ fontSize: 28, color: '#9c9688', display: 'flex' }}>
          You tap 2FA. Morning brief. Inbox. Weekly wrap. $399 or $29.
        </div>
      </div>
    ),
    size,
  );
}
