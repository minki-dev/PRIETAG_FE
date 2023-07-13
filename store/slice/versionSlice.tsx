import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type VersionHistoryType = {
	id: number;
	version: number;
	title: string;
	updated_at: string;
	_publishing: boolean;
	isChecked: boolean
};

export interface VersionHistoryState {
	versions: VersionHistoryType[]
	currentPage: number
	itemsPerPage: number
	isAllChecked: boolean
	havePublish: boolean
}

const initialState: VersionHistoryState = {
	versions: [
		{
			id: 1,
			title: '2030 프리미엄 요금제 최종본',
			updated_at: '2023.06.28.15:00',
			version: 25,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 2,
			title: '2030 프리미엄 최종_최종_최종_최종_4',
			updated_at: '2023.06.27.14:20',
			version: 24,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 3,
			title: '2030 프리미엄 최종_최종_최종_최종_3',
			updated_at: '2023.06.27.11:10',
			version: 23,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 4,
			title: '2030 프리미엄 최종_최종_최종_최종_2',
			updated_at: '2023.06.27.11:10',
			version: 22,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 5,
			title: '2030 프리미엄_스탠다드_최종본',
			updated_at: '2023.06.26.01:19',
			version: 21,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 6,
			title: '타이틀 수정',
			updated_at: '2023.06.14.15:43',
			version: 20,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 7,
			title: '2030 프리미엄 컬러 수정본',
			updated_at: '2023.06.09.14:20',
			version: 19,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 8,
			title: '2030 프리미엄 최종본 수정',
			updated_at: '2023.06.05.05:14',
			version: 18,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 9,
			title: '2030 프리미엄 확정_최종본',
			updated_at: '2023.06.01.18:21',
			version: 17,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 10,
			title: '2030 프리미엄 확정',
			updated_at: '2023.05.29.11:10',
			version: 16,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 11,
			title: '2030 프리미엄 요금제 최종본',
			updated_at: '2023.05.28.15:00',
			version: 15,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 12,
			title: '2030 프리미엄_수정',
			updated_at: '2023.05.21.09:18',
			version: 14,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 13,
			title: '2030 프리미엄',
			updated_at: '2023.05.20.11:10',
			version: 13,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 14,
			title: '2030 프리미엄 가제',
			updated_at: '2023.05.19.21:31',
			version: 12,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 15,
			title: '2030 프리미엄 블루_시안_2',
			updated_at: '2023.05.18.21:10',
			version: 11,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 16,
			title: '프리미엄 블루_수정안',
			updated_at: '2023.05.18.15:00',
			version: 10,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 17,
			title: '프리미엄 레드_수정안',
			updated_at: '2023.05.14.14:20',
			version: 9,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 18,
			title: '프리미엄 옐로 요금제',
			updated_at: '2023.05.13.09:10',
			version: 8,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 19,
			title: '프리미엄 블루 요금제',
			updated_at: '2023.05.11.12:35',
			version: 7,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 20,
			title: '프리미엄 레드 요금제',
			updated_at: '2023.05.10.07:10',
			version: 6,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 21,
			title: '프리미엄 요금제_1',
			updated_at: '2023.05.08.11:00',
			version: 5,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 22,
			title: '요금제 프리미엄 가제',
			updated_at: '2023.05.02.14:20',
			version: 4,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 23,
			title: '요금제 수정_1',
			updated_at: '2023.05.01.09:24',
			version: 3,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 24,
			title: '요금제 변경안',
			updated_at: '2023.04.28.08:10',
			version: 2,
			_publishing: false,
			isChecked: false,
		},
		{
			id: 25,
			title: '기본 요금제 가제',
			updated_at: '2023.04.07.11:11',
			version: 1,
			_publishing: false,
			isChecked: false,
		},
	],
	currentPage: 0,
	itemsPerPage: 9,
	isAllChecked: false,
	havePublish: false
};

const versionSlice = createSlice({
	name: 'version',
	initialState,
	reducers: {
		deleteItem: (state, action) => {
			const itemId = action.payload;
			state.versions = state.versions.filter((item) => item.id !== itemId);
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setVersions: (state, action) => {
			state.versions = action.payload;
		},

		filterByKeyword: (state, action) => {
			const keyword = action.payload;
			if (keyword) {
				const filteredVersions = state.versions.filter((version) =>
					version.title.includes(keyword),
				);
				return { ...state, versions: filteredVersions };
			}
		},

		toggleVersion: (state: VersionHistoryState, action: PayloadAction<Pick<VersionHistoryType, 'id'>>) => {
			const { id } = action.payload
			const targetVersionIndex = state.versions.findIndex(version => version.id === id)
			const targetVersionCheck = state.versions[targetVersionIndex].isChecked
			state.versions[targetVersionIndex].isChecked = !targetVersionCheck
			const isAllChecked = state.versions.every(version => version.isChecked === true)
			state.isAllChecked = isAllChecked
			
		},
		checkAllVersions: (state: VersionHistoryState) => {
			state.versions.forEach(version => version.isChecked = true)
			state.isAllChecked = true
		}
	},
});
export const { deleteItem, setCurrentPage, setVersions, filterByKeyword, toggleVersion, checkAllVersions } =
	versionSlice.actions;

export default versionSlice.reducer;
