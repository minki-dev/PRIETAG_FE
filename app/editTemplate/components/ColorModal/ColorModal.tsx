import React from 'react';

import ColorModalForm from './ColorModalForm';

export default function ColorModal() {
	return (
		<div className="fixed top-0 left-0 z-30 flex flex-row items-center justify-center w-full h-full bg-black bg-opacity-50">
			<ColorModalForm />
		</div>
	);
}
