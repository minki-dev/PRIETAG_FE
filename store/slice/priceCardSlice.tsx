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
	detailHeight: number;
	feature: string;
	content: string[];
}
// 가격 카드 영역(순서, 카드 정보)
interface priceCardSection {
	priceCardOrder: string[];
	priceCards: priceCardInfo[];
	priceCardAreaPadding: number;
	detailMaxHeight: number;
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
			detailHeight: 30,
			feature: '',
			content: [''],
		},
	],
	priceCardAreaPadding: 10,
	detailMaxHeight: 30,
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
				const addPriceCardOrder = [action.payload];
				const addPriceCards = [
					{ ...initialState.priceCards[0], ...{ id: action.payload } },
				];
				return Object.assign({}, state, {
					priceCardOrder: addPriceCardOrder,
					priceCards: addPriceCards,
				});
			} else {
				const addPriceCardOrder = [
					...state.priceCardOrder,
					...[action.payload],
				];
				const addPriceCards = [
					...state.priceCards,
					...[{ ...initialState.priceCards[0], ...{ id: action.payload } }],
				];
				return Object.assign({}, state, {
					priceCardOrder: addPriceCardOrder,
					priceCards: addPriceCards,
				});
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
			return Object.assign({}, state, {
				priceCardOrder: action.payload,
				priceCards: changePriceCards,
			});
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
			const maxHeight = Math.max(
				...newPriceCards.map((card) => Number(card.detailHeight)),
			);
			return Object.assign({}, state, {
				priceCardOrder: currentPriceCardOrder,
				priceCards: newPriceCards,
				detailMaxHeight: maxHeight,
			});
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
			return Object.assign({}, state, {
				priceCardOrder: newPriceCardOrder,
				priceCards: newPriceCards,
			});
		},
		updatePriceCardAreaPadding: (
			state: priceCardSection,
			action: PayloadAction<number>,
		) => {
			return Object.assign({}, state, { priceCardAreaPadding: action.payload });
		},
	},
});

export const {
	createPriceCard,
	changeOrderPriceCard,
	updatePriceCard,
	deletePriceCard,
	updatePriceCardAreaPadding,
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
