import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '..';

export interface FormDataPreview extends FormData {
	preview: Blob;
}

export interface FileWithPreview extends File {
	preview: string;
}
interface UploadModalState {
	formData: FormDataPreview | null;
	previewImg: FileWithPreview | null;
}

const initialState: UploadModalState = {
	formData: null,
	previewImg: null,
};

export const uploadModalSlice = createSlice({
	name: 'uploadModal',
	initialState,
	reducers: {
		setFormData: (state, action) => {
			state.formData = action.payload;
		},
		setPreviewImg: (state, action) => {
			state.previewImg = action.payload;
		},
	},
});

export const { setFormData, setPreviewImg } = uploadModalSlice.actions;

export function useUploadModal() {
	const uploadModal = useSelector((state: RootState) => state.uploadModal);
	const dispatch = useDispatch();

	return {
		uploadModal,
		dispatch,
	};
}

export default uploadModalSlice.reducer;
