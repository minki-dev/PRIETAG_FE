'use client';

import 'react-resizable/css/styles.css';
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Draggable } from 'react-beautiful-dnd';


type Props = {
	id: string;
	index: number;
	isPreview: boolean;
};

export default function PaddingBox({ id, index, isPreview }: Props) {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(64);
	const handleResize = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		setHeight(size.height);
	};

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					className="relative"
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<div {...provided.dragHandleProps} className='absolute z-10 w-6 h-6 rounded-lg left-1 top-1 bg-sky-200'>{}</div>
					<ResizableBox
						height={Number(height)}
						minConstraints={[width, 64]}
						maxConstraints={[width, 200]}
						width={width}
						onResize={handleResize}
						resizeHandles={isPreview ? [] : ['n', 's']}
						handleSize={[10, 10]}
						className="flex items-center justify-center"
					>
						<span>{isPreview ? '' : '패딩 박스'}</span>
					</ResizableBox>
				</div>
			)}
		</Draggable>
	);
}
