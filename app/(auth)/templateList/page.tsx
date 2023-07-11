'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MoreDropDown from './components/MoreDropDown';
import ViewDropDown from './components/ViewDropDown';
import ToggleDropDown from './components/ToggleDropDown';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	toggleMoreIsClicked,
	updateTemplateList,
} from '@/store/slice/templateSlice';
import { TemplateItem, VersionTemplateItem } from '@/constants/template';
import { RootState } from '@/store';
import {
	getTemplateList,
	getVersionTemplateList,
} from '@/app/api/auth/templateList/templateList';
import Link from 'next/link';

export default function TemplateList() {
	const [viewIsClicked, setViewIsClicked] = useState<boolean>(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const template = useSelector((state: RootState) => state.template);
	const handleMoreClick = (id: number) => {
		dispatch(toggleMoreIsClicked({ id }));
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await getTemplateList({ pageNumber: 0, pageSize: 10 });
			const { totalCount, template } = res;
			
			if (template.length > 0) {
				const templateData: TemplateItem[] = template.map((template: VersionTemplateItem) => {
					return {
						id: template.id,
						title: template.title,
						date: template.updated_at,
						moreIsClicked: false,
						image: template.image,
					};
				});
				dispatch(updateTemplateList(templateData));
			
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<Header />
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
			<div className="h-full  w-full   bg-[#F7F8FC] px-[240px] pb-[240px] pt-[80px]">
				<div className="flex h-[120px] w-full min-w-[900px] items-center  justify-between">
					<button
						onClick={() => {
							router.push('/editTemplate');
						}}
						className="  flex h-[58px]  w-[262px] justify-around rounded-[10px] border border-stone-300 bg-white p-4"
					>
						<div>
							{' '}
							<Image
								src="/img/edit.svg"
								width={24}
								height={24}
								className="object-cover "
								alt="연필아이콘"
							/>{' '}
						</div>

						<div>새로운 가격표 만들기</div>
						<div>
							{' '}
							<Image
								src="/img/create.svg"
								width={24}
								height={24}
								className="object-cover "
								alt="생성아이콘"
							/>{' '}
						</div>
					</button>
					<div
						onClick={() => {
							setViewIsClicked(!viewIsClicked);
						}}
						className="relative flex h-[26px] w-[166px] items-center justify-between rounded-[4px] border border-[#796161] px-[8px]"
					>
						<div className="p-[8px]"> 정렬기준</div>
						<div>
							<ToggleDropDown viewIsClicked={viewIsClicked} />
						</div>
						{viewIsClicked ? <ViewDropDown /> : null}
					</div>
				</div>
				<div className=" grid min-w-[900px] grid-cols-[repeat(3,minmax(100px,413px))] grid-rows-[repeat(3,minmax(100px,327px))] justify-evenly gap-[80px] ">
					{template.length > 0 &&
						template.map((item: TemplateItem, index: number) => (
							<Link
								key={item.id}
								className="border-[#E0E0E0 ]   box-border  cursor-pointer  rounded-[16px] border-[1px]  bg-white outline-8 outline-offset-0 outline-[#9CDCFF] hover:outline"
								// onClick={(e: React.MouseEvent<HTMLDivElement>) => {
								// 	router.push('/templateList/edit');
								// 	e.stopPropagation();
								// }}
								href={`/templateList/edit/${item.id}`}
							>
								<div className="h-[72px] p-[24px]"></div>
								<div className="flex h-[calc(100%-72px-112px)] items-center justify-center">
									<Image
										src={`${item.image ?? 'icons/close_large.svg'}`}
										width={400}
										height={300}
										alt="가격표"
									/>
								</div>
								<div className="relative flex flex-col justify-center px-[24px] py-[16px]">
									<div className="h-[26px] overflow-hidden text-[16px] font-medium leading-relaxed">
										{item.title}
									</div>
									<div className="pt-[8px] text-[14px] font-normal leading-snug text-neutral-500">
										최종편집일시
									</div>
									<div className="leading-0  text-[14px] font-normal">
										{item.date}
									</div>
									<button
										type="button"
										className="absolute bottom-[16px] right-0  h-[30px] w-[30px] cursor-pointer "
										onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
											handleMoreClick(item.id);
											e.stopPropagation();
										}}
									>
										<Image
											src="/img/menu_dots.svg"
											width={4}
											height={20}
											alt="더보기"
										/>
									</button>
									{item.moreIsClicked ? <MoreDropDown /> : null}
								</div>
							</Link>
						))}
				</div>{' '}
				<div className="relative flex h-[168px] w-full justify-center">
					<div className="flex items-center">
						<button>
							<Image
								src="/img/page_first.svg"
								alt="처음으로"
								width={40}
								height={40}
							/>{' '}
						</button>
						<button>
							<Image
								src="/img/page_pre.svg"
								alt="이전으로"
								width={40}
								height={40}
							/>{' '}
						</button>
						<nav className="flex">
							<button>1</button>
						</nav>
						<button>
							<Image
								src="/img/page_next.svg"
								alt="다음으로"
								width={40}
								height={40}
							/>{' '}
						</button>
						<button>
							<Image
								src="/img/page_end.svg"
								alt="마지막으로"
								width={40}
								height={40}
							/>{' '}
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
