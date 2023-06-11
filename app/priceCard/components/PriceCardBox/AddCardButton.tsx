import React from 'react';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

function AddCardButton({ color }: { color: colorInfo }) {
	const bgColor: colorInfo = {
		mainColor: `bg-[${color.mainColor}]`,
		subColor01: `bg-[${color.subColor01}]`,
		subColor02: `bg-[${color.subColor02}]`,
	};

	return (
		<div className="flex h-[342px] w-[342px] flex-col items-center justify-center gap-[32px] rounded-[16px] shadow-md">
			<div
				className={`flex h-[182px] w-[182px] items-center justify-center ${bgColor.subColor02} rounded-full border border-dashed border-[#BCBCBC]`}
			>
				<div
					className={`flex h-[122px] w-[122px] items-center justify-center ${bgColor.subColor01} rounded-full`}
				>
					<div
						className={`flex h-[62px] w-[62px] items-center justify-center text-[32px] text-white ${bgColor.mainColor} rounded-full`}
					>
						+
					</div>
				</div>
			</div>
			<span className="text-xl font-medium">가격 / 요금제 카드 추가하기</span>
		</div>
	);
}

export default AddCardButton;
