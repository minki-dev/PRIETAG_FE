'use client';
import React, { useEffect, useRef } from 'react';
import AddCardButton from './AddCardButton';
import PriceCard from './PriceCard';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/app/helpers/StrictModeDroppable';
import {
	addPriceCard,
	changeOrderPriceCard,
	usePriceModal,
	updateCardMaxHeight,
} from '@/store/slice/priceModalSlice';
import {
	addColumn,
	swapColumns,
	useFeatureTable,
} from '@/store/slice/featureTableSlice';
import { useConfig } from '@/store/slice/configSlice';

/* 테스트용 스타일 */
// const getListStyle = (isDraggingOver: any) => ({
// 	background: isDraggingOver ? 'lightblue' : 'white',
// 	display: 'flex',
// 	overflow: 'auto',
// });

function PriceCardBox() {
	const { priceModal, dispatch: priceModalDispatch } = usePriceModal();
	const { dispatch: featureTableDispatch } = useFeatureTable();
	const { configState } = useConfig();
	const { isPreview, previewMode, color } = configState;

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

	const handleAddCard = () => {
		if (priceModal.priceCards.length > 3) return;

		priceModalDispatch(addPriceCard());
		featureTableDispatch(addColumn());
	};
	// console.log(priceModal.priceCards);
	const cardBoxHeightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isPreview && cardBoxHeightRef.current) {
			priceModalDispatch(
				updateCardMaxHeight(cardBoxHeightRef.current.scrollHeight),
			);
		}
	}, [isPreview]);
	return (
		<div
			className={`${
				isPreview ? 'editable-inner-preview' : 'editable-inner'
			} flex min-h-[535px] items-center justify-center gap-10`}
			ref={cardBoxHeightRef}
		>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="priceCard" direction="horizontal">
					{(provided, snapshot) => (
						<section
							{...provided.droppableProps}
							ref={provided.innerRef}
							//style={getListStyle(snapshot.isDraggingOver)}
							className={`responsiveCardBoxLayout  flex flex-nowrap justify-center ${
								previewMode === 'tablet'
									? 'gap-7'
									: previewMode === 'mobile'
									? 'flex-col'
									: 'grid-cols-4 gap-10'
							} 
							`}
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
													//{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<PriceCard
														cardIndex={index}
														color={color}
														provided={provided}
													/>
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
					<AddCardButton />
				</button>
			)}
		</div>
	);
}

export default PriceCardBox;
