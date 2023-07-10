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
			<link rel="icon" href="/img/ezfee.svg" sizes="any" />
			<body className={inter.className} suppressHydrationWarning={true}>
				<ReduxProvider>
					<main className="w-screen min-h-screen bg-gray-100">
						<main className=" m-auto w-[375px]  bg-white sm:w-full xl:min-w-[1280px] xl:max-w-[1920px]  ">
						{children}
						</main>
					</main>
				</ReduxProvider>
			</body>
		</html>
	);
}
