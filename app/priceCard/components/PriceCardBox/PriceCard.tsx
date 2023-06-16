'use client';
import {
	deletePriceCard,
	updatePriceCard,
	usePriceCard,
} from '@/store/slice/priceCardSlice';
import { Content } from 'next/font/google';
import React from 'react';

interface priceCardInfo {
	id: string;
	title: string;
	price: number;
	discountRate: number;
	detail: string;
	feature: string;
	content: string[];
}

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
}

// 여기서 가격을 계산해야 한다면
// 월, 연 할인율 / 인원별 할인율 데이터 필요해보임.

function PriceCard({ cardId, color }: { cardId: string; color: colorInfo }) {
	const { priceCard, dispatch } = usePriceCard();

	const [priceCardInfoEl, setPriceCardInfoEl] = React.useState(
		priceCard.priceCards.filter((card) => card.id === cardId)[0],
	);

	const [priceCardContentEl, setPriceCardContentEl] = React.useState(
		priceCardInfoEl.content,
	);

	// const [priceCardInfoEl, setPriceCardInfoEl] = React.useState<priceCardInfo>({
	// 	id: cardId,
	// 	title: '',
	// 	price: 800000,
	// 	discountRate: 10,
	// 	detail: '',
	// 	feature: '',
	// 	content: [''],
	// });

	const inputHandle = (
		event: React.ChangeEvent<HTMLInputElement>,
		name: string,
		index: number,
	) => {
		if (name === 'content') {
			const newPriceCardContentEl = Array.from(priceCardContentEl);
			newPriceCardContentEl[index] = event.target.value;
			setPriceCardContentEl(newPriceCardContentEl);
			setPriceCardInfoEl(
				Object.assign({}, priceCardInfoEl, { [name]: priceCardContentEl }),
			);
		} else {
			setPriceCardInfoEl(
				Object.assign({}, priceCardInfoEl, { [name]: event.target.value }),
			);
		}
		dispatch(updatePriceCard(priceCardInfoEl));
	};

	const discountedPrice = (price: number, discountRate: number) => {
		return ((price * (100 - discountRate)) / 100).toLocaleString('ko-KR');
	};

	const bgColor: colorInfo = {
		mainColor: `bg-[${color.mainColor}]`,
		subColor01: `bg-[${color.subColor01}]`,
		subColor02: `bg-[${color.subColor02}]`,
	};

	const textColor: colorInfo = {
		mainColor: `text-[${color.mainColor}]`,
		subColor01: `text-[${color.subColor01}]`,
		subColor02: `text-[${color.subColor02}]`,
	};

	return (
		<div className="flex min-h-[665px] w-[342px] flex-col items-center rounded-lg bg-white shadow-md">
			<label
				className={`flex h-[79px] w-full items-center justify-center rounded-t-lg ${bgColor.subColor02}`}
			>
				<input
					className={`h-[47px] w-[310px] ${bgColor.subColor02} border border-dashed border-[#BCBCBC] px-2 py-1 text-2xl font-medium outline-none`}
					type="text"
					placeholder="요금제 명을 입력해 주세요"
					onChange={(event) => inputHandle(event, 'title', 0)}
				/>
			</label>
			<div className="flex w-[294px] flex-col gap-[12px] pb-[16px] pt-[12px]">
				<span className={`${textColor.mainColor} text-[32px] font-bold`}>
					{discountedPrice(priceCardInfoEl.price, priceCardInfoEl.discountRate)}
					원 / 년
				</span>
				<div className="flex gap-1">
					<span className="text-[20px] text-[#FF0000]">
						-{priceCardInfoEl.discountRate}%
					</span>
					<span className="text-[20px] text-[#747474] line-through">
						{priceCardInfoEl.price.toLocaleString('ko-KR')}원
					</span>
				</div>
			</div>
			<div className="w-[294px] border border-[#989898]"></div>
			<div className="min-h-[88px] w-[310px] py-[16px]">
				<input
					className="w-[310px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
					type="text"
					placeholder="요금제 설명"
					onChange={(event) => inputHandle(event, 'detail', 0)}
				/>
			</div>
			<div className="w-[294px] border border-[#989898]"></div>
			<div className="flex min-h-[302px] w-[310px] flex-col gap-[2px] py-[24px]">
				<input
					className="w-[310px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px] font-bold outline-none"
					type="text"
					placeholder="포함된 기능"
					onChange={(event) => inputHandle(event, 'feature', 0)}
				/>
				{priceCardContentEl.map((data, index) => (
					<input
						className="w-[310px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
						type="text"
						placeholder="세부 기능을 입력해 주세요"
						value={data}
						onChange={(event) => inputHandle(event, 'content', index)}
					/>
				))}

				<button
					className="w-[310px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px]"
					type="button"
					onClick={() =>
						setPriceCardContentEl([...Array.from(priceCardContentEl), ...['']])
					}
				>
					+
				</button>
			</div>
			<a
				className={`mb-[24px] flex h-[48px] w-[310px] cursor-pointer items-center justify-center rounded-[4px] font-bold text-white ${bgColor.mainColor}`}
				type="button"
				onClick={() => dispatch(deletePriceCard(cardId))}
			>
				구독하기
			</a>
		</div>
	);
}

export default PriceCard;
