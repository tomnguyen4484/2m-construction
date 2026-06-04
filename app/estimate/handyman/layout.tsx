import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate/handyman' },
  title: 'Handyman Service Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Estimate handyman repair costs in Huntsville, AL. Small fixes, installations, general repairs. Free quote from 2M Construction.',
  openGraph: {
    title: 'Handyman Service Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Estimate handyman repair costs in Huntsville, AL. Small fixes, installations, general repairs. Free quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/handyman',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
