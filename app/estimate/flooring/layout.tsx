import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate/flooring' },
  title: 'Flooring Installation Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Estimate flooring installation costs in Huntsville, AL. LVP, laminate, and hardwood options. Free quote from 2M Construction.',
  openGraph: {
    title: 'Flooring Installation Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Estimate flooring installation costs in Huntsville, AL. LVP, laminate, and hardwood options. Free quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/flooring',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
