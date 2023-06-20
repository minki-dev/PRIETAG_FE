import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { stat } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export interface PriceCard {
	id: string;
	title: string;
	price: number;
	discountRate: number;
	detail: string;
	detailHeight: number;
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

type PriceModalState = {
	isCardSet: boolean;
	priceCards: PriceCard[];
	//priceCardOrder: string[];
	priceCardAreaPadding: number;
	detailMaxHeight: number;
	cardCount: number;
	isCheckPerYear: boolean;
	yearDiscountRate: number;
	isCheckPerPerson: boolean;
	isCheckPerTier: boolean;
	headDiscount: HeadDiscountItem[];
	tierDiscount: TierDiscountItem[];
	monthYearToggle: boolean; // false: month, true: year
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

const initialState: PriceModalState = {
	isCardSet: false,
	priceCards: [],
	//priceCardOrder: [],
	priceCardAreaPadding: 10,
	detailMaxHeight: 30,
	cardCount: 0,
	isCheckPerYear: true,
	yearDiscountRate: 0,
	isCheckPerPerson: true,
	isCheckPerTier: true,
	headDiscount: [
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
	],
	tierDiscount: [
		{ tierPrice: 0, discountRate: 0 },
		{ tierPrice: 0, discountRate: 0 },
		{ tierPrice: 0, discountRate: 0 },
		{ tierPrice: 0, discountRate: 0 },
	],
	monthYearToggle: false, // false: month, true: year
	userCount: 1,
};

// isCheckPerYear 가 true일때 사용자가 입력한 값에 따라서 yearDiscountRate를 변경해준다.

export const priceModalSlice = createSlice({
	name: 'priceModal',
	initialState,
	reducers: {
		/** 연간 할인율 설정 */
		setYearDiscount: (
			state: PriceModalState,
			action: PayloadAction<number>,
		) => {
			return { ...state, yearDiscountRate: action.payload };
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
		/** 티어별 가격,할인율 업데이트  */
		updateTierDiscount: (
			state: PriceModalState,
			action: PayloadAction<{
				index: number;
				tierPrice: number;
				discountRate: number;
			}>,
		) => {
			if (state.isCheckPerTier) {
				const { index, tierPrice, discountRate } = action.payload;

				if (index >= 0 && index < state.tierDiscount.length) {
					const updatedTierDiscount = [...state.tierDiscount];
					updatedTierDiscount[index] = {
						tierPrice,
						discountRate,
					};

					return { ...state, tierDiscount: updatedTierDiscount };
				}

				return state;
			}
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
			return { ...state, isCheckPerPerson: action.payload };
		},
		/** 티어별 할인율 활성화 토글 */
		toggleIsCheckPerTier: (state: PriceModalState) => {
			return { ...state, isCheckPerTier: !state.isCheckPerTier };
		},
		/** 티어별 할인율 활성화 여부 로드 */
		getIsCheckPerTier: (
			state: PriceModalState,
			action: PayloadAction<boolean>,
		) => {
			return { ...state, isCheckPerTier: action.payload };
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

		/** 설정한 수만큼 카드 생성  */
		createPriceCard: (state: PriceModalState) => {
			state.priceCards = Array.from({ length: state.cardCount }, (_, index) => {
				const tier = state.tierDiscount[index];
				const { v4: uuidv4 } = require('uuid');
				return {
					id: uuidv4(),
					title: '',
					price: tier.tierPrice,
					discountRate: tier.discountRate,
					detail: '',
					detailHeight: 30,
					feature: '',
					content: [''],
				};
			});
		},

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
				content: [''],
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
	},
});

export const {
	updateYearDiscount,
	toggleIsCheckPerPerson,
	toggleIsCheckPerTier,
	toggleIsCheckPerYear,
	updateCardCount,
	updateTierDiscount,
	updateHeadDiscount,
	setYearDiscount,
	getIsCheckPerPerson,
	getIsCheckPerTier,
	getIsCheckPerYear,
	setPriceCard,
	toggleIsCardSet,
	getIsCardSet,
	createPriceCard,
	addPriceCard,
	changeOrderPriceCard,
	updatePriceCard,
	deletePriceCard,
	updatePriceCardAreaPadding,
	updateMonthYearToggle,
	updateUserCount,
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
