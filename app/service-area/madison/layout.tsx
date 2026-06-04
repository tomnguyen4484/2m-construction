import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Madison, AL Contractor | 2M Construction',
  description: 'Licensed contractor serving Madison, Alabama. Fencing, decks, roofing, painting, remodeling and more. Free estimates.',
  alternates: { canonical: 'https://www.2mhuntsville.com/service-area/madison' },
  openGraph: {
    title: 'Madison, AL Contractor | 2M Construction',
    description: 'Trusted contractor in Madison, AL. Quality work, affordable prices.',
    url: 'https://www.2mhuntsville.com/service-area/madison',
    siteName: '2M Construction',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
