'use client';

import React from 'react';

interface RoundedBtnProps {
	borderColor?: string;
	textColor?: string;
	textContent: string;
	width?: string;
	bg?: string;
}

const RoundedBtn: React.FC<RoundedBtnProps> = ({
	borderColor = '#000',
	textColor = '#fff',
	textContent,
	width = '120px',
	bg = '#000',
}) => {
	return (
		<button
			className=" h-[34px] rounded-[41px] border px-[18px] py-[4px] text-center  font-medium"
			type="button"
			style={{
				width: width,
				borderColor: borderColor,
				color: textColor,
				background: bg,
			}}
		>
			{textContent}
		</button>
	);
};

export default RoundedBtn;
