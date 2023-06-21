import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface UploadModalState {
	formData: FormData;
}

const initialState: UploadModalState = {
	formData: new FormData(),
};

export const uploadModalSlice = createSlice({
	name: 'uploadModal',
	initialState,
	reducers: {
		setFormData: (state, action) => {
			state.formData = action.payload;
		},
	},
});

export const { setFormData } = uploadModalSlice.actions;

export function useUploadModal() {
	const uploadModal = useSelector((state: RootState) => state.uploadModal);
	const dispatch = useDispatch();

	return {
		uploadModal,
		dispatch,
	};
}

export default uploadModalSlice.reducer;
