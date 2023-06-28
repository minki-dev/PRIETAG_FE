import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { ChartDateType } from '@/constants/chart';



export interface TemplateByVersion {
	[key: string]: string | number | boolean;
	id: number;
	publishDate: string;
	versionName: string;
	isDeleted: boolean;
	viewCount: number;
	leaveCount: number;
	conversionRate: number;
	isPublished: boolean;
}

export interface TemplateByDate {
	[key: string]: string | number;
	label: string;
	viewCount: number;
	leaveCount: number;
	conversionRate: number;
}

export interface VersionListDataType extends TemplateByVersion {
	index: number;
}

type DashboardState = {
	dateBy: ChartDateType;
	selectedDate: string;
	chartDataByDate: TemplateByDate[]
	chartDataByVersion: {
		versionListData: VersionListDataType[];
		pageInfo: { currentPage: number; maxPage: number };
	}
};

const initialState: DashboardState = {
	dateBy: 'WEEK',
	selectedDate: new Date().toLocaleDateString(),
	chartDataByDate: [],
	chartDataByVersion: {
		versionListData: [],
		pageInfo: {
			currentPage: 0,
			maxPage: 0,
		},
	}
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		updateVersionListData: (
			state: DashboardState,
			action: PayloadAction<VersionListDataType[]>,
		) => {
			state.chartDataByVersion.versionListData = action.payload;
		},

		updateDateBy: (
			state: DashboardState,
			action: PayloadAction<ChartDateType>,
		) => {
			state.dateBy = action.payload;
		},
		selectDate: (state: DashboardState, action: PayloadAction<string>) => {
			state.selectedDate = action.payload;
		},
		updatePageInfo: (
			state: DashboardState,
			action: PayloadAction<{ currentPage: number; maxPage: number }>,
		) => {
			state.chartDataByVersion.pageInfo = action.payload;
		},
	},
});

export const {
	updateVersionListData,
	updateDateBy,
	selectDate,
	updatePageInfo,
} = dashboardSlice.actions;

export function useDashboard() {
	const dashboardState = useSelector((state: RootState) => state.dashboard);
	const dispatch = useDispatch();

	return {
		dashboardState,
		dispatch,
	};
}

export default dashboardSlice.reducer;
