import Header from '@/components/header/Header';
import React from 'react';
import TodaySummary from './components/TodaySummary';
import DatePicker from './components/DatePicker';
import ChartByDate from './components/ChartByDate';
import ChartByVersion from './components/ChartByVersion';
import ComparisonChart from './components/ComparisonChart';
import VersionList from './components/VersionList';

export default function Dashboard() {
	return (
		<main className='w-full mx-auto'>
			<h1>Dashboard</h1>
			<div className='sm:inner-tablet xl:inner-pc  grid xl:grid-cols-[952px,_464px]'>
			<TodaySummary />
			<DatePicker />
			<ChartByDate />
			<VersionList />
			<ChartByVersion />
			<ComparisonChart />
			</div>
		</main>
	);
}
