'use client';

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';

import DesktopIcon from '@/public/icons/desktop.svg';
import tabletIcon from '@/public/icons/tablet.svg';
import mobileIcon from '@/public/icons/mobile.svg';
import selectedDesktopIcon from '@/public/icons/desktop_selected.svg';
import selectedTabletIcon from '@/public/icons/tablet_selected.svg';
import selectedMobileIcon from '@/public/icons/mobile_selected.svg';

import {
	setPreviewMode,
	toggleColorModal,
	togglePreview,
	togglePriceModal,
	toggleUploadModal,
	useConfig,
} from '@/store/slice/configSlice';
import { useUploadModal } from '@/store/slice/uploadModalSlice';

export default function TemplateHeader() {
	const [isClicked, setIsClicked] = useState(false);
	const { configState, dispatch: configDispatch } = useConfig();
	const { uploadModal } = useUploadModal();
	const file = uploadModal?.formData?.get('file') as File;
	const imageUrl = file ? URL.createObjectURL(file) : '';
	const resetPreviewMode = () => {
		configDispatch(setPreviewMode('desktop'));
		configDispatch(togglePreview());
	};

	return (
		<div className="relative  h-[72px] w-full min-w-[1280px]">
			<div className="shadow-[0_1px_3px_rgba(0, 0, 0, 0.15)] absolute top-0 z-20 h-[72px] w-full bg-[#FFF] shadow-md">
				{configState.isPreview ? (
					<div className="grid h-full w-full ">
						<div className=" flex  flex-row items-center justify-center gap-[34px] ">
							<Image
								width={24}
								height={24}
								src={
									configState.previewMode === 'desktop'
										? '/icons/desktop_selected.svg'
										: DesktopIcon
								}
								alt="데스크톱 아이콘"
								onClick={() => configDispatch(setPreviewMode('desktop'))}
							/>

							<Image
								width={24}
								height={24}
								src={
									configState.previewMode === 'tablet'
										? '/icons/tablet_selected.svg'
										: tabletIcon
								}
								alt="태블릿 아이콘"
								onClick={() => configDispatch(setPreviewMode('tablet'))}
							/>
							<Image
								width={24}
								height={24}
								src={
									configState.previewMode === 'mobile'
										? selectedMobileIcon
										: mobileIcon
								}
								alt="모바일 아이콘"
								onClick={() => configDispatch(setPreviewMode('mobile'))}
							/>
							<div className="absolute right-2 ">
								<button
									type="button"
									className="[3px] h-[31px] w-[104px] rounded border border-[borderGray] bg-white font-ptMedium text-base  font-medium text-borderGray"
									onClick={resetPreviewMode}
								>
									나가기
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="flex h-full w-full items-center px-[20px]">
						<div className=" relative  cursor-pointer sm:h-[32px] sm:w-[93px] xl:h-[32px] xl:w-[94px]">
							{uploadModal?.formData?.get('file') ? (
								<Image
									src={imageUrl}
									alt="로고 이미지"
									width={32}
									height={32}
									className="object-cover"
									onClick={() => configDispatch(toggleUploadModal())}
								/>
							) : (
								<Image
									src="/img/upload_logo.svg"
									alt="로고 이미지"
									// width={93.81}
									// height={32}
									fill
									className="absolute left-[40px] top-[20px]"
									onClick={() => configDispatch(toggleUploadModal())}
								/>
							)}
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
				)}
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
