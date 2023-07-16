import React from 'react';
import TodaySummary from './components/TodaySummary';
import ComparisonChart from './components/ComparisonChart';

import { dummyDataByVersion } from './components/VersionList/data';
import VersionChart from './components/VersionChart';
import DateChart from './components/DateChart';
import { translateVersionListData } from '@/constants/versionList';
import VersionList from './components/VersionList';

export default function Dashboard() {
	return (
		<>
			<main className="w-full bg-[#F7F8FC] font-ptRegular">
				<div className="">
					<h1 className="font-ptBold text-[32px] leading-[51px]">Dashboard</h1>
				</div>
				<div className="sm:grid sm:grid-cols-6 sm:gap-x-6 sm:gap-y-6 xl:grid-rows-[repeat(7,_minmax(0,_1fr))]">
					<TodaySummary className="order-1 sm:col-span-2 xl:col-span-4 xl:row-span-1" />
					<VersionList
						versionListData={translateVersionListData(dummyDataByVersion)}
						className="order-3 sm:order-2 sm:col-span-4 xl:col-span-2 xl:col-start-5 xl:row-span-4"
					/>
					<DateChart className="order-2 sm:order-3 sm:col-span-6 xl:col-span-4 xl:row-span-3" />
					<VersionChart className="order-4 hidden sm:col-span-3 sm:block xl:col-span-4 xl:row-span-3" />

					<ComparisonChart className="sm:order-5 sm:col-span-3 xl:col-span-2 xl:col-start-5 xl:row-span-3" />
				</div>
			</main>
		</>
	);
}
