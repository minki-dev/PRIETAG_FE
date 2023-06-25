'use client';

import React from 'react';

interface SquareBtnProps {
	borderColor?: string;
	textColor?: string;
	textContent: string;
	width?: string;
	bg?: string;
	onClick: (() => void) | null;
}

const SquareBtn: React.FC<SquareBtnProps> = ({
	borderColor = '#00A3FF',
	textColor = '#fff',
	textContent,
	width = '120px',
	bg = '#00A3FF',
	onClick,
}) => {
	return (
		<button
			className=" width=[120px] h-[34px] rounded-[3px] border px-[18px] py-[4px] text-center  text-[16px] font-medium"
			type="button"
			style={{
				width: width,
				borderColor: borderColor,
				color: textColor,
				background: bg,
			}}
			onClick={onClick}
		>
			{textContent}
		</button>
	);
};

export default SquareBtn;