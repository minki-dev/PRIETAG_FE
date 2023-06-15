import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export interface FAQCard {
	question: string;
	answer: string;
}

type FAQState = {
	faqList: FAQCard[];
	isPreview: boolean;
};

const initialState: FAQState = {
	isPreview: false,
	faqList: [],
};

export const faqSlice = createSlice({
	name: 'faq',
	initialState,
	reducers: {
		setFAQ: (state, action: PayloadAction<FAQCard[]>) => {
			return { ...state, faqList: action.payload };
		},
		togglePreview: (state) => {
			return { ...state, isPreview: !state.isPreview };
		},
		// FAQ 추가 버튼을 눌렀을때, 비어있는 FAQ를 추가하는 메소드
		addFAQ: (state) => {
			return {
				...state,
				faqList: [...state.faqList, { question: '', answer: '' }],
			};
		},
		// FAQ 초기화 버튼을 눌렀을때, 모든 FAQ를 비워주는 메소드
		clearFAQ: (state) => {
			state.faqList.forEach((item) => {
				item.question = '';
				item.answer = '';
			});
		},
	},
});

export const { setFAQ, togglePreview, addFAQ, clearFAQ } = faqSlice.actions;

export function useFAQ() {
	const faq = useSelector((state: RootState) => state.faq);
	const faqDispatch = useDispatch();

	return {
		faq,
		faqDispatch,
	};
}
export default faqSlice.reducer;
