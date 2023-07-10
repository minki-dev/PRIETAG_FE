'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateButton from './DateButton';
import { selectDate, useDashboard } from '@/store/slice/dashboardSlice';

type Props = {
	className?: string;
};

export default function DatePicker({ className }: Props) {
	const [startDate, setStartDate] = useState(new Date());
	const { dispatch } = useDashboard()

	const handleDateChange = (date: Date, e: React.SyntheticEvent<any, Event> ) => {
		dispatch(selectDate(date.toLocaleString()))
		setStartDate(prev => date)
		//	@TODO trigger fetch{revalidate}
		//				then, update new data list in order to rerender
	}
	return (
		<div
			className={` mb-4 flex items-center justify-between sm:mt-2 ${className ? className : ''}`}
		>
			<div className='relative '>
				<Image
					className='absolute top-[50%] translate-y-[-50%] right-[10px] z-10 '
					src={"datepicker_icon.svg"}
					width={24}
					height={24}
					alt="datepicker icon"
				/>
				<ReactDatePicker
					className="max-w-[196px] shadow-md rounded-[10px] py-2 pl-6 pr-12 text-center font-ptMedium text-xl focus:outline-none"
					showPopperArrow={false}
					selected={startDate}
					onChange={handleDateChange}
					popperPlacement="top-start"
					popperModifiers={[
						{
							name: 'offset',
							options: {
								offset: [0, 0],
							},
						},
					]}
				/>
			</div>
			<span className="text-[#747474] font-ptMedium whitespace-nowrap ml-2 mr-4">기준</span>
			<div className="flex gap-2">
				<DateButton dateBy={'WEEK'} />
				<DateButton dateBy={'MONTH'} />
				<DateButton dateBy={'YEAR'} />
			</div>
		</div>
	);
}
