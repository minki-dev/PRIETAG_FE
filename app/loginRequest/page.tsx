'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';

export default function loginRequest() {
	const router = useRouter();

	return (
		<>
			<Header />
			<div className=" flex h-full w-full flex-col items-center justify-center bg-[#F7F8FC] pt-[72px] text-center xl:h-[808px]">
				<div className=" h-[120px] w-[120px] sm:h-[144px] sm:w-[144px]">
					<img
						src="/img/loginOrregister.svg"
						className=" object-cover "
						alt="로그인요청 이미지"
					/>
				</div>
				<div className="my-[48px] leading-[51px]">
					<div className=" text-[20px] font-bold sm:text-[32px]">
						로그인이 필요한 페이지에요.
					</div>
					<div className="text-base font-medium text-[#989898]  sm:text-2xl">
						로그인을 하시면 모든 기능을 이용하실 수 있어요.
					</div>
				</div>
				<button
					className="h-[34px] w-[104px] rounded border-[1px] border-[#00A3FF] bg-[#00A3FF] px-[18px] py-[5.5px] text-sm font-medium text-white"
					type="button"
				>
					로그인
				</button>
				<button
					className="h-[34px] w-[120px] rounded px-[18px] py-[5.5px] text-[14px] font-medium text-[#BCBCBC]"
					type="button"
				>
					회원가입하기
				</button>
			</div>
			;
			<Footer />
		</>
	);
}
