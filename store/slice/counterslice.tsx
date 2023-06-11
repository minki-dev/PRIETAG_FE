import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

type CounterState = { count: number };

type CounterPayload = {
	diff: number;
};

const initialState: CounterState = {
	count: 0,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increase: (state: CounterState) => {
			return { ...state, count: state.count + 1 };
		},
		decrease: (state: CounterState) => {
			return { ...state, count: state.count - 1 };
		},
		// PayloadAction 타입 명시

		increaseByDiff: (
			state: CounterState,
			action: PayloadAction<CounterPayload>,
		) => {
			return { ...state, count: state.count + action.payload.diff };
		},
		decreaseByDiff: (
			state: CounterState,
			action: PayloadAction<CounterPayload>,
		) => {
			return { ...state, count: state.count - action.payload.diff };
		},
	},
});

export const { increase, decrease, increaseByDiff, decreaseByDiff } =
	counterSlice.actions;

export function useCounter() {
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch();

	return {
		count,
		dispatch,
	};
}

export default counterSlice.reducer;
