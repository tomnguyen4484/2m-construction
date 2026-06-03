import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roofing Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Calculate roofing replacement costs in Huntsville, AL. Asphalt shingles and metal roofing. Get a free on-site quote from 2M Construction.',
  openGraph: {
    title: 'Roofing Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Calculate roofing replacement costs in Huntsville, AL. Asphalt shingles and metal roofing. Get a free on-site quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/roofing',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
