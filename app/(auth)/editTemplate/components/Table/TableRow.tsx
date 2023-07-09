import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {
	defaultValue: string;
	isPreview: boolean;
	rowIndex: number;
	colIndex: number;
  handleChange: (value: string, colIndex: number, rowIndex: number) => void
};

export default function TableRow({
	defaultValue,
	isPreview,
	rowIndex,
	colIndex,
  handleChange,
}: Props) {
	
	return (
		<input
			defaultValue={defaultValue}
			key={uuid()}
			placeholder={`${
				!isPreview
					? '값을 입력해주세요' + (colIndex !== 0 ? '(공란 가능)' : '')
					: ''
			}`}
			disabled={isPreview}
			onBlur={(e) => {
				
				handleChange(e.target.value, colIndex, rowIndex);
			}}
			className={`h-10 flex-grow border-2 border-dashed p-2 focus:outline-none disabled:bg-transparent ${
				!isPreview ? 'border-gray-500' : 'border-transparent'
			} ${colIndex === 0 ? '' : 'text-center'}`}
		/>
	);
}
