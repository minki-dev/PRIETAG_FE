'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';

export default function notfound() {
	const router = useRouter();

	return (
		<div className=" flex h-full w-[375px] flex-col items-center justify-center bg-transparent px-[20px] sm:w-[1280px] sm:px-[120px] xl:w-[1920px]  xl:bg-[#F9E8E9] xl:px-[240px]">
			<Header />
			<div className=" flex h-full w-full flex-col items-center justify-center bg-[#F7F8FC] pt-[72px] text-center xl:h-[808px]">
				<div className=" h-[120px] w-[120px] sm:h-[144px] sm:w-[144px]">
					<img
						src="/img/error_404.svg"
						className=" object-cover "
						alt="Loading"
					/>
				</div>
				<div className="my-[48px] leading-[51px]">
					<div className=" text-[20px] font-bold sm:text-[32px]">
						페이지에 연결할 수 없어요.
					</div>
					<div className="text-base font-medium text-[#989898]  sm:text-2xl">
						올바른 주소 또는 경로를 확인해 주세요.
					</div>
				</div>
				<button
					className="h-[34px] w-[104px] rounded border-[1px] border-[#747474] px-[18px] py-[5.5px] text-sm font-medium"
					type="button"
					onClick={() => router.back()}
				>
					다시 시도
				</button>
			</div>
			<Footer />
		</div>
	);
}
