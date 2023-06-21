'use client';
import React from 'react';
import DiscountOptionSection from './DiscountOptionSection/DiscountOptionSection';
import ResizablePaddingWithHandle from '../../../../components/ResizablePaddingWithHandle';
import {
	updatePriceCardAreaPadding,
	usePriceModal,
} from '@/store/slice/priceModalSlice';

function DiscountOptionBox() {
	const { dispatch } = usePriceModal();
	const handleHeightUpdate = (height: number) => {
		dispatch(updatePriceCardAreaPadding(height));
	};

	return (
		<div>
			<DiscountOptionSection />
			<ResizablePaddingWithHandle type="inner" onAction={handleHeightUpdate} />
		</div>
	);
}

export default DiscountOptionBox;
