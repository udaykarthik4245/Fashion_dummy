import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Meesho Clone — Shop Fashion, Home, Beauty & More',
  description:
    'A demo Meesho-inspired e-commerce platform built with Next.js. Browse, search, add to cart, checkout, and manage products as a seller.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
