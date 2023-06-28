import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { v4 as uuidv4 } from 'uuid';

export interface PriceCard {
	id: string; // id값 추가 -> uuid로 설정하여 key 값으로 사용
	title: string;
	price: number;
	discountRate: number;
	detail: string;
	detailHeight: number; // 가격표 설명 부분 카드별 높이 저장 필요
	feature: string;
	content: string[];
}
// updatePriceCard 리듀서에서
// 카드 정보 업데이트 할 때 사용
interface PriceCardIndex {
	index: number;
	card: PriceCard;
}
// getTierInput 리듀서에서
// 가격 설정 모달에서 티어 별 가격, 할인율 입력 값 가져오기 할 때 사용
interface TierInput {
	index: number;
	price: number;
	discountRate: number;
}
// priceCard의 content[]수정할 때 사용
interface ContentData {
	cardIndex: number;
	contentIndex: number;
	contentData: string;
}
// priceCard의 content 항목 삭제할 때 사용
interface ContentDelete {
	cardIndex: number;
	contentIndex: number;
}

type PriceModalState = {
	isCardSet: boolean;
	highLightIndex: number;
	pricing: string;
	priceCards: PriceCard[]; // priceCard -> priceCards로 변경(끝에 's' 추가)
	//priceCardOrder: string[];
	priceCardAreaPadding: number; // 가격 카드 영역에서 패딩 높이 저장 필요
	detailMaxHeight: number; // 가격 카드 별 설명 부분 높이 중 가장 큰 값 저장
	cardCount: number;
	isCheckPerYear: boolean;
	isCardHighLight: boolean;
	yearDiscountRate: number;
	isCheckPerPerson: boolean;
	headDiscount: HeadDiscountItem[];
	cardMaxHeight: string;
	// 월간/연간 토글 버튼 상태 저장 필요
	// 월간/연간에 따라 가격, 할인율 표시 위함
	monthYearToggle: boolean; // false: month, true: year
	// 사용자 수 입력 값 저장 필요
	// 가격 카드에서 사용자 수에 따라 가격, 할인율 표시 위함
	userCount: number;
};
type HeadDiscountItem = {
	headCount: number;
	discountRate: number;
};
type TierDiscountItem = {
	tierPrice: number;
	discountRate: number;
};
// 위에 추가된 타입들에 대해 initialState 추가했습니다.
const initialState: PriceModalState = {
	isCardSet: false,
	pricing: '정액제',
	priceCards: [
		{
			id: uuidv4(),
			title: '가격제 이름',
			price: 100000,
			discountRate: 20,
			detail: '',
			detailHeight: 30,
			feature: '',
			content: [],
		},
	],
	priceCardAreaPadding: 10,
	detailMaxHeight: 30,
	highLightIndex: 0,
	cardCount: 0,
	isCheckPerYear: false,
	isCardHighLight: false,
	yearDiscountRate: 0,
	isCheckPerPerson: false,
	headDiscount: [
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
	],
	cardMaxHeight: '495px',
	monthYearToggle: false, // false: month, true: year
	userCount: 1,
};

// isCheckPerYear 가 true일때 사용자가 입력한 값에 따라서 yearDiscountRate를 변경해준다.

export const priceModalSlice = createSlice({
	name: 'priceModal',
	initialState,
	reducers: {
		/** 요금책정 방식 설정 */
		setPricing: (state, action) => {
			state.pricing = action.payload;
		},
		/** 연간 할인율 설정 */
		setYearDiscount: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			state.yearDiscountRate = action.payload;
		},
		/** 특정 강조 카드 활성화 토글 */
		toggleHighLight: (state: PriceModalState) => {
			state.isCardHighLight = !state.isCardHighLight;
			return state;
		},
		/** 특정 강조 카드 인덱스 갱신 */
		updateHighLightIndex: (state, action) => {
			state.highLightIndex = action.payload;
		},
		updateYearDiscount: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			if (state.isCheckPerYear) {
				return {
					...state,
					yearDiscountRate: state.yearDiscountRate + action.payload,
				};
			}
		},
		/** 카드 갯수 업데이트 */
		updateCardCount: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			return { ...state, cardCount: action.payload };
		},

		/** 인원별 할인율 업데이트 */
		updateHeadDiscount: (
			state: PriceModalState,
			action: PayloadAction<{
				index: number;
				headCount: number;
				discountRate: number;
			}>,
		) => {
			if (state.isCheckPerPerson) {
				const { index, headCount, discountRate } = action.payload;
				if (index >= 0 && index < state.headDiscount.length) {
					const updatedHeadDiscount = [...state.headDiscount];
					updatedHeadDiscount[index] = {
						headCount,
						discountRate,
					};
					return { ...state, headDiscount: updatedHeadDiscount };
				}
				return state;
			}
		},
		/** 연간 할인율 활성화 토글 */
		toggleIsCheckPerYear: (state: PriceModalState) => {
			return { ...state, isCheckPerYear: !state.isCheckPerYear };
		},
		/** 연간 할인율 활성화 여부 로드 */
		getIsCheckPerYear: (
			state: PriceModalState,
			action: PayloadAction<boolean>,
		) => {
			return { ...state, isCheckPerYear: action.payload };
		},
		/** 인원별 할인율 활성화 토글 */
		toggleIsCheckPerPerson: (state: PriceModalState) => {
			return { ...state, isCheckPerPerson: !state.isCheckPerPerson };
		},
		/** 인원별 할인율 활성화 여부 로드 */
		getIsCheckPerPerson: (
			state: PriceModalState,
			action: PayloadAction<boolean>,
		) => {
			if (state.pricing === '정액제') {
				state.isCheckPerPerson = action.payload;
			} else {
				state.isCheckPerPerson = !action.payload;
			}

			return state;
		},

		/** 가격 카드 설정 */
		setPriceCard: (
			state: PriceModalState,
			action: PayloadAction<PriceCard[]>,
		) => {
			return { ...state, priceCards: action.payload };
		},

		/** 가격 카드 설정 여부 토글 */
		toggleIsCardSet: (state: PriceModalState) => {
			return { ...state, isCardSet: true };
		},

		/** 가격 카드 설정 여부 로드 */
		getIsCardSet: (state: PriceModalState, action: PayloadAction<boolean>) => {
			return { ...state, isCardSet: action.payload };
		},

		// 티어별 price, discountRate를 priceCards에 직접 입력하기 위한 리듀서
		/** 가격 설정 모달에서 티어 별 가격, 할인율 입력 값 가져오기 */
		getTierInput: (
			state: PriceModalState,
			action: PayloadAction<TierInput>,
		) => {
			const newPriceCards = [...state.priceCards];
			newPriceCards[action.payload.index] = Object.assign(
				{},
				newPriceCards[action.payload.index],
				{
					price: action.payload.price,
					discountRate: action.payload.discountRate,
				},
			);
			return Object.assign({}, state, { priceCards: newPriceCards });
		},

		/** 가격 카드 추가하기 */
		addPriceCard: (state: PriceModalState, action: PayloadAction<void>) => {
			const { v4: uuidv4 } = require('uuid');
			const initialPriceCard: PriceCard = {
				id: uuidv4(),
				title: '',
				price: 0,
				discountRate: 0,
				detail: '',
				detailHeight: 30,
				feature: '',
				content: [],
			};
			const currentPriceCards = [...state.priceCards];
			currentPriceCards.push(initialPriceCard);
			const currentCardCount = currentPriceCards.length;
			return Object.assign({}, state, {
				cardCount: currentCardCount,
				priceCards: currentPriceCards,
			});
		},

		/** 가격 카드 순서 변경하기 */
		changeOrderPriceCard: (
			state: PriceModalState,
			action: PayloadAction<PriceCard[]>, // 카드 아이디 배열(priceCardOrder)
		) => {
			const changePriceCards: PriceCard[] = action.payload;
			return Object.assign({}, state, {
				priceCards: changePriceCards,
			});
		},

		/** 가격 카드 정보 업데이트하기 */
		updatePriceCard: (
			state: PriceModalState,
			action: PayloadAction<PriceCardIndex>, // 카드 정보(선택된 1개)
		) => {
			const newPriceCards = [...state.priceCards];
			newPriceCards[action.payload.index] = action.payload.card;
			const maxHeight = Math.max(
				...newPriceCards.map((card) => Number(card.detailHeight)),
			);
			return Object.assign({}, state, {
				priceCards: newPriceCards,
				detailMaxHeight: maxHeight,
			});
		},

		/** 가격 카드 content 부분 항목 추가하기 */
		addContent: (
			state: PriceModalState,
			action: PayloadAction<number>, // 카드의 인덱스: number 넘겨받음
		) => {
			state.priceCards[action.payload].content.push('');
		},

		/** 가격 카드 content 부분 업데이트하기 */
		updateContent: (
			state: PriceModalState,
			action: PayloadAction<ContentData>,
		) => {
			state.priceCards[action.payload.cardIndex].content[
				action.payload.contentIndex
			] = action.payload.contentData;
		},

		/** 가격 카드 삭제하기 */
		deletePriceCard: (
			state: PriceModalState,
			action: PayloadAction<number>, // 카드 아이디(선택된 1개)
		) => {
			const newPriceCards = [...state.priceCards];
			const spliceCards = newPriceCards.splice(action.payload, 1);
			const currentCardCount = newPriceCards.length;
			return Object.assign({}, state, {
				cardCount: currentCardCount,
				priceCards: newPriceCards,
			});
		},

		/** 가격 카드-콘텐츠 항목 1개 삭제하기 */
		deletePriceCardContent: (
			state: PriceModalState,
			action: PayloadAction<ContentDelete>,
		) => {
			const contentArr = Array.from(
				state.priceCards[action.payload.cardIndex].content,
			);
			const spliceContentArr = contentArr.splice(
				action.payload.contentIndex,
				1,
			);
			state.priceCards[action.payload.cardIndex].content = contentArr;
		},

		/** 가격 카드 영역 패딩 값 업데이트하기 */
		updatePriceCardAreaPadding: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			return Object.assign({}, state, { priceCardAreaPadding: action.payload });
		},

		/** 월간, 연간 토글 버튼 상태 */
		updateMonthYearToggle: (
			state: PriceModalState,
			action: PayloadAction<string>,
		) => {
			const currentChecked = action.payload === 'year' ? true : false;
			// false: month, true: year
			return Object.assign({}, state, { monthYearToggle: currentChecked });
		},

		/** 사용자 수 입력 상태 */
		updateUserCount: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			const currentUserCount = action.payload < 1 ? 1 : action.payload;
			return Object.assign({}, state, { userCount: currentUserCount });
		},

		/** 가격 카드 높이 업데이트 */
		updateCardMaxHeight: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			const currentHeight = action.payload - 32;
			state.cardMaxHeight = currentHeight + 'px';
		},
	},
});

export const {
	setPricing,
	updateYearDiscount,
	toggleIsCheckPerPerson,
	toggleIsCheckPerYear,
	updateCardCount,
	updateHeadDiscount,
	setYearDiscount,
	getIsCheckPerPerson,
	getIsCheckPerYear,
	setPriceCard,
	toggleIsCardSet,
	getIsCardSet,
	addPriceCard,
	changeOrderPriceCard,
	updatePriceCard,
	deletePriceCard,
	updatePriceCardAreaPadding,
	updateMonthYearToggle,
	updateUserCount,
	updateHighLightIndex,
	toggleHighLight,
	addContent,
	updateContent,
	deletePriceCardContent,
	updateCardMaxHeight,
} = priceModalSlice.actions;

export function usePriceModal() {
	const priceModal = useSelector((state: RootState) => state.priceModal);
	const dispatch = useDispatch();

	return {
		priceModal,
		dispatch,
	};
}

export default priceModalSlice.reducer;
