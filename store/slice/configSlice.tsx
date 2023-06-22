import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';

type ConfigState = {
	isColorModalOpen: boolean;
	isPriceModalOpen: boolean;
	isUploadModalOpen: boolean;
	isOnboardingModalOpen: boolean;
	isPreview: boolean;
	color: Colors;
	font: string;
};

export type Colors = {
	mainColor: string;
	subColor01: string;
	subColor02: string;
	fontColor: string;
};

type ConfigPayload = {
	color: Colors;
	font: String;
};

const initialState: ConfigState = {
	isColorModalOpen: false,
	isPriceModalOpen: false,
	isUploadModalOpen: false,
	isOnboardingModalOpen: false,
	isPreview: false,
	color: {
		mainColor: '#00A3FF',
		subColor01: '#60C8FF',
		subColor02: '#EAF8FF',
		fontColor: '#000000',
	},
	font: '',
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		togglePreview: (state: ConfigState) => {
			return { ...state, isPreview: !state.isPreview };
		},
		togglePriceModal: (state: ConfigState) => {
			return { ...state, isPriceModalOpen: !state.isPriceModalOpen };
		},
		toggleColorModal: (state: ConfigState) => {
			console.log('toggleColorModal');
			return { ...state, isColorModalOpen: !state.isColorModalOpen };
		},
		toggleOnBoardingModal: (state: ConfigState) => {
			// PriceModal UploadModal ColorModal의 isOpen값을 모두 변경
			state.isOnboardingModalOpen = !state.isOnboardingModalOpen;
			return state;
		},

		save: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},
		autoSave: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},

		setFont: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},

		setColor: (
			state: ConfigState,
			action: PayloadAction<Pick<ConfigPayload, 'color'>>,
		) => {
			const { color } = action.payload;
			state.color = color;
			return state;
		},
		publish: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},

		restore: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},
		forward: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
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
	togglePriceModal,
	toggleColorModal,
	toggleOnBoardingModal,
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
