import type { NextConfig } from 'next';

const config: NextConfig = {
  /* Self-hosted on the NAS behind a Cloudflare Tunnel since 2026-11-10.
     'standalone' emits .next/standalone with a minimal server.js and only the
     node_modules it actually needs, which is what the Docker image runs. */
  output: 'standalone',
  /* Vercel did the apex -> www 308 at the platform level. Self-hosted there is
     no platform, and the AASA note below depends on www being canonical, so the
     redirect has to live here. */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ohanalabs.app' }],
        destination: 'https://www.ohanalabs.app/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        /* Apple fetches this to validate universal links, and rejects it unless
           it is served as JSON over https with no redirect. The file has no
           extension, so nothing infers the type for us — this header is the
           whole reason the challenge site lives here rather than on a static
           host that cannot set one.

           The associated domain is www.ohanalabs.app rather than the apex,
           because the apex answers 308 to www and Apple does not follow
           redirects when fetching this file. */
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ];
  },
};

export default config;
