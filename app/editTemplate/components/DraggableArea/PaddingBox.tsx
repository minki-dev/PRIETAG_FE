'use client';

import 'react-resizable/css/styles.css';
import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY } from '@/constants/box';
import { useConfig } from '@/store/slice/configSlice';
import {
	DNDBoxState,
	removeBox,
	updateHeight,
	useDNDBox,
} from '@/store/slice/DNDBoxSlice';
import Image from 'next/image';
import DeleteButton from '@/components/DeleteButton';

type Props = {
	id: string;
	index: number;
	isSelected: boolean;
	areaType: keyof Pick<DNDBoxState, 'faqArea' | 'priceCardArea' | 'tableArea'>;
	onClick: (id: string) => void;
};

export default function PaddingBox({
	id,
	areaType,
	index,
	isSelected,
	onClick,
}: Props) {
	const { boxState, dispatch } = useDNDBox();
	const { configState } = useConfig();
	const { isPreview } = configState;


	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(Number(boxState[areaType][index]) | 10);


	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleResize = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		const flooredHeight = Math.floor(size.height)
		dispatch(updateHeight({ index, areaType, content: flooredHeight.toString()}))
	};
	const handleRemove = () => {
		dispatch(removeBox({ id, areaType }));
	};

	const handleDisplayHeight = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		setHeight(size.height);
	}
	useEffect(() => {
		const handleWindowResize = () => {
			if (wrapperRef.current) {
				setWidth(wrapperRef.current.getBoundingClientRect().width);
			}
		};
		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					onClick={() => onClick(id)}
					className={`
					${
						isSelected && !isPreview ? 'border-black' : 'border-transparent'
					} group relative border-2 ${
						!isPreview ? "hover:border-black" : ""
					} w-full`}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<div
						{...provided.dragHandleProps}
						className={`draggable-handle flex flex-col items-center gap-1 ${
							isSelected && !isPreview ? '-translate-x-11 opacity-100' : ''
						} `}
					>
						<div className='relative'>
							<div className="absolute text-xs text-center shadow-md -top-5 right-[50%] translate-x-[50%] w-9">
								{Math.floor(height)}px
							</div>
							<Image
								width={24}
								height={24}
								src={'/icons/drag_vert.svg'}
								alt="drag handle svg image"
							/>
						</div>
					</div>
					<DeleteButton className='z-[1]' onClick={handleRemove} />
					<div ref={wrapperRef}>
						<ResizableBox
							height={Number(height)}
							lockAspectRatio={true}
							onResizeStop={handleResize}
							minConstraints={[width, BOX_PROPERTY.PADDING.minHeight!]}
							maxConstraints={[width, BOX_PROPERTY.PADDING.maxHeight!]}
							width={width}
							// axis="y"
							onResize={handleDisplayHeight}
							resizeHandles={isPreview ? [] : ['s']}
							handleSize={[10, 10]}
							className="flex items-center justify-center"
						></ResizableBox>
					</div>
				</div>
			)}
		</Draggable>
	);
}
