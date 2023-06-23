'use client';
import React from 'react';
import MonthYearChecked from './MonthYearChecked';
import UserCountChecked from './UserCountChecked';
import { usePriceModal } from '@/store/slice/priceModalSlice';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

function DiscountOptionSection() {
	const colorInfoEl: colorInfo = {
		mainColor: '#00A3FF',
		subColor01: '#60C8FF',
		subColor02: '#EAF8FF',
	};
	const { priceModal, dispatch } = usePriceModal();

	return (
		<div className="flex justify-center gap-10">
			{priceModal.isCheckPerYear ? (
				<MonthYearChecked color={colorInfoEl} />
			) : null}
			{priceModal.pricing === '정량제' ? (
				<UserCountChecked color={colorInfoEl} />
			) : null}
		</div>
	);
}

export default DiscountOptionSection;
