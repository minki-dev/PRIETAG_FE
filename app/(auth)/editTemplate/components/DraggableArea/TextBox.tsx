'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BOX_PROPERTY, BoxType } from '../../../../../constants/box';
import { useConfig } from '@/store/slice/configSlice';
import Image from 'next/image';
import {
	DNDBoxState,
	removeBox,
	updateSelected,
	useDNDBox,
} from '@/store/slice/DNDBoxSlice';
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
	const { isPreview, previewMode } = configState;
	const handleRemove = () => {
		dispatch(removeBox({ id, areaType }));
	};

	let customClass = '';
	switch (role) {
		case 'TITLE':
			customClass =
				previewMode === 'tablet'
					? 'text-[32px]'
					: previewMode === 'mobile'
					? 'text-[24px]'
					: 'text-5xl';
			break;
		case 'SUBTITLE':
			customClass =
				previewMode === 'tablet'
					? 'text-[24px]'
					: previewMode === 'mobile'
					? 'text-base'
					: 'text-4xl';
			break;
		case 'TEXT':
			customClass =
				previewMode === 'tablet'
					? 'text-base'
					: previewMode === 'mobile'
					? 'text-xs'
					: 'text-base';
			break;
		default:
			break;
	}
	// console.log('customClass', customClass);
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
						isSelected && !isPreview
							? 'border-[3px] border-black'
							: 'border-dashed'
					} ${divClassName} group relative border-2 font-ptRegular`}
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
						className={`text-center font-bold ${customClass} focus:outline-none disabled:bg-transparent `}
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
