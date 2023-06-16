'use client';
import { useMonthYearToggle } from '@/store/slice/monthYearToggleSlice';
import React from 'react';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

function MonthYearChecked({ color }: { color: colorInfo }) {
	const { monthYearToggle, dispatch } = useMonthYearToggle();

	const textColor: colorInfo = {
		mainColor: `text-[${color.mainColor}]`,
		subColor01: `text-[${color.subColor01}]`,
		subColor02: `text-[${color.subColor02}]`,
	};

	return (
		<fieldset className="flex h-[48px] w-[222px] items-center justify-center rounded-[24px] bg-[#F9F9F9] p-[4px] shadow-md">
			<label className="flex h-full w-[50%] items-center justify-center">
				<input
					className="peer/month appearance-none"
					type="radio"
					name="monthYear"
					value="month"
					checked
				/>
				<span
					className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] text-sm text-[#989898] peer-checked/month:bg-white peer-checked/month:text-[16px] peer-checked/month:shadow peer-checked/month:transition`}
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
				/>
				<span
					className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] text-sm text-[#989898] peer-checked/year:bg-white peer-checked/year:text-[16px] peer-checked/year:${textColor.mainColor} peer-checked/year:shadow peer-checked/year:transition`}
				>
					연간 구독
				</span>
			</label>
		</fieldset>
	);
}

export default MonthYearChecked;
