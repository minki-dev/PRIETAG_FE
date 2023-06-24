import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';

const data = [
	{ id: 1, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 2, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 3, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 4, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 5, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 6, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 7, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 8, title: '저번에 만들었나', date: '2023.05.31.15:00' },
	{ id: 9, title: '저번에 만들었나', date: '2023.05.31.15:00' },
];

export default function PriceTable() {
	return (
		<>
			<Header />

			{/* subheader */}
			<div className=" flex min-h-[324px] w-full min-w-[602px] flex-col justify-center bg-[url('/img/splash.svg')] px-[240px]">
				<div className="mt-[72px] min-w-[602px] text-[32px] font-bold text-black">
					가격 정책표 리스트
				</div>
				<div className="mt-[8px] text-[24px] text-black">
					<div className="min-w-[602px]">
						{' '}
						원하는 가격 정책표를 코딩 없이 만들어 관리하고
					</div>
					<div className="min-w-[602px]"> 홈페이지에 게시해보세요! </div>
				</div>
			</div>

			<div className="h-full  w-full   px-[240px] pb-[240px] pt-[80px]">
				<div className="flex h-[120px] w-full min-w-[1440px] items-center  justify-between">
					<button className="  flex h-[58px]  w-[262px] justify-center rounded-lg border border-stone-300 bg-white p-4">
						<div>
							{' '}
							<img
								src="/img/edit.svg"
								className=" object-cover "
								alt="연결느림 이미지"
							/>{' '}
						</div>
						<div>ㅇㅇㅇㅇ</div>
						<div>
							{' '}
							<img
								src="/img/create.svg"
								className=" object-cover "
								alt="연결느림 이미지"
							/>{' '}
						</div>
					</button>
					<select className=" my-auto h-[42px] w-[166px]">
						<option>정렬기준</option>
						<option>최종편집일시</option>
						<option>요금제명</option>
					</select>
				</div>

				<div className=" grid min-w-[1440px] grid-cols-3 grid-rows-3 gap-[80px]">
					{data.map((item) => (
						<div
							key={data.id}
							className="border-[#E0E0E0 ] box-border h-[413px] w-[427px] cursor-pointer rounded-[16px] border-[1px] bg-white hover:border-[8px] hover:border-[#9CDCFF]"
						>
							<div className="h-[72px]"></div>
							<div className="h-[calc(100%-72px-112px)] bg-blue-100">
								가격표 이미지 넣을 공간
							</div>
							<div className="h-[112px]">
								<div>{item.title}</div>
								<div>{item.date}</div>
							</div>
						</div>
					))}
				</div>

				{/* <div className="grid grid-cols-3 gap-[82px]">
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							1
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							2
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							3
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							4
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							5
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							6
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							7
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							8
						</div>
						<div className="h-[413px] w-[427px] border border-solid border-[#BCBCBC]">
							9
						</div>
					</div> */}
			</div>
			{/* </div> */}
			<Footer />
		</>
	);
}
