'use client';
import { updateContent, usePriceModal } from '@/store/slice/priceModalSlice';
import React, { useEffect, useState, useRef } from 'react';

function PriceCardContent({
	cardIndex,
	contentIndex,
}: {
	cardIndex: number;
	contentIndex: number;
}) {
	const { priceModal, dispatch } = usePriceModal();
	const contentRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.style.height = '30px';
		}
	}, []);

	const inputHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (contentRef.current) {
			contentRef.current.style.height = '30px';
			contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
		}
		dispatch(
			updateContent({
				cardIndex,
				contentIndex,
				contentData: event.target.value,
			}),
		);
	};

	return (
		<>
			<textarea
				className="min-h-[30px] w-[272px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
				placeholder="세부 기능을 입력해 주세요"
				ref={contentRef}
				value={priceModal.priceCards[cardIndex].content[contentIndex]}
				onChange={(event) => inputHandle(event)}
			/>
		</>
	);
}

export default PriceCardContent;
