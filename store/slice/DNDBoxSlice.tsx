import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import {
	BoxType,
	DraggableBox,
	generateDraggableBoxProp,
	getInitialBoxList,
} from '@/constants/box';

export type DNDBoxState = {
	priceCardArea: DraggableBox[];
	tableArea: DraggableBox[];
	faqArea: DraggableBox[];
	selectedBox: DraggableBox | null;
	targetArea:
		| keyof Pick<DNDBoxState, 'faqArea' | 'tableArea' | 'priceCardArea'>
		| null;
};

type DNDBoxPayload = {
	areaType: keyof Pick<DNDBoxState, 'faqArea' | 'tableArea' | 'priceCardArea'>
	newList: DraggableBox[];
	boxType: BoxType;
	id: string;
	content: string;
	index: number
};

const initialState: DNDBoxState = {
	priceCardArea: getInitialBoxList({
		title: '가격 정책 메인 타이틀',
		subTitle: '서브 타이틀',
		text: '텍스트 입력',
	}),
	tableArea: getInitialBoxList({
		title: '상세 기능표 메인 타이틀',
		subTitle: '서브 타이틀',
		text: '텍스트 입력',
	}),
	faqArea: getInitialBoxList({
		title: 'FAQ 메인 타이틀',
		subTitle: '서브 타이틀',
		text: '텍스트 입력',
	}),
	selectedBox: null,
	targetArea: null,
};

export const DNDBoxSlice = createSlice({
	name: 'dndBox',
	initialState,
	reducers: {
		updateOrder: (
			state: DNDBoxState,
			action: PayloadAction<Pick<DNDBoxPayload, 'areaType' | 'newList'>>,
		) => {
			const { areaType, newList } = action.payload;
			return { ...state, [areaType]: newList };
		},
		addBox: (
			state: DNDBoxState,
			action: PayloadAction<Pick<DNDBoxPayload, 'boxType'>>,
		) => {
			// @TODO modal 띄워야함
			if (state.selectedBox === null) return;
			const { boxType } = action.payload;
			if (state.targetArea === null) return

			let targetIndex = 0;
			let updatedList = state[state.targetArea].map((box, index) => {
				if (box.id === state.selectedBox?.id) {
					targetIndex = index;
				}
				return { ...box };
			});
			const newBox = generateDraggableBoxProp({ role: boxType as BoxType });
			updatedList.splice(targetIndex + 1, 0, newBox);
			return {
				...state,
				[state.targetArea]: updatedList,
			};
		},
		removeBox: (
			state: DNDBoxState,
			action: PayloadAction<Pick<DNDBoxPayload, 'id' | 'areaType'>>,
		) => {
			const { id, areaType } = action.payload;
			if (state[areaType].length <= 1) return
			const newList = state[areaType].filter((box) => box.id !== id) 
			return { ...state, [areaType]: newList };
		},
		updateHeight: (
			state: DNDBoxState,
			action: PayloadAction<Pick<DNDBoxPayload, 'index' | 'areaType' | 'content'>>,
		) => {
			const { index, areaType, content } = action.payload;
			state[areaType][index].content = content
			console.log(current(state))
			return state
		},
		updateSelected: (
			state: DNDBoxState,
			action: PayloadAction<Pick<DNDBoxPayload, 'id' | 'areaType'>>,
		) => {
			const { id, areaType } = action.payload;


			if (state.targetArea !== areaType && state.targetArea !== null) {
		

				for (const box of state[state.targetArea]) {
					if (box.id === state.selectedBox?.id) {
						box.isSelected = false
						break
					}
				}
				
				state.targetArea = null
				state.selectedBox = null
			}


			let current: DraggableBox | null = null;
			let toSelect: DraggableBox | null = null;
			const updatedBoxList = state[areaType].map((box) => {
				if (box.id === state.selectedBox?.id) {
					current = { ...box, isSelected: false };
					return current;
				}
				if (box.id === id) {
					toSelect = { ...box, isSelected: true };
					return toSelect;
				}
				return { ...box };
			});
			state.targetArea = areaType
			state.selectedBox = toSelect
			state[areaType] = updatedBoxList
			return state
		},
	},
});

export const { updateOrder, addBox, removeBox, updateHeight, updateSelected } =
	DNDBoxSlice.actions;

export function useDNDBox() {
	const boxState = useSelector((state: RootState) => state.dndBox);
	const dispatch = useDispatch();

	return {
		boxState,
		dispatch,
	};
}

export default DNDBoxSlice.reducer;
