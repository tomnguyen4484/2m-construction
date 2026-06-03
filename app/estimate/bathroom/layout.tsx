import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bathroom Remodel Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Get a bathroom remodel estimate for Huntsville, AL. Tile, vanity, fixtures and more. Free on-site quote from 2M Construction.',
  openGraph: {
    title: 'Bathroom Remodel Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Get a bathroom remodel estimate for Huntsville, AL. Tile, vanity, fixtures and more. Free on-site quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/bathroom',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
