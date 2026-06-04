import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate/drywall' },
  title: 'Drywall Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Estimate drywall installation and repair costs in Huntsville, AL. Any room size. Free quote from 2M Construction.',
  openGraph: {
    title: 'Drywall Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Estimate drywall installation and repair costs in Huntsville, AL. Any room size. Free quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/drywall',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
