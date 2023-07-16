import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DraggableBox } from '@/constants/box';

export type EditTemplateType = {
	/**
	 * 가격표 카드의 draggable box 위치 및 속성 (PriceModalState)
	 */
	priceCardArea: DraggableBox[];
	/**
	 * 상세기능표의 draggable box 위치 및 속성
	 */
	chartArea: DraggableBox[];
	/**
	 * FAQ의 draggable box 위치 및 속성
	 */
	faqArea: DraggableBox[];
	/**
	 * priceCard(들)의 정보
	 */
	priceCard: {
		title: string;
		price: number;
		discountRate: number;
		detail: string;
		feature: string;
		content: string[];
	}[];
	/**
	 * 상세기능표 정보
	 */
	chart: {
		haveHeader: boolean;
		featureName: string;
		table: {
			feature: string;
			desc: string[];
		}[];
	}[];
	/**
	 * FAQ 정보
	 */
	faq: {
		question: string;
		desc: string;
	}[];

	/**
	 * 메인색상
	 */
	mainColor: string;
	/**
	 * 서브색상
	 */
	subColor: [string, string];
	/**
	 * 폰트
	 */
	font: string;
	/**
	 * [0] 가격표 카드와 상세기능표 사이의 외부패딩
	 * [1] 상세기능표와 FAQ사이의 외부패딩
	 */
	padding: [number, number];
	/**
	 * 템플릿 이름
	 */
	templateName: string;

	/**
	 * 인원별 할인율 토글(PriceModalState)
	 */
	isCheckPerPerson: boolean;
	/**
	 * 인원별 할인율에 대한 정보(PriceModalState)
	 */
	headDiscount: { headCount: number; discountRate: number }[];
	/**
	 * 연간 할인율 토글(PriceModalState)
	 */
	isCheckPerYear: boolean;
	/**
	 * 연간 할인율(PriceModalState)
	 */
	yearDiscountRate: number;
	/**
	 * 카드 설정 유무(PriceModalState)
	 */
	isCardSet: boolean;
	/**
	 * 가격표 카드들의 전체 높이(PriceModalState)
	 */
	priceCardAreaPadding: number;
	/**
	 * 가격표 카드 내부의 상세기능 설명의 높이(PriceModalState)
	 */
	priceCardDetailMaxHeight: number;
	/**
	 * 가격표 카드 중 하이라이트가 된 카드의 인덱스(PriceModalState)
	 */
	highLightIndex: number;
	/**
	 * 가격표 정액제, 정량제 구분(PriceModalState)
	 */
	pricing: string;
	/**
	 *  가격표 카드 강조 유무(PriceModalState)
	 */
	isCardHighLight: boolean;
	/**
	 * 가격 카드의 최대 높이 (PriceModalState)
	 */
	cardMaxHeight: number;
};

export const DEFAULT_EDIT_TEMPLATE: EditTemplateType = {
	priceCardArea: [],
	chartArea: [],
	faqArea: [],
	priceCard: [],
	chart: [
		{
			haveHeader: true,
			featureName: '',
			table: [
				{
					feature: '',
					desc: ['', ''],
				},
			],
		},
	],
	faq: [],

	mainColor: '#00A3FF',
	subColor: ['#60C8FF','#EAF8FF'],
	font: '',
	padding: [50, 50],
	templateName: '',
	isCheckPerPerson: false,
	headDiscount: [
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
		{ headCount: 0, discountRate: 0 },
	],
	isCheckPerYear: false,
	yearDiscountRate: 0,

	isCardSet: false,
	priceCardAreaPadding: 10,
	priceCardDetailMaxHeight: 30,
	highLightIndex: 0,
	pricing: '정액제',
	isCardHighLight: false,
	cardMaxHeight: 495,
};

const initialState: EditTemplateType = DEFAULT_EDIT_TEMPLATE;

export const editTemplateSlice = createSlice({
	name: 'editTemplate',
	initialState,
	reducers: {
		updateEditTemplate: (
			state: EditTemplateType,
			action: PayloadAction<EditTemplateType>,
		) => (state = action.payload),
	},
});
export const {} = editTemplateSlice.actions;
export function useEditTemplate() {
	const editTemplate = useSelector((state: RootState) => state.editTemplate);
	const dispatch = useDispatch();

	return {
		editTemplate,
		dispatch,
	};
}

export default editTemplateSlice.reducer;
