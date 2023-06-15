'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY, BoxType } from '../../../../constants/box';
import { useConfig } from '@/store/slice/configSlice';
import Image from 'next/image';

type Props = {
	id: string;
	index: number;
	placeholder: string;
	isSelected: boolean;
	role: BoxType;
	content: string;
	onClick: (id: string) => void;
};

export default function TextBox({
	id,
	index,
	placeholder,
	isSelected,
	role,
	content,
	onClick,
}: Props) {
	const { divClassName, inputClassName } = BOX_PROPERTY[role];
	const { configState } = useConfig();
	const { isPreview } = configState;

	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					onClick={() => onClick(id)}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className={`${
						!isPreview
							? isSelected
								? 'border-black'
								: 'border-dashed border-[#989898]'
							: 'border-transparent'
					}  ${divClassName} editable-inner border-2 font-ptRegular`}
				>
					<div
						{...provided.dragHandleProps}
						className={`draggable-handle ${
							isSelected ? '-translate-x-9 opacity-100' : ''
						} `}
					>
						<Image width={24} height={24} src={"/icons/drag_vert.svg"} alt='drag handle svg image'/>
					</div>

					<input
						className={` ${inputClassName} text-center font-bold focus:outline-none disabled:bg-transparent`}
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
