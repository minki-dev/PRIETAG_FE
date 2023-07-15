'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateItem } from '@/constants/template';
import Link from 'next/link';

import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import MoreDropDown from './components/MoreDropDown';
import ViewDropDown from './components/ViewDropDown';
import ToggleDropDown from './components/ToggleDropDown';
import Pagination from './components/Pagination';
import { useCookies } from 'react-cookie';
import { getTemplateList } from '@/fetch/auth/templateList/templateList';

export default function TemplateList() {
	const [viewIsClicked, setViewIsClicked] = useState<boolean>(false);
	const [templates, setTemplates] = useState<TemplateItem[]>([]);
	const [sortStandard, setSortStandard] = useState<string>('정렬기준');
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);

	const router = useRouter();
	const [cookie, setCookie] = useCookies();
	const handleMoreClick = (
		id: number,
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		setTemplates((prev) => {
			return prev.map((item) => {
				if (item.id === id) item.moreIsClicked = !item.moreIsClicked;
				return item;
			});
		});
	};

	const onSortByName = () => {
		setTemplates((prev) =>
			[...prev].sort((a, b) => {
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				}
				if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				}
				return 0;
			}),
		);
	};
	const onFinalEditDate = () => {
		setTemplates((prev) =>
			[...prev].sort((a, b) => {
				if (
					new Date(formatDate(a.updated_at)) <
					new Date(formatDate(b.updated_at))
				) {
					return -1;
				}
				if (
					new Date(formatDate(a.updated_at)) >
					new Date(formatDate(b.updated_at))
				) {
					return 1;
				}
				return 0;
			}),
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getTemplateList({
					pageNumber: currentPage,
					pageSize: 9,
				});
				if (res) {
					const { totalCount, template } = res;
					if (template.length > 0) {
						const templateData: TemplateItem[] = template.map(
							(template: {
								id: number;
								title: string;
								updated_at: string;
								image: string;
							}) => {
								return { ...template, moreIsClicked: false };
							},
						);
						setTemplates(templateData);
						setTotalPages(Math.ceil(totalCount / 9));
					}
				}
			} catch (err) {
				console.dir(err);
			}
		};

		fetchData();
	}, [currentPage]);
	return (
		<Suspense fallback={<p>...Loading</p>}>
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
						<div className="cursor-pointer p-[8px]">{sortStandard}</div>
						<div>
							<ToggleDropDown viewIsClicked={viewIsClicked} />
						</div>
						{viewIsClicked ? (
							<ViewDropDown
								onSortByName={onSortByName}
								onFinalEditDate={onFinalEditDate}
								setSortStandard={setSortStandard}
								setViewIsClicked={setViewIsClicked}
								currentPage={currentPage}
							/>
						) : null}
					</div>
				</div>
				<div className=" grid min-w-[900px] grid-cols-[repeat(3,minmax(100px,413px))] grid-rows-[repeat(3,minmax(100px,327px))] justify-evenly gap-[80px] ">
					{templates &&
						templates.map((item: TemplateItem) => (
							<Link
								key={item.id}
								className="border-[#E0E0E0 ]   box-border  cursor-pointer  rounded-[16px] border-[1px]  bg-white outline-8 outline-offset-0 outline-[#9CDCFF] hover:outline"
								href={`/templateList/${item.id}`}
							>
								<div className="h-[72px] p-[24px]"></div>
								<div className="flex h-[calc(100%-72px-112px)] items-center justify-center">
									<Image
										src="/img/a.png"
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
										{item.updated_at}
									</div>
									<div className="relative  bottom-[10px] h-[30px]  w-full">
										<button
											type="button"
											className="absolute -right-[30px] bottom-[20px] h-[30px] w-[30px] cursor-pointer "
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												handleMoreClick(item.id, e);
											}}
										>
											<Image
												src="/img/menu_dots.svg"
												width={4}
												height={20}
												alt="더보기"
											/>
										</button>
									</div>
									{item.moreIsClicked ? <MoreDropDown /> : null}
								</div>
							</Link>
						))}
				</div>{' '}
				<div className="relative flex h-[168px] w-full justify-center">
					<div className="flex items-center">
						<nav className="flex">
							<Pagination
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								totalPages={totalPages}
							/>
						</nav>
					</div>
				</div>
			</div>

			<Footer />
		</Suspense>
	);
}

function formatDate(dateString: string) {
	var dateParts = dateString.split('.');
	var year = dateParts[0];
	var month = dateParts[1];
	var day = dateParts[2];

	return year + '-' + month + '-' + day;
}
