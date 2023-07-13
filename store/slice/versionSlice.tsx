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
	totalPage: number
}

const initialState: VersionHistoryState = {
	versions: [],
	currentPage: 0,
	itemsPerPage: 9,
	isAllChecked: false,
	havePublish: false,
	totalPage: 0
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
			if (state.isAllChecked ) {
				state.versions.forEach(version => version.isChecked = false)
				state.isAllChecked = false
			}
			else {
				state.versions.forEach(version => version.isChecked = true)
				state.isAllChecked = true
			}
		}
	},
});
export const { deleteItem, setCurrentPage, setVersions, filterByKeyword, toggleVersion, checkAllVersions } =
	versionSlice.actions;

export default versionSlice.reducer;
