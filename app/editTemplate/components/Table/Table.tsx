'use client';

import DeleteButton from '@/components/DeleteButton';
import { useConfig } from '@/store/slice/configSlice';
import { addRow, removeRow, useTable } from '@/store/slice/tableSlice';
import React, { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { HiOutlineXCircle } from 'react-icons/hi2';
import { v4 as uuid } from 'uuid';

export default function Table() {
	const [cards] = useState(['card1', 'card2', 'card3', 'card4']);
	const [cardIds] = useState([0, 1, 2, 3]);

	const { tableState, dispatch } = useTable();

	const tableByRow = tableState.tableList[0];

	const { configState } = useConfig();
	const { isPreview } = configState;

	const [withHead, setWithHead] = useState<boolean>(true);
	const [featureName, setFeatureName] = useState<boolean>(true);

	const handleAddRow = () => {
		dispatch(addRow({ tableIndex: 0 }));
	};

	const handleDeleteRow = (idx: number) => {
		dispatch(removeRow({ tableIndex: 0, rowIndex: idx }));
	};

	return (
		<div className="editable-inner">
			{withHead && (
				<div className="relative grid grid-cols-5 border-2 border-transparent group gap-x-5 hover:border-black">
					<DeleteButton onClick={() => setWithHead(!withHead)} />
					{cardIds.map((cardId, index) => {
						return (
							<div
								key={uuid()}
								className={`h-10 flex-grow border border-solid p-2 focus:outline-none ${
									!isPreview
										? 'border-transparent bg-gray-300 text-white'
										: 'border-black'
								} ${index === 0 && 'col-start-2'} text-center`}
							>
								{cards[cardId]}
							</div>
						);
					})}
					<div className="col-span-5 mt-6 border-b-2 border-gray">{}</div>
				</div>
			)}
			{featureName && (
				<div className="grid grid-cols-5 gap-x-5">
					<div
						className={`group relative col-span-1 mb-4 ml-[1.5px] mt-4 h-12 border-2 border-dashed border-gray-500 ${
							!isPreview ? 'hover:border-black hover:border-solid' : 'border-transparent'
						}`}
					>
						<DeleteButton onClick={() => setFeatureName(!featureName)} />
						<input
							placeholder="포함된 기능"
							disabled={isPreview}
							className="w-full h-full p-2 focus:outline-none disabled:bg-transparent"
						/>
					</div>
				</div>
			)}
			{tableByRow.map((col, rowIndex) => {
				return (
					<div
						key={uuid()}
						className={` h-16 py-2 ${
							(rowIndex + 1) % 2 === 0 ? 'bg-[#EAF8FF]' : ''
						}`}
					>
						<div
							className={`relative grid grid-cols-5 gap-x-5 border-2 border-transparent ${
								!isPreview && 'hover:border-black'
							} group `}
						>
							<DeleteButton onClick={() => handleDeleteRow(rowIndex)} />
							{col.map((col, colIndex) => {
								return (
									<input
										defaultValue={col}
										key={uuid()}
										placeholder={`값을 입력해주세요 ${
											colIndex !== 0 ? '(공란 가능)' : ''
										}`}
										disabled={isPreview}
										className={`h-10 flex-grow border border-dashed p-2 focus:outline-none disabled:bg-transparent ${
											!isPreview ? 'border-black' : 'border-transparent'
										} ${colIndex === 0 ? '' : 'text-center'}`}
									/>
								);
							})}
						</div>
					</div>
				);
			})}
			{!isPreview && (
				<button
					type="button"
					className="flex items-center justify-center w-full h-16 col-span-5 border"
					onClick={handleAddRow}
				>
					<HiOutlinePlus />
				</button>
			)}
			<div className="col-span-5 mt-3 mb-4 border-b-2 border-gray">{}</div>
		</div>
	);
}
