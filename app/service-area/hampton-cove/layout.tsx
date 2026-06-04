import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hampton Cove, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Hampton Cove, Alabama. Fencing, decks, roofing, painting, remodeling and more. Free estimates.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/hampton-cove' },
  openGraph: {
    title: 'Hampton Cove, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Hampton Cove, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/hampton-cove',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
