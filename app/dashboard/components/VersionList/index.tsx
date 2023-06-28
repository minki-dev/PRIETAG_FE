'use client';

import React, { useEffect, useState } from 'react';

import PaginationTab from './PaginationTab';
import DatePicker from '../DatePicker';
import { VersionListDataType, updateVersionListData, useDashboard } from '@/store/slice/dashboardSlice';
import { v4 as uuid } from 'uuid';
import VersionTableRow from './VersionTableRow';

type Props = {
	versionListData: VersionListDataType[];
	className: string;
};


export default function VersionList({ versionListData, className }: Props) {
	const [listLength, setListLength] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);

	const { dispatch } = useDashboard()

	const [currentData, setCurrentData] = useState<VersionListDataType[]>(() => {
		return versionListData.slice(
			currentPage * listLength,
			currentPage * listLength + listLength,
		);
	});

	const handlePrev = () => {
		if (currentPage <= 0) return;
		setCurrentPage((prev) => prev - 1);
	};
	const handleNext = () => {
		if (currentPage >= Math.ceil(versionListData.length / listLength)) return;
		setCurrentPage((prev) => prev + 1);
	};

	const handleLengthChange = () => {
		const newCurrentPage =
			listLength === 10
				? Math.floor((currentPage * 5) / listLength)
				: Math.floor((currentPage * 10) / listLength);
		setCurrentPage(newCurrentPage);
		setCurrentData(() => {
			return versionListData.slice(
				newCurrentPage * listLength,
				newCurrentPage * listLength + listLength,
			);
		});
	};

	useEffect(() => {
		const handleWindowResize = () => {
			window.innerWidth < 1280 ? setListLength(5) : setListLength(10);
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	useEffect(() => {
		handleLengthChange();
	}, [listLength]);

	useEffect(() => {
		setCurrentData(() => {
			const newData = versionListData.slice(
				currentPage * listLength,
				currentPage * listLength + listLength,
			);

			return newData;
		});
	}, [currentPage, listLength]);

	useEffect(() => {
		dispatch(updateVersionListData(currentData))
	}, [currentPage, currentData])
	return (
		<section className={`flex h-full flex-col justify-between ${className}`}>
			<DatePicker className="self-end w-fit xl:w-full " />
			<div className="relative flex h-full flex-col rounded-[10px] bg-white p-4 shadow-md sm:w-auto ">
				<h2 className="text-xl leading-8 font-ptBold whitespace-nowrap">
					History
				</h2>

				<table className="text-sm table-fixed sm:whitespace-normal sm:text-base">
					<thead className="text-[#747474]' font-ptRegular h-14 border-b-2 border-b-[#1667DB] font-normal">
						<tr className="">
							<th className="p-4 text-center whitespace-nowrap ">번호</th>
							<th className="p-4 whitespace-nowrap text-start">
								퍼블리시 날짜
							</th>
							<th className="p-4 whitespace-nowrap text-start">버전</th>
							<th className="hidden text-center whitespace-nowrap sm:table-cell">
								디자인
							</th>
							<th className="hidden text-center whitespace-nowrap sm:table-cell">
								비교
							</th>
						</tr>
					</thead>
					<tbody className="">
						{currentData.map((data) => (
							<VersionTableRow isPublished={data.isPublished} isDeleted={data.isDeleted} data={data} index={data.index} key={uuid()} />
						))}
					</tbody>
				</table>
				<div className="flex-grow"></div>
				<div className="mx-auto xl:mt-6">
					<PaginationTab
						prev={handlePrev}
						next={handleNext}
						currentPage={currentPage}
						maxPage={Math.ceil(versionListData.length / listLength)}
					/>
				</div>
			</div>
		</section>
	);
}
