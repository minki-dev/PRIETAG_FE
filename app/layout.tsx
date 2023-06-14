

import './globals.css';
import { Inter } from 'next/font/google';

import ReduxProvider from '@/store/ReduxProvider';

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
				<ReduxProvider>
					<main className="w-screen min-h-screen bg-gray-100">
						<main className="m-auto bg-white max-w-screen-2xl">{children}</main>
					</main>
				</ReduxProvider>
			</body>
		</html>
	);
}
