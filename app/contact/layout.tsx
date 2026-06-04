import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | 2M Construction',
  description: 'Contact 2M Construction in Huntsville, AL. Get a free estimate for fencing, decks, roofing, remodeling and more.',
  alternates: { canonical: 'https://www.2mhuntsville.com/contact' },
  openGraph: {
    title: 'Contact Us | 2M Construction',
    description: 'Reach out to 2M Construction for a free estimate.',
    url: 'https://www.2mhuntsville.com/contact',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
