import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';



const getInitialTable = (cols: number):featureTable => {
	return {
		featureHeader: true,
		featureName: true,
		featureNameValue: '',
		table: [
			Array.from({length: cols}, content => (""))
		],
	};
}

export type featureTable = {
	featureHeader: boolean;
	featureName: boolean;
	featureNameValue: string;
	table: string[][];
};

type featureTableState = {
	featureTableList: featureTable[];
};

type featureTablePayload = {
	featureTableIndex: number;
	tableData: string;
};

type ColumnActionPayload = {
	colIndex: number;
	to: number;
} & featureTablePayload;

type RowActionPayload = {
	rowIndex: number;
} & featureTablePayload;

type featureLabelPayload = {
	featureTableIndex: number;
	featureNameValue: string;
};

const initialState: featureTableState = {
	featureTableList: [getInitialTable(2)]
};

export const featureTableSlice = createSlice({
	name: 'featureTable',
	initialState,
	reducers: {
		initTableByCardsQty: (
			state: featureTableState,
			action: PayloadAction<featureTable[]>,
		) => {
			action.payload.forEach((featureTable, index) => {
				state.featureTableList[index] = featureTable;
			});
		},

		resetFeatureTable: (state: featureTableState, action: PayloadAction<number>) => {
			state.featureTableList = [getInitialTable(action.payload)]
		},
		toggleFeatureHeader: (
			state: featureTableState,
			action: PayloadAction<Pick<featureLabelPayload, 'featureTableIndex'>>,
		) => {
			const { featureTableIndex } = action.payload;
			const targetFeatureTable = state.featureTableList[featureTableIndex];
			targetFeatureTable.featureHeader = !targetFeatureTable.featureHeader;
		},
		toggleFeatureName: (
			state: featureTableState,
			action: PayloadAction<Pick<featureLabelPayload, 'featureTableIndex'>>,
		) => {
			const { featureTableIndex } = action.payload;
			const targetFeatureTable = state.featureTableList[featureTableIndex];
			targetFeatureTable.featureName = !targetFeatureTable.featureName;
		},
		updateFeatureName: (
			state: featureTableState,
			action: PayloadAction<featureLabelPayload>,
		) => {
			const { featureTableIndex, featureNameValue } = action.payload;

			state.featureTableList[featureTableIndex].featureNameValue =
				featureNameValue;
		},

		swapColumns: (
			state: featureTableState,
			action: PayloadAction<Pick<ColumnActionPayload, 'colIndex' | 'to'>>,
		) => {
			const { colIndex, to } = action.payload;
			const initialTable = state.featureTableList[0].table[0];

			if (colIndex < initialTable.length && to < initialTable.length) {
				state.featureTableList.forEach((featureTable) => {
					return featureTable.table.map((row) => {
						const [removed] = row.splice(colIndex + 1, 1);
						row.splice(to + 1, 0, removed);

						return row;
					});
				});
			}
		},

		addColumn: (state: featureTableState) => {
			state.featureTableList.forEach((featureTable) => {
				return featureTable.table.map((row) => row.push(''));
			});
		},

		removeColumn: (
			state: featureTableState,
			action: PayloadAction<Pick<ColumnActionPayload, 'colIndex'>>,
		) => {
			const { colIndex } = action.payload;
			const initialTable = state.featureTableList[0].table;

			if (colIndex <= initialTable.length) {
				state.featureTableList.forEach((featureTable) => {
					 featureTable.table.forEach((row) => {
						row.splice(colIndex + 1, 1)
					})
				})
				}
			},
		addRow: (
			state: featureTableState,
			action: PayloadAction<Pick<RowActionPayload, 'featureTableIndex'> & {qty: number}>,
		) => {
			const { featureTableIndex, qty } = action.payload;

			if (featureTableIndex < 0) return;
			if (featureTableIndex > state.featureTableList.length) return;

			state.featureTableList[featureTableIndex].table.push(
				Array.from({length: qty + 1} , content => (""))
			);
		},
		removeRow: (
			state: featureTableState,
			action: PayloadAction<
				Pick<RowActionPayload, 'featureTableIndex' | 'rowIndex'>
			>,
		) => {
			const { featureTableIndex, rowIndex } = action.payload;

			const targetFeatureTable =
				state.featureTableList[featureTableIndex].table;

			if (featureTableIndex < 0 || rowIndex < 0) return;
			if (featureTableIndex > state.featureTableList.length) return;
			if (rowIndex > targetFeatureTable.length) return;

			targetFeatureTable.splice(rowIndex, 1);
		},
		updateTableData: (
			state: featureTableState,
			action: PayloadAction<
				RowActionPayload & Pick<ColumnActionPayload, 'colIndex'>
			>,
		) => {
			const { rowIndex, colIndex, featureTableIndex, tableData } =
				action.payload;
			state.featureTableList[featureTableIndex].table[rowIndex][colIndex] =
				tableData;
		},
		addTable: (state: featureTableState, action:PayloadAction<number>) => {
			state.featureTableList.push(getInitialTable(action.payload));
		},

		removeTable: (
			state: featureTableState,
			action: PayloadAction<Pick<featureTablePayload, 'featureTableIndex'>>,
		) => {
			const { featureTableIndex } = action.payload;

			if (
				featureTableIndex < 0 ||
				featureTableIndex > state.featureTableList.length
			)
				return;
			state.featureTableList.splice(featureTableIndex, 1);

		},
		
	},
});

export const {
	initTableByCardsQty,
	resetFeatureTable,
	toggleFeatureHeader,
	toggleFeatureName,
	updateFeatureName,
	swapColumns,
	addColumn,
	removeColumn,
	addRow,
	removeRow,
	updateTableData,
	addTable,
	removeTable,
} = featureTableSlice.actions;

export function useFeatureTable() {
	const featureTableState = useSelector(
		(state: RootState) => state.featureTable,
	);
	const dispatch = useDispatch();

	return {
		featureTableState,
		dispatch,
	};
}

export default featureTableSlice.reducer;
