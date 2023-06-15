import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';

type ConfigState = {
	isPreview: boolean;
	color: Colors;
	font: string;
};

type Colors = {
	mainColor: string;
	subColor01: string;
	subColor02: string;
};

type ConfigPayload = {
	
};

const initialState: ConfigState = {
	isPreview: false,
	color: {
		mainColor: '#00A3FF',
		subColor01: '#60C8FF',
		subColor02: '#EAF8FF',
	},
	font: '',
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		togglePreview: (
			state: ConfigState
		) => {
			return { ...state, isPreview: !state.isPreview };
		},

		save: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},
		autoSave: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},

		setFont: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},

		setColor: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},
		publish: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},

		restore: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},
		forward: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return { ...state };
		},
	},
});

export const {
	togglePreview,
	save,
	autoSave,
	setFont,
	setColor,
	publish,
	restore,
	forward,
} = configSlice.actions;

export function useConfig() {
	const configState = useSelector((state: RootState) => state.config);
	const dispatch = useDispatch();

	return {
		configState,
		dispatch,
	};
}

export default configSlice.reducer;
