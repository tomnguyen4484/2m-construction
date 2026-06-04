import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/estimate/kitchen' },
  title: 'Kitchen Remodel Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Calculate kitchen remodel costs in Huntsville, AL. Cabinets, countertops, backsplash. Free on-site quote from 2M Construction.',
  openGraph: {
    title: 'Kitchen Remodel Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Calculate kitchen remodel costs in Huntsville, AL. Cabinets, countertops, backsplash. Free on-site quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/kitchen',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
