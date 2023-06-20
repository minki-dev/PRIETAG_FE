'use client';

import OuterPaddingBox from '@/components/ResizablePaddingBox';
import { BOX_PROPERTY, PaddingType } from '@/constants/box';
import { useConfig } from '@/store/slice/configSlice';
import Image from 'next/image';
import React, { useState } from 'react';

type PropsType = {
	type: PaddingType;
	onAction: (height: number) => void;
};

function ResizablePaddingWithHandle({ onAction, type }: PropsType) {
	const { configState } = useConfig();
	const { isPreview } = configState;
	const { minHeight } = BOX_PROPERTY.PADDING[type];

	const heightState = useState<number>(minHeight);
	return (
		<div className="relative w-full border-2 border-transparent group hover:border-black">
			<div
				className={`draggable-handle flex flex-col items-center gap-1 ${
					!isPreview
						? 'group-hover:-translate-x-11 group-hover:opacity-100'
						: ''
				} `}
			>
				<div className="relative">
					<div className="absolute -top-5 right-[50%] w-9 translate-x-[50%] text-center text-xs shadow-md">
						{Math.floor(heightState[0])}px
					</div>
					{type === 'inner' && (
						<Image
							width={24}
							height={24}
							src={'/icons/drag_vert.svg'}
							alt="drag handle svg image"
						/>
					)}
				</div>
			</div>

			<OuterPaddingBox
				type={type}
				heightState={heightState}
				onAction={onAction}
			/>
		</div>
	);
}

export default ResizablePaddingWithHandle;
