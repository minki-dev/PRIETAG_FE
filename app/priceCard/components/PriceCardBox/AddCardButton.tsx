'use client';
import { useConfig } from '@/store/slice/configSlice';
import Image from 'next/image';
import React from 'react';

function AddCardButton() {
	const { configState } = useConfig();
	const { isPreview } = configState;

	return (
		<>
			{!isPreview ? (
				<div className="flex h-[336px] w-[336px] flex-col items-center justify-center gap-[24px] rounded-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.15)]">
					<Image
						src={'/img/insert_card01.svg'}
						alt="insert_card_button"
						width={200}
						height={200}
					/>
					<span className="text-xl font-medium text-[#989898]">
						가격 / 요금제 카드 추가하기
					</span>
				</div>
			) : null}
		</>
	);
}

export default AddCardButton;
