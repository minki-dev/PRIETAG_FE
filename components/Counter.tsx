import {
	decrease,
	decreaseByDiff,
	increase,
	increaseByDiff,
	useCounter,
} from '@/store/slice/counterslice';

function Counter() {
	const { count, dispatch } = useCounter();

	const onIncrease = () => {
		dispatch(increase());
		console.log(count);
	};
	const onDecrease = () => {
		dispatch(decrease());
	};
	const onIncreaseByDiff = (diff: number) => {
		dispatch(increaseByDiff({ diff }));
	};
	const onDecreaseByDiff = (diff: number) => {
		dispatch(decreaseByDiff({ diff }));
	};

	return (
		<div>
			<p>{count}</p>
			<button type="button" onClick={onDecrease}>
				-1
			</button>
			<button type="button" onClick={onIncrease}>
				+1
			</button>
			<button type="button" onClick={() => onDecreaseByDiff(2)}>
				-2
			</button>
			<button type="button" onClick={() => onIncreaseByDiff(2)}>
				+2
			</button>
		</div>
	);
}

export default Counter;
