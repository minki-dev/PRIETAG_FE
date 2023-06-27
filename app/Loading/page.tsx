import React from 'react';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function Loading() {
	return (
		<div>
			<Header />
			<div className=" flex h-full w-[375px] flex-col items-center justify-center bg-transparent px-[20px] sm:w-full sm:min-w-[1280px] sm:px-[120px] xl:w-full xl:min-w-[1480px] xl:bg-[#F9E8E9] xl:px-[240px]">
				<div className=" flex h-full w-full flex-col items-center justify-center bg-[#F7F8FC] pt-[72px] text-center xl:h-[808px]  ">
					<div className=" h-[120px] w-[120px] sm:h-[144px] sm:w-[144px]">
						<img
							src="/img/loading.svg"
							className=" object-cover "
							alt="Loading"
						/>
					</div>
					<div className="my-[48px] leading-[51px]">
						<div className=" text-[20px] font-bold sm:text-[32px]">
							페이지를 불러오고 있어요.
						</div>
						<div className="text-base font-medium text-[#989898]  sm:text-2xl">
							로딩 중이니 잠시 기다려주세요.
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
