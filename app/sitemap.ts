import { MetadataRoute } from 'next';

const BASE = 'https://www.2mhuntsville.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/estimate`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/portfolio`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/reviews`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const estimatorPages = [
    'fence','deck','roofing','painting','bathroom',
    'flooring','kitchen','drywall','concrete','handyman',
  ].map(slug => ({
    url: `${BASE}/estimate/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  const serviceAreaPages = [
    'huntsville','madison','athens','decatur','harvest','hampton-cove',
  ].map(slug => ({
    url: `${BASE}/service-area/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...estimatorPages, ...serviceAreaPages].map(p => ({
    ...p,
    lastModified: now,
  }));
}
