import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';

export interface ModalProps {
	cancelButton: {
		text: string;
		onCancel: (() => void) | null
	};
	behaveButton: {
		text: string;
		color: string;
		onAction: (() => void) | null
	};
}

export interface ModalParams {
	title: string;
	description: React.ReactNode;
	buttons: {
		cancelButton: {
			text: string;
			onCancel: (() => void) | null
		};
		behaveButton: {
			text: string;
			color: string;
			onAction:(() => void) | null
		};
	};
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
				onCancel: null
			},
			behaveButton: {
				text: '',
				color: '',
				onAction: null
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

{
	/* 다른 페이지에서 모달 사용하실 때 다음과 같이 작성하시면 됩니다!
	 
		'use client';

		import React from 'react';
		import { openModal, useModal } from '@/store/slice/modalSlice';
		import { GlobalModal } from '@/components/modal/GlobalModal';
		import { ModalTypes } from '@/components/modal/ModalState';
		export default function Home() {
			const { dispatch } = useModal();
			return (
				<div>
					<button onClick={() => dispatch(openModal(ModalTypes.FAQResetModal))}>
						버튼
					</button>
					<GlobalModal />
				</div>
			);
		}
		*/
}
