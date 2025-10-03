import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/shared/Header';
import ToastProvider from './components/providers/ToastProvider';
import PageWrapper from './components/shared/PageWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Next.js Blog',
  description: 'A blog built with Next.js and Payload CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ToastProvider />
        <Header />
        <main>
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      </body>
    </html>
  );
}