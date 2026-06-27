import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guntersville, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Guntersville, AL. Fencing, decks, roofing, painting, remodeling and more. Free estimates. Call (938) 302-6795.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/guntersville' },
  openGraph: {
    title: 'Guntersville, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Guntersville, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/guntersville',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
