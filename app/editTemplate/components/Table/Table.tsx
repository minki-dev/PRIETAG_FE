'use client';

import DeleteButton from '@/components/DeleteButton';
import { ModalTypes } from '@/components/modal/ModalState';
import { useConfig } from '@/store/slice/configSlice';
import { openModal, useModal } from '@/store/slice/modalSlice';
import {
	addRow,
	removeRow,
	removeTable,
	updateTableData,
	toggleFeatureHeader,
	updateFeatureName,
	useFeatureTable,
	toggleFeatureName,
} from '@/store/slice/featureTableSlice';
import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { v4 as uuid } from 'uuid';
import TableRow from './TableRow';
import { usePriceCard } from '@/store/slice/priceCardSlice';

type TablePropsType = {
	featureTableIndex: number;
	featureHeader: boolean;
	featureName: boolean;
	featureNameValue: string;
	table: string[][];
};

export default function Table({
	featureTableIndex,
	featureHeader,
	featureName,
	featureNameValue,
	table,
}: TablePropsType) {
	// @Redux priceCard
	const { priceCard: priceCardState } = usePriceCard();

	// @Redux featureTable
	const { featureTableState, dispatch: tableDispatch } = useFeatureTable();

	// @Redux modal
	const { dispatch: modalDispatch } = useModal();

	// @Redux config
	const { configState } = useConfig();
	const { isPreview, previewMode } = configState;

	//	toggle state's featureHeader boolean by featureTableIndex
	const toggleHeader = () => {
		tableDispatch(toggleFeatureHeader({ featureTableIndex }));
	};

	//	toggle state's featureName boolean by featureTableIndex
	const toggleName = () => {
		tableDispatch(toggleFeatureName({ featureTableIndex }));
	};

	//	set(update) state's featureName by featureTableIndex
	const setFeatureName = (featureNameValue: string) => {
		tableDispatch(updateFeatureName({ featureTableIndex, featureNameValue }));
	};

	//	add row on current table
	const handleAddRow = () => {
		tableDispatch(addRow({ featureTableIndex }));
	};

	// remove row on current table
	const handleDeleteRow = (idx: number) => {
		tableDispatch(removeRow({ featureTableIndex, rowIndex: idx }));
	};

	//	remove this component, resets after modal confirm click
	const handleTableRemove = () => {
		if (featureTableState.featureTableList.length <= 1) {
			modalDispatch(openModal(ModalTypes.DetailedFunctionContainerDelModal));
			return;
		}
		tableDispatch(removeTable({ featureTableIndex }));
	};

	//	update target data to state by rowIndex, colIndex, featureTableIndex
	const handleDataChange = (
		value: string,
		colIndex: number,
		rowIndex: number,
	) => {
		tableDispatch(
			updateTableData({
				featureTableIndex,
				rowIndex,
				colIndex,
				tableData: value,
			}),
		);
	};

	return (
		<div
			className={`${
				isPreview
					? 'editable-inner-preview border-transparent'
					: 'group/table editable-inner hover:border-black'
			}  relative  flex w-[1656px] ${
				previewMode === 'tablet'
					? 'justify-start'
					: previewMode === 'mobile'
					? 'justify-start'
					: 'justify-center'
			} 
			 mobile-xl:justify-start border-2 max-xl:justify-start `}
		>
			<DeleteButton
				className="group-hover/table:block"
				onClick={handleTableRemove}
			/>

			<div className="">
				{featureHeader && (
					<div
						className={`${
							!isPreview && 'group/header hover:border-black'
						} relative flex items-center justify-end border-2  border-transparent`}
					>
						<DeleteButton
							className="group-hover/header:block"
							onClick={toggleHeader}
						/>
						{priceCardState.priceCards.map((card) => {
							return (
								<div
									key={uuid()}
									className={`${
										!isPreview ? ' bg-gray-300 text-white' : ''
									} prevent-text-overflow h-10 w-tableData p-2 pl-6 text-center xl:w-tableDataTablet 2xl:w-tableDataPc`}
								>
									{card.title}
								</div>
							);
						})}
						<div className="border-gray col-span-5 mt-6 border-b-2">{}</div>
					</div>
				)}
				{featureName && (
					<div className="grid grid-cols-5 gap-x-5 ">
						<div
							className={`relative  mb-4 ml-[1.5px] mt-4 h-12 border-2 border-dashed border-gray-500 ${
								!isPreview
									? 'group/featureName hover:border-solid hover:border-black'
									: 'border-transparent'
							}`}
						>
							<DeleteButton
								className="group-hover/featureName:block"
								onClick={toggleName}
							/>
							<input
								defaultValue={featureNameValue}
								placeholder={`${!isPreview ? '포함된 기능' : ''}`}
								disabled={isPreview}
								onBlur={(e) => setFeatureName(e.target.value)}
								className="h-full w-full p-2 focus:outline-none disabled:bg-transparent"
							/>
						</div>
					</div>
				)}
				{table.map((row, rowIndex) => {
					return (
						<div
							key={uuid()}
							className={` h-16 py-2 ${
								(rowIndex + 1) % 2 === 0 ? 'bg-[#EAF8FF]' : ''
							}`}
						>
							<div
								className={`relative grid grid-cols-5 gap-x-5 border-2 border-transparent ${
									!isPreview && 'group/row hover:border-black'
								}`}
							>
								<DeleteButton
									className="group-hover/row:block"
									onClick={() => handleDeleteRow(rowIndex)}
								/>
								{row.map((data, dataColIndex) => {
									return (
										<TableRow
											defaultValue={data}
											rowIndex={rowIndex}
											isPreview={isPreview}
											colIndex={dataColIndex}
											handleChange={handleDataChange}
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
						className="col-span-5 flex h-16 w-full items-center justify-center border"
						onClick={handleAddRow}
					>
						<HiOutlinePlus />
					</button>
				)}
			</div>
			<div className="border-gray col-span-5 mb-4 mt-3 border-b-2">{}</div>
		</div>
	);
}
