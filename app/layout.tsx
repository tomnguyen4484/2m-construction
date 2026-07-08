import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.2mhuntsville.com'),
  title: {
    default: '2M Construction | Contractor Huntsville, AL',
    template: '%s | 2M Construction Huntsville',
  },
  description: 'Licensed & insured contractor in Huntsville, AL. Specializing in fencing, decks, roofing, painting, flooring, bathroom & kitchen remodeling. Free estimates.',
  keywords: ['contractor Huntsville AL', 'contractor Scottsboro AL', 'contractor Guntersville AL', 'contractor Gadsden AL', 'contractor Albertville AL', 'contractor Cullman AL', 'fence installation Huntsville', 'deck builder North Alabama', 'roofing contractor Huntsville', 'bathroom remodel Huntsville', 'kitchen remodel Huntsville', 'painting contractor Huntsville', 'flooring Huntsville AL', '2M Construction', 'North Alabama contractor'],
  authors: [{ name: '2M Construction' }],
  creator: '2M Construction',
  publisher: '2M Construction',
  formatDetection: { telephone: true, email: true },
  alternates: { canonical: 'https://www.2mhuntsville.com' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.2mhuntsville.com',
    siteName: '2M Construction',
    title: '2M Construction | Contractor Huntsville, AL',
    description: 'Licensed contractor in Huntsville, AL. Fencing, decks, roofing, painting, remodeling. Free estimates.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '2M Construction Huntsville AL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2M Construction | Contractor Huntsville, AL',
    description: 'Licensed contractor in Huntsville, AL. Free estimates.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'REPLACE_WITH_GSC_VERIFICATION_CODE',
  },
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
            "telephone": "+19383026795",
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
            "description": "Licensed and insured construction contractor serving North Alabama including Huntsville, Scottsboro, Guntersville, Gadsden, Albertville, Cullman, Florence and surrounding areas. Specializing in fencing, decks, roofing, painting, flooring, bathroom and kitchen remodels.",
            "areaServed": ["Huntsville AL","Madison AL","Athens AL","Decatur AL","Harvest AL","Hampton Cove AL","Scottsboro AL","Guntersville AL","Albertville AL","Boaz AL","Fort Payne AL","Gadsden AL","Cullman AL","Florence AL"],
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
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0F2542', color: '#E2E8F0', paddingTop: '60px', paddingBottom: '64px' }}>
        {/* Fixed full-page watermark logo */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92vw',
          height: '92vw',
          maxWidth: '500px',
          maxHeight: '500px',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: 'url(/logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          {children}
          <Footer />
          <BottomNav />
        </div>
      
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EY3HHXZTKE" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EY3HHXZTKE', { page_path: window.location.pathname });
        `}</Script>
      </body>
    </html>
  );
}
