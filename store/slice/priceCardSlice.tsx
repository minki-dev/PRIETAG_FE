import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// 가격 카드 정보
interface priceCardInfo {
	id: string;
	title: string;
	price: number;
	discountRate: number;
	detail: string;
	feature: string;
	content: string[];
}
// 가격 카드 영역(순서, 카드 정보)
interface priceCardSection {
	priceCardOrder: string[];
	priceCards: priceCardInfo[];
}

const initialState: priceCardSection = {
	priceCardOrder: [''],
	priceCards: [
		{
			id: '',
			title: '',
			price: 80000,
			discountRate: 10,
			detail: '',
			feature: '',
			content: [''],
		},
	],
};

export const priceCardSlice = createSlice({
	name: 'priceCard',
	initialState,
	reducers: {
		createPriceCard: (
			state: priceCardSection,
			action: PayloadAction<string>, // 카드 아이디(선택된 1개)
		) => {
			if (!state.priceCardOrder[0]) {
				return {
					priceCardOrder: [action.payload],
					priceCards: [
						{ ...initialState.priceCards[0], ...{ id: action.payload } },
					],
				};
			} else {
				const addPriceCardOrder = [
					...state.priceCardOrder,
					...[action.payload],
				];
				const addPriceCards = [
					...state.priceCards,
					...[{ ...initialState.priceCards[0], ...{ id: action.payload } }],
				];
				return {
					priceCardOrder: addPriceCardOrder,
					priceCards: addPriceCards,
				};
			}
		},
		changeOrderPriceCard: (
			state: priceCardSection,
			action: PayloadAction<string[]>, // 카드 아이디 배열
		) => {
			const currentPriceCards: priceCardInfo[] = state.priceCards;
			const changePriceCards: priceCardInfo[] = action.payload.map(
				(cardId) =>
					currentPriceCards.find(
						(priceCard) => priceCard.id === cardId,
					) as priceCardInfo,
			);
			return {
				priceCardOrder: action.payload,
				priceCards: changePriceCards,
			};
		},
		updatePriceCard: (
			state: priceCardSection,
			action: PayloadAction<priceCardInfo>, // 카드 정보(선택된 1개)
		) => {
			const currentPriceCardOrder = state.priceCardOrder;
			const currentPriceCardIndex = state.priceCards.findIndex(
				(card) => card.id === action.payload.id,
			);
			const newPriceCards = Array.from(state.priceCards);
			newPriceCards[currentPriceCardIndex] = action.payload;
			return {
				priceCardOrder: currentPriceCardOrder,
				priceCards: newPriceCards,
			};
		},
		deletePriceCard: (
			state: priceCardSection,
			action: PayloadAction<string>, // 카드 아이디(선택된 1개)
		) => {
			const newPriceCardOrder = state.priceCardOrder.filter(
				(id) => id !== action.payload,
			);
			const newPriceCards = state.priceCards.filter(
				(card) => card.id !== action.payload,
			);
			return {
				priceCardOrder: newPriceCardOrder,
				priceCards: newPriceCards,
			};
		},
	},
});

export const {
	createPriceCard,
	changeOrderPriceCard,
	updatePriceCard,
	deletePriceCard,
} = priceCardSlice.actions;

export function usePriceCard() {
	const priceCard = useSelector((state: RootState) => state.priceCard);
	const dispatch = useDispatch();

	return {
		priceCard,
		dispatch,
	};
}

export default priceCardSlice.reducer;
