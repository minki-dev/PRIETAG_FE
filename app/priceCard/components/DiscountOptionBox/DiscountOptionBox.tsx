'use client';
import React from 'react';
import DiscountOptionSection from './DiscountOptionSection/DiscountOptionSection';
import ResizablePaddingWithHandle from '../../../../components/ResizablePaddingWithHandle';
import {
	updatePriceCardAreaPadding,
	usePriceModal,
} from '@/store/slice/priceModalSlice';

function DiscountOptionBox() {
	const { priceModal, dispatch } = usePriceModal();
	const handleHeightUpdate = (height: number) => {
		dispatch(updatePriceCardAreaPadding(height));
	};

	return (
		<>
			{!priceModal.isCheckPerYear && priceModal.pricing === '정액제' ? null : (
				<div>
					<DiscountOptionSection />
					<ResizablePaddingWithHandle
						type="inner"
						onAction={handleHeightUpdate}
					/>
				</div>
			)}
		</>
	);
}

export default DiscountOptionBox;
