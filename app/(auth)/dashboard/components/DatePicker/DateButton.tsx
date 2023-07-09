import { ChartDateType } from '@/constants/chart';
import { updateDateBy, useDashboard } from '@/store/slice/dashboardSlice';
import React from 'react';

type Props = {
	dateBy: ChartDateType;
};

export default function DateButton({ dateBy }: Props) {
	const {
		dashboardState: { dateBy: selectedDateby },
		dispatch,
	} = useDashboard();
	const handleClick = () => {
		dispatch(updateDateBy(dateBy));
	};
	return (
		<button
			onClick={handleClick}
			className={`rounded-[10px] px-5 py-2 shadow-md ${
				selectedDateby === dateBy
					? 'bg-[#315EFF] text-white'
					: 'bg-white text-black'
			}`}
			type="button"
		>
			<span className="whitespace-nowrap">{generateDateLabel(dateBy)}</span>
		</button>
	);
}

function generateDateLabel(dateBy: ChartDateType) {
	switch (dateBy) {
		case 'WEEK':
			return '1주';
		case 'MONTH':
			return '1달';
		case 'YEAR':
			return '1년';

		default:
			console.log('invalid dateBy type detected');
			return '';
	}
}
