import Image from 'next/image';
import React from 'react';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function PaginationBar() {
	return (
		<div className="absolute left-1/2  top-1/2 flex h-[40px] w-[500px] -translate-x-1/2 -translate-y-1/2 cursor-pointer">
			<Image
				src="/img/page_first.svg"
				alt="로고 이미지"
				width={40}
				height={40}
			/>
			<Image src="/img/page_pre.svg" alt="로고 이미지" width={40} height={40} />

			{arr.map((item, number) => (
				<div
					key={number}
					className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-[#00A3FF] hover:font-bold hover:text-[#fff]"
				>
					{item}
				</div>
			))}
			<Image src="/img/page_end.svg" alt="로고 이미지" width={40} height={40} />
			<Image
				src="/img/page_next.svg"
				alt="로고 이미지"
				width={40}
				height={40}
			/>
		</div>
	);
}

export default PaginationBar;
