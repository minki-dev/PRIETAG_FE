import { BOX_PROPERTY, PaddingType } from '@/constants/box';
import { useConfig } from '@/store/slice/configSlice';
import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';

type PropsType = {
	type: PaddingType;
	heightState: [number, React.Dispatch<React.SetStateAction<number>>];
	onAction: (height: number) => void;
};

export default function ResizablePaddingBox({
	type,
	heightState,
	onAction,
}: PropsType) {
	const heightRange = BOX_PROPERTY.PADDING[type];
	const { configState } = useConfig();
	const { isPreview } = configState;

	const [width, setWidth] = useState<number>(0);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleResize = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		const flooredHeight = Math.floor(size.height);
		onAction(flooredHeight);
	};

	const handleDisplayHeight = (
		e: React.SyntheticEvent,
		{ size }: ResizeCallbackData,
	) => {
		if (size.height !== heightState[0]) {
			heightState[1](size.height);
		}
	};

	useEffect(() => {
		const handleWindowResize = () => {
			if (wrapperRef.current) {
				setWidth(wrapperRef.current.getBoundingClientRect().width);
			}
		};
		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);
	return (
		<div ref={wrapperRef}>
			<ResizableBox
				height={heightState[0]}
				lockAspectRatio={true}
				onResizeStop={handleResize}
				minConstraints={[width, heightRange.minHeight]}
				maxConstraints={[width, heightRange.maxHeight]}
				width={width}
				onResize={handleDisplayHeight}
				resizeHandles={isPreview ? [] : ['s']}
				handleSize={[10, 10]}
			></ResizableBox>
		</div>
	);
}
