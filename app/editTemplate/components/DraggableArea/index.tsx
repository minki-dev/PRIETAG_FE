'use client';

import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TextBox from './TextBox';
import PaddingBox from './PaddingBox';
import { DNDBoxState, updateOrder, useDNDBox } from '@/store/slice/DNDBoxSlice';
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
										areaType={areaType}
									/>
								) : (
									<TextBox
										key={item.id}
										{...item}
										placeholder={item.placeholder || ''}
										index={index}
										areaType={areaType}
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
