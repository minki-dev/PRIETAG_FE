import React from 'react';
import SquareBtn from '@/components/button/SquareBtn';

function TableList({
	searchedPosts,
	visiblePosts,
	handleSingleCheck,
	keyword,
}) {
	return (
		<div>
			{(searchedPosts.length === 0 || null) &&
				visiblePosts.map((post) => (
					<div
						key={post.id}
						className=" flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474] hover:bg-[#EAF8FF]"
					>
						<div className="h-[24px] w-[92px] min-w-[92px]">
							{' '}
							<input
								type="checkbox"
								checked={post.isChecked}
								onChange={(e) => handleSingleCheck(e, post.id)}
								className="h-[24px] w-[24px]"
							/>
						</div>

						<div className="flex w-[127px] min-w-[127px] ">어쩌구저ㅉ꾸</div>
						<div className=" w-[210px] min-w-[30px]  px-[80px]">
							{post.id}.0
						</div>
						<div className="flex w-[400px]">{post.title}</div>
						<div>
							<SquareBtn
								textContent="편집"
								textColor="#747474"
								width="88px"
								bg="#fff"
								borderColor="#747474"
							/>
						</div>
					</div>
				))}
			{searchedPosts.map((post) => (
				<div
					key={post.id}
					className=" flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474] hover:bg-[#EAF8FF]"
				>
					<div className="h-[24px] w-[92px] min-w-[92px]">
						{' '}
						<input
							type="checkbox"
							checked={post.isChecked}
							onChange={(e) => handleSingleCheck(e, post.id)}
							className="h-[24px] w-[24px]"
						/>
					</div>

					<div className="flex w-[127px] min-w-[127px] ">어쩌구저ㅉ꾸</div>
					<div className=" w-[210px] min-w-[30px]  px-[80px]">{post.id}.0</div>
					<div className="flex w-[400px]">
						{post.title.includes(keyword) ? (
							post.title.split(keyword).map((part, index) => (
								<React.Fragment key={index}>
									{part}
									{index !== post.title.split(keyword).length - 1 && (
										<div style={{ color: '#00A3FF' }}>{keyword}</div>
									)}
								</React.Fragment>
							))
						) : (
							<div>{post.title}</div>
						)}
					</div>
					<div>
						<SquareBtn
							textContent="편집"
							textColor="#747474"
							width="88px"
							bg="#fff"
							borderColor="#747474"
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default TableList;
