'use client';

import 'react-resizable/css/styles.css';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useConfig } from '@/store/slice/configSlice';
import {
	DNDBoxState,
	removeBox,
	updateHeight,
	updateSelected,
	useDNDBox,
} from '@/store/slice/DNDBoxSlice';
import Image from 'next/image';
import DeleteButton from '@/components/DeleteButton';
import ResizablePaddingBox from '@/components/ResizablePaddingBox';

type Props = {
	id: string;
	index: number;
	isSelected: boolean;
	areaType: keyof Pick<DNDBoxState, 'faqArea' | 'priceCardArea' | 'tableArea'>
};

export default function PaddingBox({
	id,
	areaType,
	index,
	isSelected,
}: Props) {
	const { dispatch } = useDNDBox();
	const { configState } = useConfig();
	const { isPreview } = configState;
  const heightState = useState<number>(10)

	const handleRemove = () => {
		dispatch(removeBox({ id, areaType }));
	};

	const handleHeightUpdate = (height: number) => {
		dispatch(updateHeight({ areaType, index, content: height.toString()}))
	}
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					onClick={() => dispatch(updateSelected({ id, areaType }))}
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
								{Math.floor(heightState[0])}px
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
					<ResizablePaddingBox type='inner' heightState={heightState} onAction={handleHeightUpdate} />
				</div>
			)}
		</Draggable>
	);
}
