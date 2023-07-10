import React from 'react';
import Table from './Table';
import { useFeatureTable } from '@/store/slice/featureTableSlice';
import DraggableArea from '../DraggableArea';
import { v4 as uuid } from 'uuid';
import { useConfig } from '@/store/slice/configSlice';

export default function TableContainer() {
	const { featureTableState } = useFeatureTable();
	const { configState } = useConfig();
	const { isPreview, previewMode } = configState;
	//  Data fetching required in order to initialize table
	return (
		<section
			className={`${
				isPreview ? 'editable-outer-preview' : 'editable-outer'
			} responsiveTable ${
				previewMode === 'tablet'
					? 'overflow-x-auto'
					: previewMode === 'mobile'
					? 'overflow-x-auto'
					: ''
			}`}
		>
			<DraggableArea areaType="tableArea" />
			{featureTableState.featureTableList.map((featureTable, index) => {
				return (
					<Table {...featureTable} key={uuid()} featureTableIndex={index} />
				);
			})}
		</section>
	);
}
