'use client';
import React from 'react';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

function UserCountChecked({ color }: { color: colorInfo }) {
	const textColor: colorInfo = {
		mainColor: `text-[${color.mainColor}]`,
		subColor01: `text-[${color.subColor01}]`,
		subColor02: `text-[${color.subColor02}]`,
	};

	return (
		<label className="flex h-[48px] w-[280px] items-center justify-end gap-[10px] rounded-[24px] bg-[#F6F6F6] pr-[4px] shadow-md">
			<span>사용자 수</span>
			<div className="flex h-[40px] w-[174px] items-center justify-center gap-[8px] rounded-l-[4px] rounded-r-[22px] bg-white">
				<input
					className={`w-[90px] text-end ${textColor.mainColor} font-medium outline-none`}
					type="text"
					name="userCount"
					placeholder="0"
				/>
				<span>명</span>
			</div>
		</label>
	);
}

export default UserCountChecked;