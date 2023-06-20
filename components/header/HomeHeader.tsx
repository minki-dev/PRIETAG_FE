import React from 'react';
import Image from 'next/image';

function HomeHeader() {
	return (
		<div className="relative h-[72px] w-full ">
			<div className="shadow-[0_1px_3px_rgba(0, 0, 0, 0.15)] absolute z-20 flex h-[72px] w-full items-center justify-center bg-[#FFF] shadow">
				<div className="flex h-full w-[calc(100%-80px)] items-center justify-between">
					<div className=" min-w-[100px]">
						{' '}
						<Image
							src="/img/ezfee.svg"
							alt="로고 이미지"
							width={93.81}
							height={32}
						/>{' '}
					</div>

					<div className=" h-[72px] min-w-[240px] shrink-0">
						<nav className="h-full">
							<ul className="flex h-full cursor-pointer  justify-between text-[16px]">
								<div className="hover:border-opacity-1 flex h-full w-[92px] items-center justify-center border-opacity-0 hover:border-b-2 hover:border-b-black">
									<li className=" hover:font-medium">홈</li>
								</div>
								<div className="hover:border-opacity-1  mx-[67px] flex h-full w-[92px] items-center justify-center border-opacity-0 hover:border-b-2 hover:border-b-black">
									<li className=" hover:font-medium">템플릿 편집</li>
								</div>
								<div className="hover:border-opacity-1 flex h-full w-[92px] items-center justify-center border-opacity-0 hover:border-b-2 hover:border-b-black">
									<li className=" hover:font-medium">대시 보드</li>
								</div>
							</ul>
						</nav>
					</div>
					<button className=" flex h-[34px] min-w-[135px] items-center text-[#989898]">
						<Image
							src="/img/icon_account.svg"
							alt="유저프로필"
							width={32}
							height={32}
							className="mr-[8px]"
						/>{' '}
						나의 계정 정보
					</button>
				</div>
			</div>
		</div>
	);
}

export default HomeHeader;
