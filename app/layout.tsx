import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from './components/client-layout';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata = {
  title: 'TsuCre - Innovative Gaming Controllers',
  description: 'Customizable gaming controllers designed for your unique playstyle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.className}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}