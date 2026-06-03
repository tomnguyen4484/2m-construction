import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deck & Patio Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Estimate the cost of a new deck or patio in Huntsville, AL. Pressure-treated and composite options. Free quote from 2M Construction.',
  openGraph: {
    title: 'Deck & Patio Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Estimate the cost of a new deck or patio in Huntsville, AL. Pressure-treated and composite options. Free quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/deck',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
