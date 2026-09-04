import type { MetadataRoute } from 'next';
import { appList } from './apps/app-data';

const BASE = 'https://www.ohanalabs.app';

/* Stamped at build time. The previous version hardcoded 2026-07-18 on
   every entry, so the dates went stale the moment anything shipped. */
const built = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: built, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/unattended`, lastModified: built, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/unattended/thanks`, lastModified: built, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/help`, lastModified: built, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: built, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/terms`, lastModified: built, changeFrequency: 'yearly', priority: 0.4 },
    ...appList.flatMap((app) => [
      {
        url: `${BASE}/apps/${app.slug}`,
        lastModified: built,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE}/apps/${app.slug}/support`,
        lastModified: built,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${BASE}/apps/${app.slug}/privacy`,
        lastModified: built,
        changeFrequency: 'yearly' as const,
        priority: 0.4,
      },
    ]),
  ];
}
