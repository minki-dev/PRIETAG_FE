'use client';

import React, { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { HiOutlineXCircle } from 'react-icons/hi2';

export default function Chart() {
	const [cards, setCards] = useState(['card1', 'card2', 'card3', 'card4']);
	const [cardIds, setCardIds] = useState([0, 1, 2, 3]);
	const [chartByRow, setChartByRow] = useState<Array<string[]>>([
		['', '', '', '', ''],
	]);
	const [chartByColumn, setChartByColumn] = useState<Array<string[]>>([
		['', '', '', '', ''],
	]);
	const [isPreview, setIsPreview] = useState<boolean>(false);
	const [withHead, setWithHead] = useState<boolean>(true);
	const handleAddRow = () => {
		setChartByRow((prev) => {
			const initialRow = Array.from({ length: cardIds.length + 1 }, () => '');
			const newRow = [...prev, initialRow];
			return newRow;
		});
	};

	const handleDeleteRow = (idx: number) => {
		setChartByRow((prev) => {
			return prev.filter((_, index) => index !== idx);
		});
	};

	return (
		<div>
			{withHead && (
				<div className="relative grid grid-cols-5 border-2 border-transparent gap-x-5 group hover:border-black">
					<button
						type="button"
						onClick={() => setWithHead((prev) => !prev)}
						className="absolute hidden bg-white rounded-full -right-2 -top-2 group-hover:block"
					>
						<HiOutlineXCircle className='w-[26px] h-[26px] ' />
					</button>
					{cardIds.map((cardId, index) => {
						return (
							<div
								className={`  h-10 flex-grow focus:outline-none p-2 border border-solid ${
									!isPreview ? 'border-transparent bg-gray-300 text-white' : 'border-black'
								} ${index === 0 && 'col-start-2'} text-center`}
							>
								{cards[cardId]}
							</div>
						);
					})}
					<div className="col-span-5 mt-6 border-b-2 border-gray">{}</div>
				</div>
			)}
			<div className="grid grid-cols-5 gap-x-5">
				<input
					placeholder="포함된 기능"
					disabled={isPreview}
					className={`disabled:bg-transparent mt-4 mb-4 h-12 ml-[1.5px] flex-grow focus:outline-none p-2 border border-dashed ${
						!isPreview ? 'border-black' : 'border-transparent'
					}`}
				/>
			</div>
			{chartByRow.map((col, idx) => {
				return (
					<div
						className={`py-2 h-16 ${(idx + 1) % 2 === 0 ? 'bg-[#EAF8FF]' : ''}`}
					>
						<div
							className={`grid grid-cols-5 gap-x-5 relative border-2 border-transparent ${
								!isPreview && 'hover:border-black'
							} group `}
						>
							<button
								type="button"
								onClick={() => handleDeleteRow(idx)}
								className="absolute hidden bg-white rounded-full -right-2 -top-2 group-hover:block"
							>
								<HiOutlineXCircle className='w-[26px] h-[26px]' />
							</button>
							{col.map((row, idxr) => {
								return (
									<input
										placeholder={`값을 입력해주세요 ${idxr !== 0 ? "(공란 가능)" : ""}`}
										disabled={isPreview}
										className={`disabled:bg-transparent h-10 flex-grow focus:outline-none p-2 border border-dashed ${
											!isPreview ? 'border-black' : 'border-transparent'
										} ${idxr === 0 ? '' : 'text-center'}`}
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
			<button type="button" onClick={() => setIsPreview((prev) => !prev)}>
				Edit toggle
			</button>
		</div>
	);
}
