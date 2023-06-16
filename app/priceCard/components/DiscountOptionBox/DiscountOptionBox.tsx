'use client';
import React from 'react';
import DiscountOptionSection from './DiscountOptionSection/DiscountOptionSection';
import ResizablePaddingWithHandle from '../../../../components/ResizablePaddingWithHandle';


function DiscountOptionBox() {
	
  const handleHeightUpdate = (height: number) => {
		// const { updateCardPaddingHeight } = useCard()
		// dispatch(updateCardPaddingHeight({ height }))
	}

	return (
		<div>
			<DiscountOptionSection />
			<ResizablePaddingWithHandle
				type="inner"
				onAction={handleHeightUpdate}
			/>
		</div>
	);
}

export default DiscountOptionBox;
