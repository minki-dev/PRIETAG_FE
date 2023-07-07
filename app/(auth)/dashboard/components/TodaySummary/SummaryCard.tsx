import React from 'react';

type Props = {
	title: string;
	subtitle: string;
	content: string;
	tag: React.ReactNode;
};

export default function SummaryCard({ title, subtitle, content, tag }: Props) {
	return (
		<div className="w-1/3 sm:w-auto flex-grow rounded-[10px] bg-white px-3 py-2 sm:px-6 sm:py-[14px] shadow-md  xl:w-1/3">
			<span className="text-[#747474] mr-2 whitespace-nowrap leading-[24px]">{title}</span>
			<span className="text-sm hidden sm:block leading-[22px] text-[#989898]">{subtitle}</span>
			<div className="flex">
				<span className="sm:mr-1 leading-[38px] sm:text-2xl">{computeScale(content)}</span>
				{tag}
			</div>
		</div>
	);
}

function computeScale(value: string) {
  const numericValue = parseFloat(value);
  let scaledValue = '';

  if (numericValue >= 1000000) {
    scaledValue = Number(numericValue / 1000000).toFixed(1) + 'm';
  } else if (numericValue >= 1000) {
    scaledValue = Number(numericValue / 1000).toFixed(1) + 'k';
  } else {
    scaledValue = numericValue.toString();
  }

  return scaledValue;
}
