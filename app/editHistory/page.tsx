import RoundedBtn from '@/components/button/RoundedBtn';
import SquareBtn from '@/components/button/SqareBtn';
import Checkbox from '@/components/checkbox/Checkbox';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import Image from 'next/image';
import PaginationBar from '@/components/paginationBar/PaginationBar';

const data = [
	{
		id: 1,
		title: '나름대로 합리적이고 효율적인 가격 정책',
		updated_at: '2023-09-24 15:00',
	},
	{
		id: 2,
		title: '나름대로 합리적이고 효율적인 가격 정책11111',
		updated_at: '2063-03-24 16:00',
	},
	{
		id: 4,
		title: '나름대로 합리적이고 효율적인 가격 정책222222',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 5,
		title: '나름대로 합리적이고 효율적인 가격 정책222222',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 6,
		title: '나름대로 합리적이고 효율적인 가격 정책222222',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 7,
		title: '2312342134정책222222',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 8,
		title: '나asdasdf222',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 9,
		title: '나ererwerewrew22',
		updated_at: '1223-09-24 12:00',
	},
	{
		id: 10,
		title: '나름대로 합리적이고qweqweqwe',
		updated_at: '1223-09-24 12:00',
	},
];
function EidtHistory() {
	return (
		<>
			<Header />
			<div className=" flex min-h-[324px] w-full min-w-[602px] flex-col justify-center bg-[url('/img/splash.svg')] px-[240px]">
				<div className="mt-[72px] min-w-[602px] text-[32px] font-bold text-[#514EDA]">
					편집 히스토리
				</div>
				<div className="mt-[8px] text-[24px] text-black">
					<div className="min-w-[602px]">
						{' '}
						직접 디자인한 가격 정책을 관리하고{' '}
					</div>
					<div className="min-w-[602px]"> 편집해 보세요 </div>

					<Image
						src="/page_pre.svg"
						alt="이전으로 가기"
						width={20}
						height={20}
					/>
				</div>
			</div>
			<div className="h-full min-h-[1331px] w-full  px-[240px]  pt-[80px]">
				<div className="relative flex h-[56px]  w-full min-w-[900px] items-center justify-between">
					<div className="absolute left-0">
						<Image
							src="/page_pre.svg"
							alt="이전으로 가기"
							width={40}
							height={40}
						/>
					</div>
					<button className="shadow-[0_0px_4px_rgba(0, 0, 0, 0.35)] flex  h-[56px] w-[208px] items-center justify-center rounded-[3px] py-[12px] text-[20px] text-[#747474] shadow">
						{' '}
						리스트로 돌아가기
					</button>
					<div className="relative flex h-[46px] w-[400px] items-center justify-between">
						<div className="h-full">
							{' '}
							<input
								placeholder="검색어를 입력해 주세요"
								className="shadow-[0_0px_4px_rgba(0, 0, 0, 0.35)] absolute right-0 mt-[10px] min-w-[400px] rounded-md px-[16px] py-[10px] shadow"
							/>
							<div className="absolute right-[16px] top-[20px]">
								<Image
									src="/search.svg"
									alt="검색하기"
									width={20}
									height={20}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-[40px] h-full w-full min-w-[900px]  border-y-[2px] border-[#989898] ">
					<div className="flex h-[81px] w-full min-w-[900px] items-center justify-between border-[#989898]  bg-[#F9F9F9] px-[16px] ">
						<div className="h-[24px] w-[92px] min-w-[92px] ">
							{' '}
							<Checkbox />{' '}
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
						<div className="mr-[18px] w-[100px] min-w-[28px] text-center">
							편집
						</div>
					</div>
					{data.map((item) => (
						<div
							key={item.id}
							className=" flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474] hover:bg-[#EAF8FF]"
						>
							<div className="h-[24px] w-[92px] min-w-[92px]">
								{' '}
								<Checkbox />{' '}
							</div>

							<div className="w-[127px] min-w-[127px]">{item.updated_at}</div>
							<div className="w-[210px] min-w-[30px] px-[80px]">10.0</div>
							<div className="min-w-[400px]">{item.title}</div>
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
				<div className="relative flex h-[168px] w-full">
					<div className="absolute left-0 top-[28px] ">
						{' '}
						<SquareBtn
							bg="#FF0000"
							textColor="#fff"
							textContent="선택 삭제"
							borderColor="#FF0000"
						/>{' '}
					</div>
					<PaginationBar />{' '}
				</div>
			</div>
			<Footer />{' '}
		</>
	);
}

export default EidtHistory;

{
	/* <div className="h-full min-h-[1331px]  w-full min-w-[1440px] px-[140px]  pt-[76px]">
				<div className="w-full max-w-full overflow-hidden">
					<div>
						<div className="text-5xl font-bold text-[#514EDA]">
							히스토리_편집
						</div>
						<div className="mt-[8px] text-[32px] text-black">
							나름대로 합리적이고 효율적인 가격 정책
						</div>
					</div>
					<div className="w-full py-[56px]">
						<button className="rounded-[3px] border-[1px] border-[#747474] px-[18px] py-[4px] text-center font-medium text-[#747474]">
							리스트로 돌아가기
						</button>
						{data.map((item) => (
							<div
								key={item.id}
								className="mt-[24px] flex h-[97px] 	w-full items-center border-y-1 border-black px-[24px]"
							>
								<Checkbox />
								<div className="flex w-full min-w-[1000px] items-center justify-between">
									<div className=" px-[16px]">
										<div className="text-sm">저장 일시</div>
										<div className=" min-w-[150px] font-medium">
											{item.updated_at}
										</div>
									</div>
									<div className="w-[700px]  pl-[16px]">{item.title}</div>
									<div className="flex min-w-[256px] items-center ">
										<RoundedBtn textContent="사용중" />
										<SquareBtn
											textContent="편집하기"
											textColor="#00A3FF"
											bg="#fff"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div> */
}
