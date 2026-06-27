import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Albertville, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Albertville, AL. Fencing, decks, roofing, painting, remodeling and more. Free estimates. Call (938) 302-6795.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/albertville' },
  openGraph: {
    title: 'Albertville, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Albertville, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/albertville',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
