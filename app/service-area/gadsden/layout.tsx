import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gadsden, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Gadsden, AL. Fencing, decks, roofing, painting, remodeling and more. Free estimates. Call (938) 302-6795.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/gadsden' },
  openGraph: {
    title: 'Gadsden, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Gadsden, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/gadsden',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
