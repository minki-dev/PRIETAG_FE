'use client';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LineController,
	BarController,
	PointElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import React, { useEffect, useRef, useState } from 'react';

import type { ChartData, ChartOptions } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Checkbox } from '@/components/ui/checkbox';
import { useDashboard } from '@/store/slice/dashboardSlice';
import { ChartDateType, translateChartDataByDate } from '@/constants/chart';
import {
	dummyDataByMonth,
	dummyDataByWeek,
	dummyDataByYear,
} from './VersionList/data';

type Props = {
	className: string;
};

export default function DateChart({ className }: Props) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
		LineController,
		BarController,
		annotationPlugin,
		PointElement,
	);
	const [isWindowLess, setIsWindowLess] = useState(false);
	const [checked, setChecked] = useState(false);
	const {
		dashboardState: { dateBy },
	} = useDashboard();

	const chartData = translateChartDataByDate(dateBy, getDummyData(dateBy));

	useEffect(() => {
		const handleWindowResize = () => {
			window.innerWidth < 1280 ? setIsWindowLess(true) : setIsWindowLess(false);
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const data: ChartData = {
		labels: chartData.labels,

		datasets: [
			//Dataset 1
			{
				type: 'bar' as const,
				label: '진입수',
				data: chartData.viewCount,
				backgroundColor: '#1667DB',
				borderWidth: 0.1,
				borderRadius: 15,
				pointStyle: 'rectRounded' as const,
				categoryPercentage: 0.2,
				yAxisID: 'y',
				order: 2,
			},
			//Dataset 2
			{
				type: 'bar' as const,
				label: '이탈수',
				data: chartData.leaveCount,
				backgroundColor: '#55CEC7',
				borderWidth: 0.1,
				pointStyle: 'rectRounded' as const,
				borderRadius: 15,
				categoryPercentage: 0.2,
				yAxisID: 'y',
				order: 1,
			},
			//Dataset 3
			{
				type: 'line' as const,
				label: '결제 전환율',

				data: chartData.conversionRate,
				backgroundColor: '#2D3A80',
				borderWidth: 3,
				pointStyle: 'circle' as const,
				pointHoverRadius: 10,

				yAxisID: 'y1',
				order: 0,
				borderColor: '#2D3A80',
				pointRadius: 5,
			},
		],
	};

	const options: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		interaction: {
			mode: 'x',
		},
		plugins: {
			datalabels: {
				display: false,
			},
			legend: {
				display: isWindowLess,
				onClick() {
					return null;
				},
			},
			title: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						if (tooltipItem.datasetIndex === 2) {
							return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
						}
					},
					beforeBody: (tooltipItem) => {
						// console.log(tooltipItem);
						return '';
					},
				},
				usePointStyle: true,
			},
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {},
			y1: {
				position: 'right' as const,
				ticks: {
					callback: (context: any) => {
						return `${context}%`;
					},
				},
				grid: {
					drawOnChartArea: false,
				},
				max: 100,
			},
		},
	};
	const chartRef = useRef<any>(undefined);
	const toggleData = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		index: number,
	) => {
		const dataVisibility = chartRef.current?.isDatasetVisible(index);
		dataVisibility
			? chartRef.current?.hide(index)
			: chartRef.current?.show(index);
		const parentEl = e.currentTarget.parentElement;
		(parentEl?.childNodes[0] as HTMLButtonElement).classList.remove('bg-white');
		e.currentTarget.classList.toggle('bg-white');
	};

	const showAllData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (chartRef.current) {
			for (let i = 0; i < chartRef.current.data.datasets.length; i++) {
				chartRef.current.show(i);
			}
			const parentEl = e.currentTarget.parentElement;
			parentEl?.childNodes.forEach((button, btnIndex) => {
				const btnEl = button as HTMLButtonElement;
				btnIndex === 0
					? btnEl.classList.add('bg-white')
					: btnEl.classList.remove('bg-white');
			});
		}
	};

	const toggleCVROnly = () => {
		if (chartRef.current) {
			checked
				? (() => {
						chartRef.current.show(0);
						chartRef.current.show(1);
				  })()
				: (() => {
						chartRef.current.hide(0);
						chartRef.current.hide(1);
				  })();
			setChecked((prev) => !prev);
		}
	};

	return (
		<section
			className={`flex flex-col justify-between rounded-[10px] bg-white p-6 shadow-md ${className}`}
		>
			<div className="flex justify-between">
				<h2 className="text-xl leading-8 whitespace-nowrap font-ptBold">
					Statistic By Date
				</h2>
				<div className="block ml-2 xl:hidden">
					<Checkbox
						checked={checked}
						onCheckedChange={toggleCVROnly}
						className=""
					/>
					<label htmlFor="toggleChart">결제 전환율만 보기</label>
				</div>
				<div className="hidden w-fit  rounded-[20px] border-1 border-[#EEEEEE] bg-[#F7F7F7] shadow-md xl:flex">
					<button
						onClick={(e) => showAllData(e)}
						className={`basis-1/4 whitespace-nowrap rounded-l-[20px] px-4 text-center`}
						type="button"
					>
						전체
					</button>
					<button
						onClick={(e) => toggleData(e, 0)}
						className={`flex flex-grow basis-1/4 items-center justify-center gap-1 whitespace-nowrap px-4`}
						type="button"
					>
						<div className="box-border h-3 w-3 rounded-[4px] bg-[#1667DB] p-2"></div>
						진입수
					</button>
					<button
						onClick={(e) => toggleData(e, 1)}
						className={`flex flex-grow basis-1/4 items-center justify-center gap-1 whitespace-nowrap px-4`}
						type="button"
					>
						<div className="box-border h-3 w-3 rounded-[4px] bg-[#55CEC7] p-2"></div>
						이탈수
					</button>
					<button
						onClick={(e) => toggleData(e, 2)}
						className={`flex flex-grow basis-1/4 items-center justify-center gap-1 whitespace-nowrap rounded-r-[20px] px-4`}
						type="button"
					>
						<div className="box-border h-[10px] w-[10px] rounded-full bg-[#2D3A80] p-2"></div>
						결제 전환율
					</button>
				</div>
			</div>
			<div className="overflow-x-auto text-center">
				<div className="h-[460px] min-h-[400px]">
					<Chart ref={chartRef} type="bar" options={options} data={data} />
				</div>

				<span className="mt-4 font-ptRegular text-[#BCBCBC]">
					{formatKeyName(dateBy)}
				</span>
			</div>
		</section>
	);
}

function formatKeyName(key: string) {
	const firstLetter = key.slice(0, 1).toUpperCase();
	const rest = key.slice(1).toLocaleLowerCase();
	return firstLetter + rest;
}

function getDummyData(dateBy: ChartDateType) {
	switch (dateBy) {
		case 'WEEK':
			return dummyDataByWeek;
		case 'MONTH':
			return dummyDataByMonth;
		case 'YEAR':
			return dummyDataByYear;

		default:
			console.log('invalid dateBy Type detected');
			return [];
	}
}
