import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import ReduxProvider from '@/store/ReduxProvider';
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.ico" sizes="any" />
      <body className={inter.className}>
        <ReduxProvider>
          <main className="min-h-screen w-screen bg-gray-100">
            <main className="m-auto max-w-screen-2xl bg-white">{children}</main>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}