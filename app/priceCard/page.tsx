import React from 'react';
import DiscountOptionBox from './components/DiscountOptionBox/DiscountOptionBox';
import PriceCardBox from './components/PriceCardBox/PriceCardBox';

interface editable {
	editable: boolean;
}

function page() {
	return (
		<div>
			<DiscountOptionBox />
			<PriceCardBox />
		</div>
	);
}

export default page;
