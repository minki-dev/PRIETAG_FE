import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// 연간 할인 여부, 연간 할인율, 월간/연간 토글 위치,
interface yearDiscountInfo {
	isCheckPerYear: boolean;
	yearDiscountRate: number;
	isMonthYear: boolean;
}

// 테스트 용. 가격 설정 모달 설정 값 or 서버 or 설정 안했을 경우 delete 할 때와 동일
const initialState: yearDiscountInfo = {
	isCheckPerYear: true,
	yearDiscountRate: 10,
	isMonthYear: false, // 기본 값
};

export const monthYearToggleSlice = createSlice({
	name: 'monthYearToggle',
	initialState,
	reducers: {
		toggleMonthYear: (
			state: yearDiscountInfo,
			action: PayloadAction<boolean>,
		) => {
			return Object.assign({}, state, { isMonthYear: action.payload });
		},
		deleteYearDiscountInfo: (
			state: yearDiscountInfo,
			action: PayloadAction<yearDiscountInfo>,
		) => {
			return {
				isCheckPerYear: false,
				yearDiscountRate: 0,
				isMonthYear: false,
			};
		},
	},
});

export const { toggleMonthYear, deleteYearDiscountInfo } =
	monthYearToggleSlice.actions;

export function useMonthYearToggle() {
	const monthYearToggle = useSelector(
		(state: RootState) => state.monthYearToggle,
	);
	const dispatch = useDispatch();

	return {
		monthYearToggle,
		dispatch,
	};
}

export default monthYearToggleSlice.reducer;
