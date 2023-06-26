'use client';

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';
import {
	toggleColorModal,
	togglePriceModal,
	useConfig,
} from '@/store/slice/configSlice';

export default function TemplateHeader() {
	const [isClicked, setIsClicked] = useState(false);
	const { dispatch: configDispatch } = useConfig();

	return (
		<div className="relative  h-[72px] w-full min-w-[1280px]">
			<div className="shadow-[0_1px_3px_rgba(0, 0, 0, 0.15)] absolute top-0 z-20 h-[72px] w-full bg-[#FFF] shadow-md">
				<div className="flex h-full w-full items-center px-[20px]">
					<div className=" relative  cursor-pointer sm:h-[32px] sm:w-[93px] xl:h-[32px] xl:w-[94px]">
						<Image
							src="/img/upload_logo.svg"
							alt="로고 이미지"
							fill
							className="absolute left-[40px] top-[20px]"
						/>
					</div>
					<input
						placeholder="저장될 파일 이름을 입력해 주세요"
						className="color-[#747474]  min-w-1/2 top-[calc(50%-26px/2)] flex h-[26px] w-[260px] cursor-pointer items-center justify-center text-base font-normal leading-[26px] focus:outline-none"
					/>{' '}
					<RxHamburgerMenu
						className=" absolute right-[40px]  top-[calc(50%-18px/2)] h-[18px] w-[18px] cursor-pointer rounded-[3px] hover:text-[#00A3FF]"
						onClick={() => {
							setIsClicked((prev) => !prev);
						}}
					/>{' '}
				</div>
				{isClicked ? (
					<nav className="absolute right-[74px] top-[28px] z-20 h-[160px] w-[200px] rounded-xl bg-white text-base  font-normal leading-[26px] text-black shadow-[0_0_4px_rgba(0,0,0,0.5)] shadow-[#D9D9D9] ">
						<ul>
							<li className="flex h-[40px] w-full cursor-pointer items-center rounded-[12px_12px_0_0] hover:bg-[#00A3FF]  hover:text-white">
								<span className="absolute left-[16px]">불러오기 </span>
							</li>
							<li
								className="flex h-[40px]  cursor-pointer items-center hover:bg-[#00A3FF]  hover:text-white"
								onClick={() => configDispatch(togglePriceModal())}
							>
								<span className="absolute left-[16px]">
									가격 할인 정책 재설정
								</span>
							</li>
							<li
								className="flex h-[40px] cursor-pointer items-center hover:bg-[#00A3FF] hover:text-white"
								onClick={() => configDispatch(toggleColorModal())}
							>
								<span className="absolute left-[16px]">컬러 테마 재설정</span>
							</li>
							<li className="flex h-[40px] cursor-pointer items-center rounded-[0_0_12px_12px] hover:bg-[#00A3FF]  hover:text-white">
								<span className="absolute left-[16px]">홈</span>
							</li>
						</ul>
					</nav>
				) : null}{' '}
			</div>
		</div>
	);
}
