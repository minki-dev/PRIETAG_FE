/* eslint-disable no-param-reassign */

'use client';

import React, { useState } from 'react';
import Dropzone from './Dropzone';
import { toggleUploadModal, useConfig } from '@/store/slice/configSlice';
import {
	setFormData,
	setPreviewImg,
	useUploadModal,
} from '@/store/slice/uploadModalSlice';
import { toggleIsCardSet, usePriceModal } from '@/store/slice/priceModalSlice';

export default function UploadModalForm() {
	const { configState, dispatch: configDispatch } = useConfig();
	const { uploadModal, dispatch: uploadDispatch } = useUploadModal();
	const { priceModal, dispatch: priceDispatch } = usePriceModal();
	const [nextModalOpen, setNextModalOpen] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(true);
	const toggleModalOpen = () => {
		// nextModalOpen 값을 토글

		priceModal.isCardSet
			? [
					configDispatch(toggleUploadModal()),
					uploadDispatch(setFormData(null)),
					uploadDispatch(setPreviewImg(null)),
					priceDispatch(toggleIsCardSet()),
			  ]
			: [
					configState.isOnboardingModalOpen
						? setNextModalOpen(!nextModalOpen)
						: [
								configDispatch(toggleUploadModal()),
								priceDispatch(toggleIsCardSet()),
						  ],
					,
					uploadDispatch(setFormData(null)),
					uploadDispatch(setPreviewImg(null)),
			  ];
	};
	const confirmModal = () => {
		if (uploadModal.formData !== undefined) {
			configState.isOnboardingModalOpen
				? setNextModalOpen(true)
				: configDispatch(toggleUploadModal());
		} else {
			setIsFileUploaded(false);
			return;
		}
	};
	/** 헤더 좌측상단에서 업로드 모달 팝업후 업로드 모달 메소드 */
	const changeIcon = () => {
		if (uploadModal.formData) {
			configDispatch(toggleUploadModal());
		} else {
			setIsFileUploaded(false);
			return;
		}
	};

	return (
		<form
			className={`z-40 flex h-priceModal w-priceModal flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-transform duration-500 ${
				nextModalOpen ? '-translate-x-[835px]' : 'translate-x-0'
			}`}
			// onSubmit={handleSubmit(handleConfirm)}
		>
			<dialog
				open={
					configState.isOnboardingModalOpen || configState.isUploadModalOpen
				}
			>
				<section className="mb-10 flex flex-row justify-between">
					{' '}
					{/* 타이틀 */}
					<div className="font-ptBold text-xl font-medium">
						로고 또는 심벌을 업로드 합니다
					</div>
					<div className="t font-ptRegular text-base font-normal leading-[25.6px] text-borderGray ">
						1/4단계
					</div>
				</section>
				{/* 드랍존 */}
				<Dropzone className="flex h-[370px] w-[768px] flex-col items-center  rounded-2xl border border-dashed  border-gray-700 py-5 pb-14 pl-14 pr-14 " />
				{/* 버튼 섹션 */}
				<section className="mt-6 flex flex-row justify-between">
					<div className="flex flex-col items-start justify-center">
						<p className="font-ptRegular text-sm  leading-[22.4px] text-borderGray">
							로고파일의 확장자는 jpg,png,gif 만 가능합니다.
						</p>
						<p className="font-ptRegular text-sm font-normal  leading-[22.4px] text-borderGray">
							로고파일의 크기는 1MB 이하로 제한됩니다.
						</p>
						{!isFileUploaded && (
							<p className="font-ptRegular text-sm text-red-700">
								파일이 업로드 되지 않았습니다
							</p>
						)}
					</div>
					<div className="flex flex-row gap-3">
						<button
							type="button"
							className="[3px] mt-4  h-[34px] w-[120px] rounded border-1 border-[#747474] bg-white font-ptMedium text-base  font-medium text-borderGray"
							onClick={toggleModalOpen}
						>
							{priceModal.isCardSet ? '취소' : '나중에 하기'}
						</button>
						{priceModal.isCardSet ? (
							<button
								type="button"
								className="[3px] mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
								onClick={changeIcon}
							>
								완료
							</button>
						) : (
							<button
								type="button"
								className="[3px] mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
								onClick={confirmModal}
							>
								다음
							</button>
						)}
					</div>
				</section>
			</dialog>
		</form>
	);
}
