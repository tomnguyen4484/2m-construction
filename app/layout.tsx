import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://2mhuntsville.com'),
  title: {
    default: '2M Construction – Free Estimates | Huntsville, AL',
    template: '%s | 2M Construction Huntsville',
  },
  description: 'Get instant construction estimates for fencing, decks, roofing, painting, flooring & more in Huntsville, AL. Licensed & insured. Call (256) 555-1234.',
  keywords: ['construction Huntsville AL', 'fence installation Huntsville', 'deck builder Huntsville', 'roofing contractor Huntsville', 'painting contractor Huntsville', 'flooring Huntsville', 'bathroom remodel Huntsville', 'kitchen remodel Huntsville', '2M Construction'],
  authors: [{ name: '2M Construction' }],
  creator: '2M Construction',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://2mhuntsville.com',
    siteName: '2M Construction',
    title: '2M Construction – Free Estimates | Huntsville, AL',
    description: 'Instant construction estimates for Huntsville, Madison, Athens & Decatur. Fencing, decks, roofing, painting, flooring & more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '2M Construction Huntsville' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2M Construction – Free Estimates | Huntsville, AL',
    description: 'Instant construction estimates in Huntsville, AL. Licensed & insured.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://2mhuntsville.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1A3A5C" />
        <meta name="geo.region" content="US-AL" />
        <meta name="geo.placename" content="Huntsville, Alabama" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "2M Construction",
            "image": "https://2mhuntsville.com/logo.png",
            "url": "https://2mhuntsville.com",
            "telephone": "+12565551234",
            "email": "info@2mhuntsville.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Huntsville",
              "addressLocality": "Huntsville",
              "addressRegion": "AL",
              "postalCode": "35801",
              "addressCountry": "US"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 34.7304, "longitude": -86.5861 },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "16:00" }
            ],
            "sameAs": [],
            "priceRange": "$$",
            "description": "Licensed and insured construction contractor serving Huntsville, Madison, Athens, and Decatur, Alabama. Specializing in fencing, decks, roofing, painting, flooring, bathroom and kitchen remodels.",
            "areaServed": ["Huntsville AL", "Madison AL", "Athens AL", "Decatur AL"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Construction Services",
              "itemListElement": [
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Fence Installation"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Deck Building"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Roof Replacement"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Interior & Exterior Painting"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Flooring Installation"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Bathroom Remodel"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"Kitchen Remodel"}}
              ]
            }
          })}}
        />
      </head>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#F8FAFC', color: '#1E293B', paddingTop: '60px', paddingBottom: '64px' }}>
        <Header />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
