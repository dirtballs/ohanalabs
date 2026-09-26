import type { NextConfig } from 'next';

const config: NextConfig = {
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
