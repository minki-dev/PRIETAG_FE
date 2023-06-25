import React, { useEffect } from 'react';
import SquareBtn from '@/components/button/SquareBtn';

function TableList({
	visibleSearchedPosts,
	searchedPosts,
	visiblePosts,
	handleSingleCheck,
	keyword,
	fetchTemplates,
	posts,
}) {
	const visiblePostsToRender =
		keyword !== '' ? visibleSearchedPosts : visiblePosts;

	return (
		<div>
			{visiblePostsToRender.map((post) => (
				<div
					key={post.id}
					className="flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474] hover:bg-[#EAF8FF]"
				>
					<div className="h-[24px] w-[92px] min-w-[92px]">
						<input
							type="checkbox"
							checked={post.isChecked}
							// checked={checkedPosts.includes(post.id)}
							onChange={(e) => handleSingleCheck(e, post.id)}
							className="h-[24px] w-[24px]"
							// value={post.id.toString() || ''}
							// value={false || ''}
						/>
					</div>
					<div className="flex w-[127px] min-w-[127px] ">어쩌구저ㅉ꾸</div>
					<div className="w-[210px] min-w-[30px]  px-[80px]">{post.id}.0</div>
					<div className=" flex w-[400px] truncate">
						{post.title
							.split(new RegExp(`(${keyword})`, 'gi'))
							.map((part, index) => (
								<span
									key={index}
									style={{
										color:
											part.toLowerCase() === keyword.toLowerCase()
												? '#00A3FF'
												: '#000000',
										whiteSpace: 'pre',
									}}
								>
									{part}
								</span>
							))}
					</div>
					<div>
						<SquareBtn
							textContent="퍼블리시"
							textColor="#747474"
							width="100px"
							bg="#fff"
							borderColor="#747474"
						/>
					</div>
				</div>
			))}
			{visiblePostsToRender.length === 0 && (
				<div className="flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474]">
					검색된 게시물이 없습니다.
				</div>
			)}
		</div>
	);
}

export default TableList;
