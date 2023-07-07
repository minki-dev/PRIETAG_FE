import React from 'react';
import SummaryCard from './SummaryCard';
import { RxTriangleUp } from 'react-icons/rx';
import { RxTriangleDown } from 'react-icons/rx';
import { StringLiteralLike } from 'typescript';
type Props = {
	className?: String
};

export default function TodaySummary({className}: Props) {
	return (
		<section className={`${className}`}>
			<h2 className='text-xl leading-8 font-ptBold'>Today</h2>
			<span className='text-sm break-keep leading-[22px] text-[#747474]'>진입수와 이탈수는 지난 버전의 일평균 값과 비교합니다.</span>
			<div className="mt-3 relative flex w-[335px] gap-4 sm:w-auto sm:flex-col xl:flex-row xl:justify-between">
				<SummaryCard
					title="진입수"
					subtitle="지난 버전 대비"
					content="150"
					tag={<Tag content="100" direction={'down'} />}
				/>
				<SummaryCard
					title="이탈수"
					subtitle="지난 버전 대비"
					content="150"
					tag={<Tag content="100" direction={'down'} />}
				/>
				<SummaryCard
					title="결제 전환율"
					subtitle="지난 버전 대비"
					content="54%"
					tag={<Tag content="45%" direction={'up'} />}
				/>
			</div>
		</section>
	);
}

function Tag({
	direction,
	content,
}: {
	direction: 'up' | 'down';
	content: string;
}) {
	return (
		<span
			className={`${
				direction === 'up' ? 'text-[#315EFF]' : 'text-[#FF0000]'
			} flex items-center`}
		>
			<>{direction === 'up' ? <RxTriangleUp /> : <RxTriangleDown />}</>
			<span className='leading-[26px]' >{content}</span>
		</span>
	);
}
