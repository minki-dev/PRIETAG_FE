import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { getInitialBoxList } from '@/constants/box';

type Row = string[];
type Chart = Row[];

type ChartState = { chartList: Chart[] };
type ColumnActionPayload = {
	colIndex: number;
	to?: number;
};

type RowActionPayload = {
	chartIndex: number;
	rowIndex?: number;
};

type ChartPayload = {
	newChartList: Chart[]
}
const initialState: ChartState = {
	chartList: [[['']]],
};

export const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		swapColumns: (
			state: ChartState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex, to } = action.payload;
			if (
				to &&
				colIndex < state.chartList[0].length &&
				to < state.chartList[0].length
			) {
				const updatedChartList = state.chartList.map((chart, i) => {
					if (i !== 0) {
						return chart.map(
							(row) =>
								([row[colIndex + 1], row[to + 1]] = [
									row[to + 1],
									row[colIndex + 1],
								]),
						);
					}
				});
				return { ...state, chartList: updatedChartList as Chart[] };
			}
			return state;
		},
		addColumn: (
			state: ChartState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex } = action.payload;
			if (colIndex < state.chartList[0].length) {
				const updatedChartList = state.chartList.map((chart) =>
					chart.map((row) => [...row, '']),
				);
				return { ...state, chartList: updatedChartList as Chart[] };
			}
			return state;
		},
		removeColumn: (
			state: ChartState,
			action: PayloadAction<ColumnActionPayload>,
		) => {
			const { colIndex } = action.payload;
			if (colIndex < state.chartList[0].length) {
				const updatedChartList = state.chartList.map((chart) =>
					chart.map((row) => row.filter((rowData, i) => i !== colIndex + 1)),
				);
				return { ...state, chartList: updatedChartList as Chart[] };
			}
			return state;
		},
		addRow: (state: ChartState, action: PayloadAction<RowActionPayload>) => {
			const { chartIndex } = action.payload;
			if (
				chartIndex &&
				chartIndex <= state.chartList.length
			) {
        const chart = state.chartList[chartIndex]
        const updatedChart = [...chart, ["", "", "", "", ""]]
        const updatedChartList = state.chartList.splice(chartIndex, 1, updatedChart)
        return { ...state, chartList: updatedChartList as Chart[]}
			}
      return state
		},
		removeRow: (
			state: ChartState,
			action: PayloadAction<RowActionPayload>,
		) => {
      const { chartIndex, rowIndex } = action.payload;
			if (
				chartIndex &&
				rowIndex &&
				chartIndex <= state.chartList.length &&
				rowIndex < state.chartList[0].length
			) {
        const chart = state.chartList[chartIndex]
        const updatedChart = chart.filter((_, i) => i !== rowIndex)
        const updatedChartList = state.chartList.splice(chartIndex, 1, updatedChart)
        return { ...state, chartList: updatedChartList as Chart[]}
			}
			return state
    },
		updateChartData: (state: ChartState, action: PayloadAction<ChartPayload>) => {
			return { ...state, chartList: action.payload.newChartList as Chart[] }
		}
	},
});

export const { swapColumns, addColumn, removeColumn, addRow, removeRow, updateChartData } = chartSlice.actions;

export function useChart() {
	const chartState = useSelector((state: RootState) => state.chart);
	const dispatch = useDispatch();

	return {
		chartState,
		dispatch,
	};
}

export default chartSlice.reducer;
