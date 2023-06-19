import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

export interface FAQCard {
	id: string;
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
		//FAQ를 제출하는 메소드 index, question, answer를 받아서 해당 faqList의 index에 맞는 값을 변경
		submitFAQ: (state, action) => {
			const { index, questionValue, answerValue } = action.payload;
			//index에 위치한 faqList의 값을 변경
			state.faqList[index] = {
				id: state.faqList[index].id,
				question: questionValue,
				answer: answerValue,
			};

			return state;
		},
		togglePreview: (state) => {
			return { ...state, isPreview: !state.isPreview };
		},
		// FAQ 추가 버튼을 눌렀을때, 비어있는 FAQ를 추가하는 메소드
		addFAQ: (state) => {
			const newId = uuid();
			return {
				...state,
				faqList: [...state.faqList, { id: newId, question: '', answer: '' }],
			};
		},
		// 삭제 버튼을 눌렀을때 해당 index에 위치한 항목을 제거하는 메소드
		deleteFAQ: (state, action) => {
			const { index } = action.payload;

			state.faqList.splice(index, 1);

			return state;
		},
	},
});

export const { submitFAQ, togglePreview, addFAQ, deleteFAQ } = faqSlice.actions;

export function useFAQ() {
	const faq = useSelector((state: RootState) => state.faq);
	const dispatch = useDispatch();

	return {
		faq,
		dispatch,
	};
}
export default faqSlice.reducer;
