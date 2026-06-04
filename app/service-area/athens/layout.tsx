import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Athens, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Athens, Alabama. Fencing, decks, roofing, painting, remodeling and more. Free estimates.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/athens' },
  openGraph: {
    title: 'Athens, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Athens, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/athens',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
