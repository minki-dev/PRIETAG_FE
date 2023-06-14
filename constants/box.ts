import { v4 as uuid } from 'uuid';

export type BoxType = 'TITLE' | 'SUBTITLE' | 'TEXT' | 'PADDING';

export const BOX_PROPERTY: {
	[key in BoxType]: {
		height?: string;
		inputHeight?: string;
		textSize?: string;
		minHeight?: number;
		maxHeight?: number;
	};
} = {
	TITLE: {
		height: 'h-[109px]',
		inputHeight: 'h-[77px]',
		textSize: 'text-[48px]',
	},
	SUBTITLE: {
		height: 'h-[84px]',
		inputHeight: 'h-[52px]',
		textSize: 'text-[36px]',
	},
	TEXT: {
		height: 'h-[58px]',
		inputHeight: 'h-[16px]',
		textSize: 'text-[16px]',
	},
	PADDING: {
		minHeight: 64,
		maxHeight: 200,
	},
};

export function getInitialBoxList(params: {
	title: string;
	subTitle: string;
	text: string;
}) {
	const { title, subTitle, text } = params
	return [
		{
			id: uuid(),
			placeholder: title,
			boxData: {
				role: 'TITLE' as BoxType,
				content: '',
			},
		},
		{
			id: uuid(),
			placeholder: subTitle,
			boxData: {
				role: 'SUBTITLE' as BoxType,
				content: '',
			},
		},
		{
			id: uuid(),
			placeholder: text,
			boxData: {
				role: 'TEXT' as BoxType,
				content: '',
			},
		},
		{
			id: uuid(),
			boxData: {
				role: 'PADDING' as BoxType,
				content: '',
			},
		},
	];
}
