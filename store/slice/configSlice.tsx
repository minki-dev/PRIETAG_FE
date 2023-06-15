import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';


type ConfigState = { isPreview: boolean,  isSaved: false};

type ConfigPayload = {
	isPreview: boolean;
};

const initialState: ConfigState = {
	isPreview: false,
	isSaved: false
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		togglePreview: (
			state: ConfigState,
			action: PayloadAction<ConfigPayload>,
		) => {
			return { ...state, isPreview: !action.payload.isPreview };
		},

	},
});

export const {} = configSlice.actions;

export function useConfig() {
	const configState = useSelector((state: RootState) => state.config);
	const dispatch = useDispatch();

	return {
		configState,
		dispatch,
	};
}

export default configSlice.reducer;
