import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — 2M Construction | Huntsville, AL',
  description: 'Construction tips, project guides, and home improvement advice from 2M Construction in Huntsville, AL.',
  openGraph: {
    title: 'Blog — 2M Construction | Huntsville, AL',
    description: 'Construction tips, project guides, and home improvement advice from 2M Construction in Huntsville, AL.',
    url: 'https://www.2mhuntsville.com/blog',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
