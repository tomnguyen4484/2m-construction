import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services — 2M Construction | Huntsville, AL',
  description: 'Fencing, roofing, decks, painting, flooring, bathroom & kitchen remodels, drywall, concrete, and handyman services in Huntsville, AL.',
  openGraph: {
    title: 'Our Services — 2M Construction | Huntsville, AL',
    description: 'Full-service contractor in Huntsville, AL. Licensed & insured. Free estimates.',
    url: 'https://www.2mhuntsville.com/services',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
