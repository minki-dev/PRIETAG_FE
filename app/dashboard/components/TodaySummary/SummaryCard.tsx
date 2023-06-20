import React from 'react';

type Props = {
	title: string;
	subtitle: string;
	content: string;
	tag: React.ReactNode;
};

export default function SummaryCard({ title, subtitle, content, tag }: Props) {
	return (
		<div className="flex-grow rounded-[10px] bg-white px-6 py-[14px] shadow-md sm:w-[336px] xl:w-1/3">
			<span className="text-[#747474] mr-2 leading-[24px]">{title}</span>
			<span className="text-sm leading-[22px] text-[#989898]">{subtitle}</span>
			<div className="flex">
				<span className="mr-1 leading-[38px] text-2xl">{content}</span>
				{tag}
			</div>
		</div>
	);
}
