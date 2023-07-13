import SquareBtn from '@/components/button/SquareBtn';
import versionSlice, { VersionHistoryType, toggleVersion } from '@/store/slice/versionSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function TableVersionData({
	id,
	title,
	updated_at,
	version,
	_publishing,
	isChecked,
}: VersionHistoryType) {
 
	const dispatch = useDispatch()
	return (
		<tr className="flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px]  text-[#747474] hover:bg-[#c8e5f4]">
			<td className="min-w-[140px]">
				{_publishing ? (
					<SquareBtn
						borderColor="#00A3FF"
						textColor="#00A3FF"
						textContent="퍼블리시중"
						bg="#DEF4FF"
						onClick={() => {}}
					/>
				) : (
					<input
						type="checkbox"
						className="h-[24px] w-[24px]"
						checked={!!isChecked}
						onChange={() => {
							dispatch(toggleVersion({id}));
						}}
					/>
				)}
			</td>

			<td className="min-w-[150px]">{updated_at}</td>
			<td className="min-w-[210px]">{version}</td>
			<td className="min-w-[400px] text-left">{title}</td>

			<td className="flex w-[100px] min-w-[28px] items-center justify-center">
				{_publishing ? (
					<SquareBtn
						textColor="#00A3FF"
						width="88px"
						textContent="퍼블리시중"
						bg="#DEF4FF"
						borderColor="#00A3FF"
						onClick={() => {}}
					/>
				) : (
					<SquareBtn
						textColor="#747474"
						width="88px"
						textContent="편집"
						bg="white"
						borderColor="#747474"
						onClick={() => {
			
						}}
					/>
				)}
			</td>
		</tr>
	);
}
