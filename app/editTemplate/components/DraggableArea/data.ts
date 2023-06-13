import { BoxType } from "../../../../constants/box";

export const cardState = {
	cardArea: [
		{
			id: 'title-1',
			placeholder: '가격 정책표 타이틀',
			isPreview: false,
			boxData: {
				role: 'TITLE' as BoxType,
				content: '',
			},
		},
		{
			id: 'subTitle-2',
			placeholder: '소제목',
			isPreview: false,
			boxData: {
				role: 'SUBTITLE' as BoxType,
				content: '',
			},
		},
		{
			id: 'text-1',
			placeholder: '설명',
			isPreview: false,
			boxData: {
				role: 'TEXT' as BoxType,
				content: '',
			},
		},
		{
			id: 'padding',
			isPreview: false,
			boxData: { 
        role: 'PADDING' as BoxType, 
        content: '' 
      },
		},
	],
  cards: [
    {
      // Card data...
    }
  ]
};

export const chartDataToBeReplaced = [
	// Array of Chart 2D Array
	[
		// Chart cols array
		[
			// Chart cell data by row
			'[0][0] Feature.',
			'[0][1] Description.',
			'[0][2] Description.',
			'[0][3] Description.',
			'[0][4] Description.',
		],
		[
			// Chart cell data by row
			'[1][0] Feature.',
			'[1][1] Description.',
			'[1][2] Description.',
			'[1][3] Description.',
			'[1][4] Description.',
		],
		[
			// Chart cell data by row
			'[2][0] Feature.',
			'[2][1] Description.',
			'[2][1] Description.',
			'[2][1] Description.',
			'[2][1] Description.',
		],
	],
];

// 카드 배열 드래그로 reorder할 때 chartData도 업데이트해야함
