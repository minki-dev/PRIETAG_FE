'use client';
import {
	deletePriceCardContent,
	updateContent,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useConfig } from '@/store/slice/configSlice';

function PriceCardContent({
	cardIndex,
	contentIndex,
}: {
	cardIndex: number;
	contentIndex: number;
}) {
	const { configState } = useConfig();
	const { isPreview, previewMode } = configState;

	const { priceModal, dispatch } = usePriceModal();
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const contentHoverRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (contentHoverRef.current && contentRef.current) {
	// 		contentHoverRef.current.style.height = '30px';
	// 		contentRef.current.style.height = '30px';
	// 	}
	// }, []);

	const [contentEl, setContentEl] = useState(
		priceModal.priceCards[cardIndex].content[contentIndex],
	);
	// useEffect(() => {
	// 	setContentEl(priceModal.priceCards[cardIndex].content[contentIndex]);
	// }, [priceModal.priceCards[cardIndex].content[contentIndex]]);

	const inputHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (contentRef.current) {
			contentRef.current.style.height = '30px';
			contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
		}
		if (contentHoverRef.current && contentRef.current)
			contentHoverRef.current.style.height = contentRef.current.style.height;
		const value = event.target.value;
		setContentEl(value);
		// console.log(contentEl);
		dispatch(
			updateContent({
				cardIndex,
				contentIndex,
				contentData: value,
			}),
		);
	};

	const deleteHandle = () => {
		setContentEl('');
		if (contentRef.current) {
			contentRef.current.style.height = '30px';
		}
		if (contentHoverRef.current && contentRef.current)
			contentHoverRef.current.style.height = contentRef.current.style.height;
		dispatch(deletePriceCardContent({ cardIndex, contentIndex }));
	};

	const [isContentHovering, setIsContentHovering] = useState(false);

	// content
	const contentOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsContentHovering(true);
			if (contentRef.current)
				contentRef.current.style.border = '1px solid #000000';
		}
	};
	const contentOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsContentHovering(false);
			if (contentRef.current)
				contentRef.current.style.border = '1px dashed #BCBCBC';
		}
	};

	useEffect(() => {
		if (isPreview) {
			if (contentRef.current && contentHoverRef.current) {
				contentRef.current.style.border = 'none';
				contentRef.current.disabled = true;
				if (contentRef.current.value === '') {
					contentHoverRef.current.style.display = 'none';
				}
			}
		} else {
			if (contentRef.current && contentHoverRef.current) {
				contentRef.current.style.border = '1px dashed #BCBCBC';
				contentRef.current.disabled = false;
				if (contentRef.current.value === '') {
					contentHoverRef.current.style.display = 'block';
				}
			}
		}
	}, [isPreview]);

	return (
		<div
			onMouseOver={contentOverHoverHandler}
			onMouseOut={contentOutHoverHandler}
			className="relative h-[30px]"
			ref={contentHoverRef}
		>
			{isContentHovering ? (
				<Image
					src="/icons/hover_delete.svg"
					alt="close_button"
					width={26}
					height={26}
					className="absolute right-[-13px] top-[-13px] cursor-pointer"
					onClick={deleteHandle}
				/>
			) : null}
			<textarea
				className={`responsiveContent ${
					previewMode === 'tablet'
						? 'w-[191px] text-sm'
						: previewMode === 'mobile'
						? 'w-[255px] text-xs'
						: 'w-[272px]'
				} h-[30px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none disabled:bg-white`}
				placeholder="세부 기능을 입력해 주세요"
				ref={contentRef}
				value={contentEl}
				onChange={inputHandle}
			/>
		</div>
	);
}

export default PriceCardContent;
