import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '2M Construction | Huntsville AL',
  description: 'Professional construction and remodeling. Get instant estimates online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ paddingTop: '56px', paddingBottom: '64px', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
