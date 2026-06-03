import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concrete & Flatwork Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Get a concrete cost estimate in Huntsville, AL. Driveways, patios, walkways with rebar. Free on-site quote from 2M Construction.',
  openGraph: {
    title: 'Concrete & Flatwork Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Get a concrete cost estimate in Huntsville, AL. Driveways, patios, walkways with rebar. Free on-site quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/concrete',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
