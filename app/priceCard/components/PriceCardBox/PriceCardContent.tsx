'use client';
import { updateContent, usePriceModal } from '@/store/slice/priceModalSlice';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

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
		if (contentHoverRef.current && contentRef.current)
			contentHoverRef.current.style.height = contentRef.current.style.height;
	}, []);

	const inputHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (contentRef.current) {
			contentRef.current.style.height = '30px';
			contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
		}
		if (contentHoverRef.current && contentRef.current)
			contentHoverRef.current.style.height = contentRef.current.style.height;
		dispatch(
			updateContent({
				cardIndex,
				contentIndex,
				contentData: event.target.value,
			}),
		);
	};

	const contentHoverRef = useRef<HTMLDivElement>(null);
	const [isContentHovering, setIsContentHovering] = useState(false);

	// content
	const contentOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsContentHovering(true);
		if (contentRef.current)
			contentRef.current.style.border = '1px solid #000000';
	};
	const contentOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsContentHovering(false);
		if (contentRef.current)
			contentRef.current.style.border = '1px dashed #BCBCBC';
	};

	return (
		<div
			onMouseOver={contentOverHoverHandler}
			onMouseOut={contentOutHoverHandler}
			className="relative min-h-[30px]"
			ref={contentHoverRef}
		>
			{isContentHovering ? (
				<Image
					src="/icons/hover_delete.svg"
					alt="close_button"
					width={26}
					height={26}
					className="absolute right-[-13px] top-[-13px] cursor-pointer"
				/>
			) : null}
			<textarea
				className="min-h-[30px] w-[272px] resize-none overflow-hidden border-[1px] border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
				placeholder="세부 기능을 입력해 주세요"
				ref={contentRef}
				value={priceModal.priceCards[cardIndex].content[contentIndex]}
				onChange={(event) => inputHandle(event)}
			/>
		</div>
	);
}

export default PriceCardContent;
