'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY, BoxType } from '../../../../constants/box';

type Props = {
	id: string;
	index: number;
	placeholder: string;
	isPreview: boolean;
	// inputRef: React.MutableRefObject<any>;
	boxData: {
		role: BoxType;
		content: string;
	};
};

export default function TextBox({
	id,
	index,
	placeholder,
	// inputRef,
	isPreview,
	boxData,
}: Props) {
	const { height, inputHeight, textSize } = BOX_PROPERTY[boxData.role];
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
					className={`${
						isPreview ? '' : 'border-2 border-dashed border-[#989898]'
					} ${height} relative flex justify-center items-center font-ptRegular`}
				>
					<div
						{...provided.dragHandleProps}
						className="absolute z-10 w-6 h-6 rounded-lg left-1 top-1 bg-sky-200"
					>
						{}
					</div>
					<input
						className={`${inputHeight} ${textSize} font-bold text-center disabled:bg-transparent focus:outline-none`}
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
