'use client';

import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// import StrictModeDroppable from '@/utils/StrictModeDroppable';
import TextBox from './TextBox';
import PaddingBox from './PaddingBox';
import {
	DNDBoxState,
	addBox,
	updateOrder,
	updateSelected,
	useDNDBox,
} from '@/store/slice/DNDBoxSlice';
import { StrictModeDroppable } from '@/app/helpers/StrictModeDroppable';

export default function DraggableArea({
	areaType,
}: {
	areaType: keyof Pick<DNDBoxState, 'faqArea' | 'priceCardArea' | 'tableArea'>;
}) {
	const { boxState, dispatch } = useDNDBox();
	const list = boxState[areaType];

	const handleOnDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const updatedList = [...list];
		const [itemToReorder] = updatedList.splice(source.index, 1);
		updatedList.splice(destination.index, 0, itemToReorder);

		dispatch(updateOrder({ areaType, newList: updatedList }));
	};

	const handleSelect = (id: string) => {
		dispatch(updateSelected({ id, areaType }));
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<StrictModeDroppable droppableId="draggable">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{list.map((item, index) =>
								item.role === 'PADDING' ? (
									<PaddingBox
										key={item.id}
										index={index}
										{...item}
										onClick={handleSelect}
										areaType={areaType}
									/>
								) : (
									<TextBox
										key={item.id}
										{...item}
										placeholder={item.placeholder || ''}
										onClick={handleSelect}
										index={index}
										
										// inputRef={addRef(index, React.createRef())}
									/>
								),
							)}
							{provided.placeholder}
						</div>
					)}
				</StrictModeDroppable>
			</DragDropContext>
		</div>
	);
}
