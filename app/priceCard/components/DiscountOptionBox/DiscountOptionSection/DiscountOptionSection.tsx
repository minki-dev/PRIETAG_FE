'use client';
import React from 'react';
import MonthYearChecked from './MonthYearChecked';
import UserCountChecked from './UserCountChecked';
import { usePriceModal } from '@/store/slice/priceModalSlice';
import { useConfig } from '@/store/slice/configSlice';

function DiscountOptionSection() {
	const { priceModal, dispatch } = usePriceModal();
	const { configState } = useConfig();
	const { isPreview, color } = configState;

	return (
		<div
			className={`${
				isPreview ? 'editable-inner-preview' : 'editable-inner'
			} flex justify-center gap-10`}
		>
			{priceModal.isCheckPerYear ? (
				<MonthYearChecked color={color.mainColor} />
			) : null}
			{priceModal.pricing === '정량제' ? (
				<UserCountChecked color={color.mainColor} />
			) : null}
		</div>
	);
}

export default DiscountOptionSection;
