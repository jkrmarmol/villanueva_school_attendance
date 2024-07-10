import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionWrapper from '@/components/session-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} overflow-hidden`}>
          <NextTopLoader />
          <Providers session={null}>
            <Toaster />
            {children}
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
