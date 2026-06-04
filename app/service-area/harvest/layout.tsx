import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harvest, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Harvest, Alabama. Fencing, decks, roofing, painting, remodeling and more. Free estimates.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/harvest' },
  openGraph: {
    title: 'Harvest, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Harvest, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/harvest',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
