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
							? "editable-inner border-gray-500"
							: 'editable-inner-preview border-transparent'
					} ${
						isSelected && !isPreview
						? 'border-black'
						: 'border-dashed'						
					} ${divClassName}  border-2 font-ptRegular`}
				>
					<div
						{...provided.dragHandleProps}
						className={`draggable-handle ${
							isSelected && !isPreview  ? '-translate-x-10 opacity-100' : ''
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
