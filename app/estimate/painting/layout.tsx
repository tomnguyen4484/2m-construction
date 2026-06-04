import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate/painting' },
  title: 'Painting Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Estimate interior and exterior painting costs in Huntsville, AL. Licensed painters, quality materials. Free quote from 2M Construction.',
  openGraph: {
    title: 'Painting Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Estimate interior and exterior painting costs in Huntsville, AL. Licensed painters, quality materials. Free quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/painting',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
