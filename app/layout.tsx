'use client';

import { Provider } from 'react-redux';
import './globals.css';
import { Inter } from 'next/font/google';
import { store } from '@/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'EZFEE',
	description: 'No code saas service price tag making service',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<link rel="icon" href="/logo.ico" sizes="any" />
			<body className={inter.className}>
				<Provider store={store}>
					<main className="min-h-screen w-screen bg-gray-100">
						<main className="m-auto max-w-screen-2xl bg-white">{children}</main>
					</main>
				</Provider>
			</body>
		</html>
	);
}
