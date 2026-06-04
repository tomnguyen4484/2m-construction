import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.2mhuntsville.com/about' },
  title: 'About Us | 2M Construction',
  description: '20 years of construction experience in Huntsville, AL. Meet Tuan Nguyen and the 2M Construction team. Licensed, insured, and trusted by 2,000+ projects.',
  openGraph: {
    title: 'About Us — 2M Construction | Huntsville, AL',
    description: '20 years of construction experience in Huntsville, AL. Licensed, insured, and trusted by 2,000+ projects.',
    url: 'https://www.2mhuntsville.com/about',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
