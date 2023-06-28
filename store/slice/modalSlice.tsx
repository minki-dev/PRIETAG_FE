import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
export interface ModalProps {
	cancelButton: {
		text: string;
		onCancel: (() => void) | null;
	};
	behaveButton: {
		text: string;
		color: string;
		onAction: (() => void) | null;
	};
}
export interface ModalParams {
	title: string;
	description: React.ReactNode;
	buttons: ModalProps;
}
export interface ModalState {
	isOpen: boolean;
	params: ModalParams;
}
const initialState: ModalState = {
	isOpen: false,
	params: {
		title: '',
		description: null,
		buttons: {
			cancelButton: {
				text: '',
				onCancel: null,
			},
			behaveButton: {
				text: '',
				color: '',
				onAction: null,
			},
		},
	},
};
const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.params = action.payload.params;
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
	},
});
export const { openModal, closeModal } = modalSlice.actions;
export function useModal() {
	const dispatch = useDispatch();
	const { isOpen, params } = useSelector((state: RootState) => state.modal);
	return {
		dispatch,
		isOpen,
		params,
	};
}
export default modalSlice.reducer;
