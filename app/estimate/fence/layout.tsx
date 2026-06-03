import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fence Installation Cost Estimator — Huntsville, AL | 2M Construction',
  description: 'Get an instant fence installation estimate for Huntsville, AL. Wood, vinyl, and chain-link options. Free on-site quote from 2M Construction.',
  openGraph: {
    title: 'Fence Installation Cost Estimator — Huntsville, AL | 2M Construction',
    description: 'Get an instant fence installation estimate for Huntsville, AL. Wood, vinyl, and chain-link options. Free on-site quote from 2M Construction.',
    url: 'https://www.2mhuntsville.com/estimate/fence',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
