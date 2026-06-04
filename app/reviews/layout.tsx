import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews — 2M Construction | Huntsville, AL',
  description: 'Read reviews from satisfied customers of 2M Construction in Huntsville, AL. Licensed & insured contractor.',
  openGraph: {
    title: 'Customer Reviews — 2M Construction | Huntsville, AL',
    description: 'Read reviews from satisfied customers of 2M Construction in Huntsville, AL. Licensed & insured contractor.',
    url: 'https://www.2mhuntsville.com/reviews',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
