import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scottsboro, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Scottsboro, AL. Fencing, decks, roofing, painting, remodeling and more. Free estimates. Call (938) 302-6795.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/scottsboro' },
  openGraph: {
    title: 'Scottsboro, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Scottsboro, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/scottsboro',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
