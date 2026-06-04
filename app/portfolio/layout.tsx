import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/portfolio' },
  title: 'Portfolio | 2M Construction',
  description: 'View completed construction projects by 2M Construction in Huntsville, AL. Fencing, decks, roofing, remodels and more.',
  openGraph: {
    title: 'Portfolio — 2M Construction | Huntsville, AL',
    description: 'View completed construction projects by 2M Construction in Huntsville, AL. Fencing, decks, roofing, remodels and more.',
    url: 'https://www.2mhuntsville.com/portfolio',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
