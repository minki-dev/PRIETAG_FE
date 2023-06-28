import {
	TemplateByDate,
	TemplateByVersion,
	VersionListDataType,
} from '@/store/slice/dashboardSlice';

export type ChartDateType = 'WEEK' | 'MONTH' | 'YEAR';

export type ChartData = {
	[key: string]: string[] | number[];
	labels: string[];
	viewCount: number[];
	leaveCount: number[];
	conversionRate: number[];
};

export function translateChartDataByVersion(
	data: VersionListDataType[],
): ChartData {
	const newData: ChartData = {
		labels: [],
		viewCount: [],
		leaveCount: [],
		conversionRate: [],
	};

	data.forEach((item) => {
		newData.labels.push(item.index.toString());
		newData.viewCount.push(item.viewCount);
		newData.leaveCount.push(item.leaveCount);
		newData.conversionRate.push(item.conversionRate);
	});

	return newData;
}

export function translateChartDataByDate(
	type: ChartDateType,
	data: TemplateByDate[],
): ChartData {
	const translatedData: ChartData = {
		labels: [],
		viewCount: [],
		leaveCount: [],
		conversionRate: [],
	};

	data.forEach((item) => {
		translatedData.labels.push(item.label);
		translatedData.viewCount.push(item.viewCount);
		translatedData.leaveCount.push(item.leaveCount);
		translatedData.conversionRate.push(item.conversionRate);
	});

	return translatedData;
}

