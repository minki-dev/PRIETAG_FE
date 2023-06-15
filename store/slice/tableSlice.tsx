import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import deepCopy from 'lodash.clonedeep';

type Row = string[];
type Table = Row[];

type TableState = { tableList: Table[] };
type ColumnActionPayload = {
	colIndex: number;
	to?: number;
};

type RowActionPayload = {
	tableIndex: number;
	rowIndex: number;
};

type TablePayload = {
	newTableList: Table[];
};
const initialState: TableState = {
	tableList: [[['', '', '', '', '']]],
};

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		swapColumns: (
			state: TableState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex, to } = action.payload;
			if (
				to &&
				colIndex < state.tableList[0].length &&
				to < state.tableList[0].length
			) {
				const updatedTableList = state.tableList.map((table, i) => {
					if (i !== 0) {
						return table.map(
							(row) =>
								([row[colIndex + 1], row[to + 1]] = [
									row[to + 1],
									row[colIndex + 1],
								]),
						);
					}
				});
				return { ...state, tableList: updatedTableList as Table[] };
			}
			return state;
		},
		addColumn: (
			state: TableState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex } = action.payload;
			if (colIndex < state.tableList[0].length) {
				const updatedTableList = state.tableList.map((table) =>
					table.map((row) => [...row, '']),
				);
				return { ...state, tableList: updatedTableList as Table[] };
			}
			return state;
		},
		removeColumn: (
			state: TableState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex } = action.payload;
			if (colIndex < state.tableList[0].length) {
				const updatedTableList = state.tableList.map((table) =>
					table.map((row) => row.filter((rowData, i) => i !== colIndex + 1)),
				);
				return { ...state, tableList: updatedTableList as Table[] };
			}
			return state;
		},
		addRow: (
			state: TableState,
			action: PayloadAction<Pick<RowActionPayload, 'tableIndex'>>,
		) => {
			const { tableIndex } = action.payload;

			if (tableIndex < 0) return;
			if (tableIndex > state.tableList.length) return;

			const newTableList = deepCopy(state.tableList);
			const newTable = newTableList[tableIndex];

			newTable.push(['', '', '', '', '']);
			// newTable.push([`${Math.random()}`, `${Math.random()}`, `${Math.random()}`, `${Math.random()}`, `${Math.random()}`]);
			newTableList.splice(tableIndex, 1, newTable);
			console.log(newTable)
			return { ...state, tableList: newTableList };
		},
		removeRow: (state: TableState, action: PayloadAction<RowActionPayload>) => {
			const { tableIndex, rowIndex } = action.payload;

			if (tableIndex < 0 || rowIndex < 0) return;
			if (tableIndex > state.tableList.length) return;
			if (rowIndex > state.tableList[tableIndex].length) return

			const newTableList = deepCopy(state.tableList);
			const newTable = newTableList[tableIndex];

			newTable.splice(rowIndex, 1, );
			newTableList.splice(tableIndex, 1, newTable);

			return { ...state, tableList: newTableList };
		},
		updateTableData: (
			state: TableState,
			action: PayloadAction<TablePayload>,
		) => {
			return { ...state, tableList: action.payload.newTableList as Table[] };
		},
	},
});

export const {
	swapColumns,
	addColumn,
	removeColumn,
	addRow,
	removeRow,
	updateTableData,
} = tableSlice.actions;

export function useTable() {
	const tableState = useSelector((state: RootState) => state.table);
	const dispatch = useDispatch();

	return {
		tableState,
		dispatch,
	};
}

export default tableSlice.reducer;
