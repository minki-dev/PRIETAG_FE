import Header from '@/components/header/Header';
import React from 'react';
import TodaySummary from './components/TodaySummary';
import DatePicker from './components/DatePicker';
import ChartByDate from './components/ChartByDate';
import ChartByVersion from './components/ChartByVersion';
import ComparisonChart from './components/ComparisonChart';
import VersionList from './components/VersionList';
import Footer from '@/components/footer/Footer';

export default function Dashboard() {
	return (
		<main className="mx-auto w-full">
			<Header />
			<h1>Dashboard</h1>
			<div className="sm:inner-tablet xl:inner-pc  grid xl:grid-cols-[952px,_464px]">
				<TodaySummary />
				<DatePicker />
				<ChartByDate />
				<VersionList />
				<ChartByVersion />
				<ComparisonChart />
			</div>{' '}
			<Footer />
		</main>
	);
}
