/* eslint-disable no-param-reassign */

'use client';

import React from 'react';
import PriceModalForm from './PriceModalForm';

export default function PriceModal() {
	return (
		<div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<PriceModalForm />
		</div>
	);
}
