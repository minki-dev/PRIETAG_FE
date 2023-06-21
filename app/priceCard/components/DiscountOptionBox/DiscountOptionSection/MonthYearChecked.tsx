'use client';
import {
	updateMonthYearToggle,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import React, { useEffect } from 'react';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

function MonthYearChecked({ color }: { color: colorInfo }) {
	const textColor: colorInfo = {
		mainColor: `text-[${color.mainColor}]`,
		subColor01: `text-[${color.subColor01}]`,
		subColor02: `text-[${color.subColor02}]`,
	};
	const { priceModal, dispatch } = usePriceModal();

	const [currentChange, setCurrentChange] = React.useState('month');

	const isChecked = (value: string): boolean => currentChange === value;

	useEffect(() => {
		dispatch(updateMonthYearToggle(currentChange));
	}, [currentChange]);

	return (
		<fieldset className="flex h-[48px] w-[222px] items-center justify-center rounded-[24px] bg-[#F9F9F9] p-[4px] shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.15)]">
			<label className="flex h-full w-[50%] items-center justify-center">
				<input
					className="peer/month appearance-none"
					type="radio"
					name="monthYear"
					value="month"
					onChange={(e) => setCurrentChange(e.target.value)}
					checked={isChecked('month')}
				/>
				<span
					className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] text-sm font-medium text-[#989898] peer-checked/month:bg-white peer-checked/month:text-[16px] peer-checked/month:shadow-[0_0_5px_rgba(0,0,0,0.3)] peer-checked/month:transition`}
				>
					월간 구독
				</span>
			</label>
			<label className="flex h-full w-[50%] items-center justify-center">
				<input
					className="peer/year appearance-none"
					type="radio"
					name="monthYear"
					value="year"
					onChange={(e) => setCurrentChange(e.target.value)}
					checked={isChecked('year')}
				/>
				<span
					className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] text-sm font-medium text-[#989898] peer-checked/year:bg-white peer-checked/year:text-[16px] peer-checked/year:text-[#00A3FF] peer-checked/year:shadow-[0_0_5px_rgba(0,0,0,0.3)] peer-checked/year:transition`}
				>
					연간 구독
				</span>
			</label>
		</fieldset>
	);
}

export default MonthYearChecked;
