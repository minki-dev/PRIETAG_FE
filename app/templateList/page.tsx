import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import Image from 'next/image';
import priceOptions from './components/priceOptions';

interface DataItem {
	id: number;
	title: string;
	date: string;
}

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
				<div className="mt-[8px] text-[24px] text-[#747474]">
					<div className="min-w-[602px]">
						{' '}
						원하는 가격 정책표를 코딩 없이 만들어 관리하고
					</div>
					<div className="min-w-[602px]">
						{' '}
						웹사이트(홈페이지)에 게시해보세요!{' '}
					</div>
				</div>
			</div>
			<div className="h-full  w-full   px-[240px] pb-[240px] pt-[80px]">
				<div className="flex h-[120px] w-full min-w-[900px] items-center  justify-between">
					<button className="  flex h-[58px]  w-[262px] justify-around rounded-lg border border-stone-300 bg-white p-4">
						<div>
							{' '}
							<Image
								src="/img/edit.svg"
								width={24}
								height={24}
								className=" object-cover "
								alt="연"
							/>{' '}
						</div>
						<div>새로운 가격표 만들기</div>
						<div>
							{' '}
							<Image
								src="/img/create.svg"
								width={24}
								height={24}
								className=" object-cover "
								alt="연"
							/>{' '}
						</div>
					</button>
					<select className=" my-auto h-[42px] w-[166px]">
						<option>정렬기준</option>
						<option>최종편집일시</option>
						<option>요금제명</option>
					</select>
				</div>
				<div className=" grid min-w-[900px] grid-cols-[repeat(3,minmax(100px,413px))] grid-rows-[repeat(3,minmax(100px,327px))] justify-evenly gap-[80px] ">
					{data.map((item: DataItem) => (
						<div
							key={item.id}
							className="border-[#E0E0E0 ]   box-border  cursor-pointer  rounded-[16px] border-[1px]  bg-white outline-8 outline-offset-0 outline-[#9CDCFF] hover:outline"
						>
							<div className="h-[72px] "></div>
							<div className="h-[calc(100%-72px-112px)] bg-blue-100">
								가격표 이미지 넣을 공간
							</div>
							<div className="relative flex">
								<div className="relative left-[24px] top-[16px] h-[80px] ">
									<div className="h-[26px] overflow-hidden text-[16px] font-medium leading-relaxed">
										{item.title}
									</div>
									<div className="pt-[8px] text-[14px] font-normal leading-snug text-neutral-500">
										최종편집일시
									</div>
									<div className="leading-0  text-[14px] font-normal">
										{item.date}
									</div>
								</div>
								<div className="relative left-[15px] h-[20px] w-[4px] pt-[65px]">
									<button type="button" cursor-autor="true">
										<Image
											src="/img/menu_dots.svg"
											width={4}
											height={20}
											alt="옵션 메뉴"
										/>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
}
