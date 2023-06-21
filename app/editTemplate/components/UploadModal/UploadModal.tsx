/* eslint-disable no-param-reassign */

'use client';

import React from 'react';
import Dropzone from './Dropzone';

export default function UploadModal() {
	return (
		<form
			className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
			// onSubmit={handleSubmit(handleConfirm)}
		>
			<dialog
				open
				className="flex h-priceModal w-priceModal flex-col rounded-2xl border border-gray-200 bg-white p-8"
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
				{/* 업로드 섹션 */}
				{/* <section className="flex h-[370px] w-[768px] flex-col items-center  rounded-2xl border border-dashed  border-gray-700 py-5 pb-14 pl-14 pr-14 ">
					<div className="mb-10">
						<Image
							width={200}
							height={176}
							src={'/icons/icon_upload.svg'}
							alt="drag handle svg image"
						/>
					</div>
					<div className="flex flex-col items-center justify-center">
						<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
							큰 점선 안의 영역에 드래그 하여 업로드 해주세요
						</p>
						<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
							또는 위의 아이콘을 클릭하여 업로드 해주세요
						</p>
					</div>
				</section> */}
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
					</div>
					<div className="flex flex-row gap-3">
						<button
							type="button"
							className="[3px] mt-4  h-[34px] w-[120px] rounded border-1 border-[#747474] bg-white font-ptMedium text-base  font-medium text-borderGray"
						>
							나중에 하기
						</button>
						<button
							type="button"
							className="[3px] mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
						>
							다음
						</button>
					</div>
				</section>
			</dialog>
		</form>
	);
}
