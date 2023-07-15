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
	previewMode: string;
};

const PreviewMode = {
	Desktop: 'desktop',
	Tablet: 'tablet',
	Mobile: 'mobile',
};

export type Colors = {
	mainColor: string;
	subColor01: string;
	subColor02: string;
	fontColor: string;
};

type ConfigPayload = {
	color: Colors;
	font: string;
};

const initialState: ConfigState = {
	isColorModalOpen: false,
	isPriceModalOpen: false,
	isUploadModalOpen: false,
	isOnboardingModalOpen: false,
	isPreview: false,
	previewMode: PreviewMode.Desktop,
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
			// console.log('toggleColorModal');
			return { ...state, isColorModalOpen: !state.isColorModalOpen };
		},
		toggleUploadModal: (state: ConfigState) => {
			return { ...state, isUploadModalOpen: !state.isUploadModalOpen };
		},
		toggleOnBoardingModal: (state: ConfigState) => {
			// PriceModal UploadModal ColorModal의 isOpen값을 모두 변경
			state.isOnboardingModalOpen = !state.isOnboardingModalOpen;
			return state;
		},

		// 미리보기 모드 변경
		setPreviewMode: (state: ConfigState, action: PayloadAction<string>) => {
			state.previewMode = action.payload;
			return state;
		},
		save: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},
		autoSave: (state: ConfigState, action: PayloadAction<ConfigPayload>) => {
			return state;
		},

		setFont: (state: ConfigState, action: PayloadAction<Pick<ConfigPayload, 'font'>>) => {
			const { font } = action.payload
			state.font = font
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
	setPreviewMode,
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
	toggleUploadModal,
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
