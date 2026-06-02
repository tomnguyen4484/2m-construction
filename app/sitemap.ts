import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://2mhuntsville.com';
  const services = ['fence','deck','painting','flooring','bathroom','kitchen','drywall','roofing','concrete','handyman'];
  const areas = ['huntsville','madison','athens','decatur','harvest','hampton-cove'];

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/estimate`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...services.map(s => ({ url: `${base}/estimate/${s}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...areas.map(a => ({ url: `${base}/service-area/${a}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
