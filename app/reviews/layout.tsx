import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/reviews' },
  title: 'Customer Reviews | 2M Construction',
  description: 'Read 5-star reviews from satisfied customers of 2M Construction in Huntsville, AL. Fencing, roofing, remodeling and more.',
  openGraph: {
    title: 'Customer Reviews — 2M Construction | Huntsville, AL',
    description: '5-star rated contractor in Huntsville, AL. See what our customers say.',
    url: 'https://www.2mhuntsville.com/reviews',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
