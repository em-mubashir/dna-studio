// Dynamic sitemap placeholder - will be implemented in later tasks
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
  ];
}
