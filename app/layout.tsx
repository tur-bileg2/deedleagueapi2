import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deed League API',
  description: 'Access comprehensive data and statistics for Mongolian basketball players',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Add the Navbar component here */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
