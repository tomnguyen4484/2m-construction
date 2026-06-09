import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — 2M Construction | Huntsville, AL',
  description: '60+ years of combined leadership experience. 2M Construction was founded in 2026 by Tuan Nguyen (Mike) with a family construction tradition spanning over 40 years. Licensed, insured, and trusted across North Alabama.',
  openGraph: {
    title: 'About Us — 2M Construction | Huntsville, AL',
    description: '60+ years of combined leadership. Over 2,000 projects completed across North Alabama.',
    url: 'https://www.2mhuntsville.com/about',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
