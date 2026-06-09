import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | 2M Construction',
  description: 'View completed flooring, tile, and remodeling projects by 2M Construction in Huntsville, AL. Real photos from real jobs.',
  alternates: { canonical: 'https://www.2mhuntsville.com/portfolio' },
  openGraph: {
    title: 'Portfolio | 2M Construction Huntsville AL',
    description: 'Completed flooring and remodeling projects in Huntsville, AL.',
    url: 'https://www.2mhuntsville.com/portfolio',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
