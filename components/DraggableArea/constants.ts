export type BoxType = "TITLE" | "SUBTITLE" | "TEXT" | "PADDING"

export const BOX_PROPERTY : {
  [key in BoxType]: {
    height?: string;
    inputHeight?: string;
    textSize?: string;
    minHeight?: number;
    maxHeight?: number;
  }
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
		maxHeight: 200
	}
};

