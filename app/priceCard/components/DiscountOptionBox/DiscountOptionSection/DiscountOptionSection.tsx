'use client';
import React from 'react';
import MonthYearChecked from './MonthYearChecked';
import UserCountChecked from './UserCountChecked';

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

	return (
		<div className="flex justify-center gap-10">
			<MonthYearChecked color={colorInfoEl} />
			<UserCountChecked color={colorInfoEl} />
		</div>
	);
}

export default DiscountOptionSection;
