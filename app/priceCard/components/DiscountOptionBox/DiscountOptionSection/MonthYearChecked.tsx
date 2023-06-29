'use client';
import {
	updateMonthYearToggle,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import React, { useEffect, useRef } from 'react';

function MonthYearChecked({ color }: { color: string }) {
	const { priceModal, dispatch } = usePriceModal();

	const [currentChange, setCurrentChange] = React.useState('month');

	const isChecked = (value: string): boolean => currentChange === value;

	useEffect(() => {
		dispatch(updateMonthYearToggle(currentChange));
	}, [currentChange]);

	const yearRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (currentChange === 'year' && yearRef.current) {
			yearRef.current.style.color = color;
			// console.log(color);
		} else {
			if (yearRef.current) {
				yearRef.current.style.color = '#989898';
			}
		}
	}, [currentChange, color]);

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
					ref={yearRef}
					className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] text-sm font-medium text-[#989898] peer-checked/year:bg-white peer-checked/year:text-[16px] peer-checked/year:font-bold peer-checked/year:shadow-[0_0_5px_rgba(0,0,0,0.3)] peer-checked/year:transition`}
				>
					연간 구독
				</span>
			</label>
		</fieldset>
	);
}

export default MonthYearChecked;
