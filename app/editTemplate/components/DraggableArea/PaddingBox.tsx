'use client';

import 'react-resizable/css/styles.css';
import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY } from '@/constants/box';
import { useConfig } from '@/store/slice/configSlice';
import {
	DNDBoxState,
	updateHeight,
	useDNDBox,
} from '@/store/slice/DNDBoxSlice';
import debounce from 'lodash.debounce';
import Image from 'next/image';

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
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(10);

	const { dispatch } = useDNDBox();
	const { configState } = useConfig();
	const { isPreview } = configState;

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleResize = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		setHeight(size.height);
		
		// debounce(() => {
		// 	console.log(height)
		// 	dispatch(updateHeight({ areaType, id, content: height.toString() }));
		// }, 7);
	};

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
					} group relative border-2`}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<div
						{...provided.dragHandleProps}
						className={`draggable-handle flex gap-1 flex-col items-center ${
							isSelected && !isPreview ? '-translate-x-11 opacity-100' : ''
						} `}
					>
						<div className='text-xs text-center shadow-md w-9'>{Math.floor(height)}px</div>
						<Image
							width={24}
							height={24}
							src={'/icons/drag_vert.svg'}
							alt="drag handle svg image"
						/>
					</div>
					<div ref={wrapperRef}>
						<ResizableBox
							height={Number(height)}
							lockAspectRatio={true}
							minConstraints={[width, BOX_PROPERTY.PADDING.minHeight!]}
							maxConstraints={[width, BOX_PROPERTY.PADDING.maxHeight!]}
							width={width}
							// axis="y"
							onResize={handleResize}
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
