import type { MetadataRoute } from 'next';

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
  ];
}
