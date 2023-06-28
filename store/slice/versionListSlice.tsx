import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '..';
import { TemplateByVersion } from './dashboardSlice';

import { enableMapSet } from 'immer';

export type CheckType = 'BASE' | 'TARGET';

enableMapSet();

type VersionListState = {
	baseVersion: TemplateByVersion | null;
	targetVersion: TemplateByVersion | null;
	versionListChecks: Map<number, { type: CheckType; checked: boolean }>;
};

const initialState: VersionListState = {
	baseVersion: null,
	targetVersion: null,
	versionListChecks: new Map(),
};

export const versionListSlice = createSlice({
	name: 'versionList',
	initialState,
	reducers: {
		selectVersion: (
			state: VersionListState,
			action: PayloadAction<{
				data: TemplateByVersion;
				id: number;
				type: CheckType;
			}>,
		) => {
			const { data, id, type } = action.payload;
			state.versionListChecks.set(id, { type, checked: true });
			type === 'BASE'
				? (state.baseVersion = data)
				: (state.targetVersion = data);
		},

		unselectVersion: (
			state: VersionListState,
			action: PayloadAction<{ id: number; type: CheckType }>,
		) => {
			const { id, type } = action.payload;
			state.versionListChecks.delete(id);
			type === 'BASE'
				? (state.baseVersion = null)
				: (state.targetVersion = null);
		},
	},
});

export const { selectVersion, unselectVersion } = versionListSlice.actions;

export function useVersionList() {
	const versionListState = useSelector((state: RootState) => state.versionList);
	const dispatch = useDispatch();

	return {
		versionListState,
		dispatch,
	};
}

export default versionListSlice.reducer;
