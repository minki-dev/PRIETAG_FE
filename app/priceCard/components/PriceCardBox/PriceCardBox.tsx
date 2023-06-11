'use client';
import React from 'react';
import AddCardButton from './AddCardButton';
import PriceCard from './PriceCard';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/app/helpers/StrictModeDroppable';
import { v4 as uuidv4 } from 'uuid';

interface priceCardid {
	id: string;
}
interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

/* 테스트용 스타일 */
// const getListStyle = (isDraggingOver: any) => ({
// 	background: isDraggingOver ? 'lightblue' : 'white',
// 	display: 'flex',
// 	overflow: 'auto',
// });

function PriceCardBox() {
	const [priceCardId, setPriceCardId] = React.useState<priceCardid[]>([]);

	const colorInfoEl: colorInfo = {
		mainColor: '#00A3FF',
		subColor01: '#60C8FF',
		subColor02: '#EAF8FF',
	};

	const reorder = (
		priceCardId: priceCardid[],
		startIndex: number,
		endIndex: number,
	) => {
		const result = Array.from(priceCardId);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = reorder(
			priceCardId,
			result.source.index,
			result.destination.index,
		);

		setPriceCardId(items);
	};
	const { v4: uuidv4 } = require('uuid');
	console.log(uuidv4());
	const handleAddCard = () => {
		if (priceCardId.length > 3) return;

		const addId = [{ id: uuidv4() }];
		setPriceCardId([...priceCardId, ...addId]);
	};

	return (
		<div className="flex min-h-[479px] items-center justify-center gap-10">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="priceCard" direction="horizontal">
					{(provided, snapshot) => (
						<section
							{...provided.droppableProps}
							ref={provided.innerRef}
							//style={getListStyle(snapshot.isDraggingOver)}
							className="flex flex-nowrap justify-center gap-10"
						>
							{priceCardId.map((card, index) => (
								<Draggable
									key={card.id}
									draggableId={card.id.toString()}
									index={index}
								>
									{(provided) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<PriceCard cardId={card.id} color={colorInfoEl} />
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</section>
					)}
				</Droppable>
			</DragDropContext>
			<button type="button" onClick={handleAddCard}>
				<AddCardButton color={colorInfoEl} />
			</button>
		</div>
	);
}

export default PriceCardBox;
