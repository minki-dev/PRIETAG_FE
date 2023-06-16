'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY, BoxType } from '../../../../constants/box';
import { useConfig } from '@/store/slice/configSlice';
import Image from 'next/image';
import { DNDBoxState, removeBox, updateSelected, useDNDBox } from '@/store/slice/DNDBoxSlice';
import DeleteButton from '@/components/DeleteButton';

type Props = {
	id: string;
	index: number;
	placeholder: string;
	isSelected: boolean;
	areaType: keyof Pick<DNDBoxState, 'faqArea' | 'priceCardArea' | 'tableArea'>;
	role: BoxType;
	content: string;
};

export default function TextBox({
	id,
	index,
	placeholder,
	isSelected,
	role,
	content,
	areaType,
}: Props) {
	const { divClassName } = BOX_PROPERTY[role];
	const { dispatch } = useDNDBox();

	const { configState } = useConfig();
	const { isPreview } = configState;
	const handleRemove = () => {
		dispatch(removeBox({ id, areaType }));
	};
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
				onClick={() => dispatch(updateSelected({ id, areaType }))}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className={`${
						!isPreview
							? 'editable-inner border-gray-500'
							: 'editable-inner-preview border-transparent'
					} ${
						isSelected && !isPreview ? 'border-black border-[3px]' : 'border-dashed'
					} ${divClassName} relative group border-2 font-ptRegular`}
				>
					<div
						{...provided.dragHandleProps}
						className={`draggable-handle ${
							isSelected && !isPreview ? '-translate-x-10 opacity-100' : ''
						} `}
					>
						<Image
							width={24}
							height={24}
							src={'/icons/drag_vert.svg'}
							alt="drag handle svg image"
						/>
					</div>
					<DeleteButton onClick={handleRemove} />
					<input
						className='font-bold text-center focus:outline-none disabled:bg-transparent'
						defaultValue={content}
						disabled={isPreview}
						type="text"
						placeholder={isPreview ? '' : placeholder}
						// ref={inputRef}
					/>
				</div>
			)}
		</Draggable>
	);
}
