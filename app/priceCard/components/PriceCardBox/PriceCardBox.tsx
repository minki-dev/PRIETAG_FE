'use client';
import React, { useEffect } from 'react';
import AddCardButton from './AddCardButton';
import PriceCard from './PriceCard';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/app/helpers/StrictModeDroppable';
import { v4 as uuidv4 } from 'uuid';
import {
	addPriceCard,
	changeOrderPriceCard,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import {
	addColumn,
	swapColumns,
	useFeatureTable,
} from '@/store/slice/featureTableSlice';

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
	const { priceModal, dispatch: priceModalDispatch } = usePriceModal();
	const { dispatch: featureTableDispatch } = useFeatureTable();

	const colorInfoEl: colorInfo = {
		mainColor: '#00A3FF',
		subColor01: '#60C8FF',
		subColor02: '#EAF8FF',
	};

	const reorder = (startIndex: number, endIndex: number) => {
		const result = Array.from(priceModal.priceCards);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		priceModalDispatch(changeOrderPriceCard(result));
		featureTableDispatch(swapColumns({ colIndex: startIndex, to: endIndex }));
	};

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		reorder(result.source.index, result.destination.index);
	};
	const { v4: uuidv4 } = require('uuid');

	const handleAddCard = () => {
		if (priceModal.priceCards.length > 3) return;

		priceModalDispatch(addPriceCard());
		featureTableDispatch(addColumn());
	};
	// console.log(priceModal.priceCards);
	return (
		<div className="flex min-h-[665px] items-center justify-center gap-10">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="priceCard" direction="horizontal">
					{(provided, snapshot) => (
						<section
							{...provided.droppableProps}
							ref={provided.innerRef}
							//style={getListStyle(snapshot.isDraggingOver)}
							className="flex flex-nowrap justify-center gap-10"
						>
							{!priceModal.priceCards
								? null
								: priceModal.priceCards.map((card, index) => (
										<Draggable
											key={card.id}
											draggableId={card.id}
											index={index}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<PriceCard cardIndex={index} color={colorInfoEl} />
												</div>
											)}
										</Draggable>
								  ))}
							{provided.placeholder}
						</section>
					)}
				</Droppable>
			</DragDropContext>
			{priceModal.priceCards.length > 3 ? null : (
				<button type="button" onClick={handleAddCard}>
					<AddCardButton color={colorInfoEl} />
				</button>
			)}
		</div>
	);
}

export default PriceCardBox;
