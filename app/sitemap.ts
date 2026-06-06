import type { MetadataRoute } from 'next';
import { appList } from './apps/app-data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.ohanalabs.app',
      lastModified: '2026-06-05',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.ohanalabs.app/privacy',
      lastModified: '2026-06-05',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://www.ohanalabs.app/terms',
      lastModified: '2026-06-05',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    ...appList.flatMap((app) => [
      {
        url: `https://www.ohanalabs.app/apps/${app.slug}`,
        lastModified: '2026-06-05',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `https://www.ohanalabs.app/apps/${app.slug}/support`,
        lastModified: '2026-06-05',
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `https://www.ohanalabs.app/apps/${app.slug}/privacy`,
        lastModified: '2026-06-05',
        changeFrequency: 'yearly' as const,
        priority: 0.4,
      },
    ]),
  ];
}
