import {
	TemplateByDate,
	TemplateByVersion,
} from '@/store/slice/dashboardSlice';

export const dummyDataByWeek: TemplateByDate[] = [
  {
    label: '2023-05-23',
    viewCount: 421,
    leaveCount: 129,
    conversionRate: ((421 - 129) / 421) * 100,
  },
  // 추가 더미 데이터
  ...Array.from({ length: 6 }, (_, index) => ({
    label: `2023-05-${index * 7 + 23}`,
    viewCount: Math.floor(Math.random() * 1000),
    leaveCount: Math.floor(Math.random() * 200),
    conversionRate: Math.floor(Math.random() * 100),
  })),
];

export const dummyDataByMonth: TemplateByDate[] = [
  {
    label: '2023-05-23',
    viewCount: 421,
    leaveCount: 129,
    conversionRate: ((421 - 129) / 421) * 100,
  },
  // 추가 더미 데이터
  ...Array.from({ length: 5 }, (_, index) => ({
    label: `2023-05-${index * 2 + 6}`,
    viewCount: Math.floor(Math.random() * 1000),
    leaveCount: Math.floor(Math.random() * 200),
    conversionRate: Math.floor(Math.random() * 100),
  })),
];

export const dummyDataByYear: TemplateByDate[] = [
  {
    label: '2023-1',
    viewCount: 421,
    leaveCount: 129,
    conversionRate: ((421 - 129) / 421) * 100,
  },
  // 추가 더미 데이터
  ...Array.from({ length: 11 }, (_, index) => ({
    label: `2023-${index + 2}-23`,
    viewCount: Math.floor(Math.random() * 1000),
    leaveCount: Math.floor(Math.random() * 200),
    conversionRate: Math.floor(Math.random() * 100),
  })),
];


export const dummyDataByVersion: TemplateByVersion[] = [
  {
    publishDate: '2023-05-23',
    versionName: 'version-1',
    id: 1,
    viewCount: 421,
    leaveCount: 129,
    conversionRate: ((421 - 129) / 421) * 100,
    isDeleted: false,
    isPublished: true,
  },
  // 추가 더미 데이터
  ...Array.from({ length: 15 }, (_, index) => ({
    publishDate: `2023-05-${index + 10}`,
    versionName: `version-${index + 2}`,
    id: index + 2,
    viewCount: Math.floor(Math.random() * 1000),
    leaveCount: Math.floor(Math.random() * 200),
    conversionRate: Math.floor(Math.random() * 100),
    isDeleted: index === 4 ? true : false,
    isPublished: false,
  })),
];
