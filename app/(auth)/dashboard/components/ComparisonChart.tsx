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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useVersionList } from '@/store/slice/versionListSlice';

interface BarProps {
	options: ChartOptions<'bar'>;
	data: ChartData<'bar'>;
}

export default function ComparisonChart({ className }: { className?: string }) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
		LineController,

		ChartDataLabels,
	);

	const {
		versionListState: { baseVersion, targetVersion },
	} = useVersionList();

	const comparisonChartProps: BarProps = {
		data: {
			labels: ['1', '2', '3'],
			datasets: [
				//Dataset 1
				{
					type: 'bar' as const,
					label: baseVersion ? baseVersion.versionName : '선택 없음',
					data: baseVersion
						? [
								baseVersion.viewCount,
								baseVersion.leaveCount,
								baseVersion.conversionRate,
						  ]
						: [],
					backgroundColor: (context) => {
						if (context.chart.chartArea) {
							const {
								ctx,
								chartArea: { left, right },
							} = context.chart;

							const gradientBg = ctx.createLinearGradient(left, 0, right, 0);
							gradientBg.addColorStop(0.1675, '#438BDF');
							gradientBg.addColorStop(0.7703, '#27BDE6');
							return gradientBg;
						}
						return;
					},
					borderWidth: 1,
					borderRadius: 20,
					categoryPercentage: 0.8,
				},
				{
					type: 'bar' as const,
					label: targetVersion ? targetVersion.versionName : '선택 없음',
					data: targetVersion
						? [
								targetVersion.viewCount,
								targetVersion.leaveCount,
								targetVersion.conversionRate,
						  ]
						: [],
					backgroundColor: (context) => {
						if (context.chart.chartArea) {
							const {
								ctx,
								chartArea: { left, right },
							} = context.chart;

							const gradientBg = ctx.createLinearGradient(left, 0, right, 0);
							gradientBg.addColorStop(0.1675, '#12AD93');
							gradientBg.addColorStop(0.7944, '#02D7CB');
							return gradientBg;
						}
						return;
					},
					borderWidth: 1,
					borderRadius: 20,
					categoryPercentage: 0.8,
				},
			],
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			indexAxis: 'y',
			scales: {
				x: {
					ticks: {
						display: false,
					},

					grid: {
						display: false,
					},
					border: {
						display: false,
					},
					grace: 80,
				},
				y: {
					ticks: {
						display: false,
						callback: (value, index, values) => {
							if (index === 2) {
								// console.log(value, index, values);
							}
							return '';
						},
					},
					grid: {
						display: false,
					},
				},
			},
			plugins: {
				datalabels: {
					align: 'right',
					anchor: 'end',
					font: {
						weight: 'bolder',
					},
					color: 'black',
					formatter: Math.round,
				},
				tooltip: {
					enabled: false,
				},
				legend: {
					onClick() {
						return null;
					},
				},

				title: {
					display: false,
				},
			},
		},
	};

	return (
		<section
			className={`flex w-full flex-col gap-2 rounded-[10px] bg-white p-6 shadow-md ${className}`}
		>
			<h2 className="text-xl leading-8 font-ptBold">Comparison</h2>
			<table className="hidden w-full table-fixed sm:table">
				<thead className="h-14 border-b-2 border-b-[#1667DB]">
					<tr className="text-center font-ptRegular font-medium text-[#747474]">
						<th>버전</th>
						<th>진입수</th>
						<th>이탈수</th>
						<th>개선율</th>
					</tr>
				</thead>
				<tbody className="text-center">
					<tr>
						<td className="px-4 py-2 h-14">{baseVersion?.versionName}</td>
						<td className="px-4 py-2 h-14 ">{baseVersion?.viewCount}</td>
						<td className="px-4 py-2 h-14 ">{baseVersion?.leaveCount}</td>
						<td className="px-4 py-2 h-14">{baseVersion ? '기준' : ''}</td>
					</tr>
					<tr>
						<td className="px-4 py-2 h-14">{targetVersion?.versionName}</td>
						<td className="px-4 py-2 h-14">{targetVersion?.viewCount}</td>
						<td className="px-4 py-2 h-14">{targetVersion?.leaveCount}</td>
						<td
							className={`h-14 px-4 py-2 ${
								baseVersion &&
								targetVersion &&
								(baseVersion?.conversionRate - targetVersion?.conversionRate > 0
									? 'text-[#315EFF]'
									: 'text-[#FF0000]')
							}`}
						>
							{(baseVersion && targetVersion 
							&&
								Math.ceil(
									baseVersion?.conversionRate - targetVersion?.conversionRate,
								)+" %")}
						</td>
					</tr>
				</tbody>
			</table>
			<div className="flex justify-center">
				<div className="flex flex-col pt-6 mr-2 ">
					<div className="flex flex-col items-center justify-center h-1/3 whitespace-nowrap">
						<span className="text-xs leading-5 text-[#989898]">일평균</span>
						<h3>진입수</h3>
					</div>
					<div className="flex flex-col items-center justify-center h-1/3 whitespace-nowrap">
						<span className="text-xs leading-5 text-[#989898]">일평균</span>
						<h3>이탈수</h3>
					</div>
					<div className="flex flex-col items-center justify-center text-center h-1/3">
						<h3 className="">결제 </h3>
						<h3 className=""> 전환율</h3>
					</div>
				</div>
				<div className=" min-h-[240px] rounded-[10px] shadow-md sm:min-w-[400px] sm:max-w-[460px]">
					<Bar {...comparisonChartProps} />
				</div>
			</div>
		</section>
	);
}
