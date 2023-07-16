import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import ReduxProvider from '@/store/ReduxProvider';
import Header from '@/components/header/Header';
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<link rel="icon" href="/img/ezfee.svg" sizes="any" />
			<body
				className={`w-screen bg-gray-100 ${inter.className}`}
				suppressHydrationWarning={true}
			>
				<ReduxProvider>
					<Header />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
