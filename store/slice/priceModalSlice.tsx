import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { stat } from 'fs';

export interface PriceCard {
	title: string;
	price: number;
	discountRate: number;
	detail: string;
	feature: string;
	content: string[];
}

type PriceModalState = {
	isCardSet: boolean;
	priceCard: PriceCard[];
	cardCount: number;
	isCheckPerYear: boolean;
	yearDiscountRate: number;
	isCheckPerPerson: boolean;
	isCheckPerTier: boolean;
	headDiscount: HeadDiscountItem[];
	tierDiscount: TierDiscountItem[];
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
	priceCard: [],
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
			return { ...state, priceCard: action.payload };
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
			state.priceCard = Array.from({ length: state.cardCount }, (_, index) => {
				const tier = state.tierDiscount[index];
				return {
					title: '',
					price: tier.tierPrice,
					discountRate: tier.discountRate,
					detail: '',
					feature: '',
					content: [],
				};
			});
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
