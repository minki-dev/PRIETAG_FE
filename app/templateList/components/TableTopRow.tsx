import React, { useEffect, useState } from 'react';

function TableTopRow({
	posts,
	handleAllCheck,
	visiblePosts,
	searchedPosts,
	keyword,
}) {
	const isAllChecked =
		searchedPosts.filter((post) => post.isChecked === true).length ===
		searchedPosts.length;

	// searchedPosts의 isChecked 항목이 전부 true 이면 isAllchecked를 true로 설정하는 코드

	return (
		<div className="flex h-[81px] w-full min-w-[900px] items-center justify-between border-[#989898]  bg-[#F9F9F9] px-[16px] ">
			<div className="h-[24px] w-[92px] min-w-[92px] ">
				{' '}
				<input
					type="checkbox"
					checked={isAllChecked}
					onChange={handleAllCheck}
					className="h-[24px] w-[24px]"
					value={'off' || ''}
				/>
			</div>

			<div className=" flex w-[127px] min-w-[127px] items-center ">
				<select>
					<option>마지막 수정 일시</option>
				</select>
			</div>
			<div className="w-[210px] min-w-[50px] px-[80px]">
				<select>
					<option>버전</option>
				</select>
			</div>
			<div className="min-w-[400px]">
				<select>
					<option>파일명</option>
				</select>
			</div>
			<div className="mr-[18px] w-[100px] min-w-[28px] text-center">편집</div>
		</div>
	);
}

export default TableTopRow;
