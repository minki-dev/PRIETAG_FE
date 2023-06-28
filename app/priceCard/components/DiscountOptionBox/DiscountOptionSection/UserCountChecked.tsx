'use client';
import { updateUserCount, usePriceModal } from '@/store/slice/priceModalSlice';
import React, { useEffect, useRef } from 'react';

function UserCountChecked({ color }: { color: string }) {
	const { priceModal, dispatch } = usePriceModal();

	const [currentUserCount, setCurrentUserCount] = React.useState(1);

	useEffect(() => {
		dispatch(updateUserCount(currentUserCount));
	}, [currentUserCount]);

	const countRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (countRef.current) countRef.current.style.color = color;
	}, [currentUserCount, color]);

	return (
		<label className="flex h-[48px] w-[280px] items-center justify-end gap-[10px] rounded-[24px] bg-[#F6F6F6] pr-[4px] shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.15)]">
			<span>사용자 수</span>
			<div className="flex h-[40px] w-[174px] items-center justify-center gap-[8px] rounded-l-[4px] rounded-r-[22px] bg-white">
				<input
					className={`w-[90px] text-end font-medium outline-none`}
					type="number"
					min="1"
					name="userCount"
					placeholder="0"
					onChange={(e) => setCurrentUserCount(Number(e.target.value))}
					ref={countRef}
				/>
				<span>명</span>
			</div>
		</label>
	);
}

export default UserCountChecked;
