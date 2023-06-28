'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function MoreDropDown() {
	const router = useRouter();
	return (
		<nav className="absolute right-[42px] top-[16px] z-20 w-[120px]  rounded-[4px_4px_4px_4px] bg-white  text-base font-normal  leading-[26px] text-black shadow-[0_0_4px_rgba(0,0,0,0.5)] shadow-[#D9D9D9] sm:w-1/2 xl:w-[160px] ">
			<ul>
				<li
					onClick={() => {
						router.push('/templateList/publish');
					}}
					className="flex h-[40px] w-full cursor-pointer items-center rounded-[4px_4px_0_0] border-b-[1px] border-[#E0E0E0]  hover:bg-[#00A3FF] hover:text-white"
				>
					<span className="absolute left-[16px] ">퍼블리시</span>
				</li>
				<li className="flex h-[40px] w-full cursor-pointer items-center hover:bg-[#00A3FF]  hover:text-white">
					<span className="absolute left-[16px]">복제</span>
				</li>
				<li className="flex h-[40px] w-full cursor-pointer items-center hover:bg-[#00A3FF]  hover:text-white">
					<span className="absolute left-[16px]">삭제</span>
				</li>
				<li className="flex h-[40px] cursor-pointer items-center rounded-[0_0_4px_4px] hover:bg-[#00A3FF]  hover:text-white">
					<span className="absolute left-[16px] ">이름 재설정</span>
				</li>
			</ul>
		</nav>
	);
}

export default MoreDropDown;
