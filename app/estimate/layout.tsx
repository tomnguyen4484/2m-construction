import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Estimates | 2M Construction',
  description: 'Get a free estimate from 2M Construction in Huntsville, AL. Fencing, decks, roofing, painting, flooring, and more.',
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate' },
  openGraph: {
    title: 'Free Estimates | 2M Construction',
    description: 'Get a free contractor estimate in Huntsville, AL.',
    url: 'https://www.2mhuntsville.com/estimate',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
