'use client';

import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
// import StrictModeDroppable from '@/utils/StrictModeDroppable';
import TextBox from './TextBox';
import PaddingBox from './PaddingBox';
import { cardState } from '../data';

export default function DraggableArea() {
	const [list, setList] = useState(cardState.cardArea);
	const [isPreview, setIsPreview] = useState(false);

	// const addRef = (index: number, ref: React.MutableRefObject<any>) => {
	// 	const updatedList = [...list];
	// 	const newItem = { ...updatedList[index], ref };
	// 	updatedList.splice(index, 1, newItem);
	// 	setList(updatedList);
	// 	return ref;
	// };

	const handleOnDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const updatedList = Array.from(list);
		const [itemToReorder] = updatedList.splice(source.index, 1);
		updatedList.splice(destination.index, 0, itemToReorder);

		setList(updatedList);
	};

	return (
		<div>
			<button type="button" onClick={() => setIsPreview(!isPreview)}>
				preview
			</button>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="draggable">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{list.map((item, index) =>
								item?.boxData.role === 'PADDING' ? (
									<PaddingBox  key={item.id} index={index} {...item} isPreview={isPreview}/>
								) : (
									<TextBox
										key={item.id}
										{...item}
										placeholder={item.placeholder || ''}
										index={index}
										isPreview={isPreview}
										// inputRef={addRef(index, React.createRef())}
									/>
								),
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}
