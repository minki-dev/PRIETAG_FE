'use client';
import { removeColumn, useFeatureTable } from '@/store/slice/featureTableSlice';
import {
	deletePriceCard,
	updatePriceCard,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import React, { useEffect } from 'react';

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

function PriceCard({
	cardIndex,
	color,
}: {
	cardIndex: number;
	color: colorInfo;
}) {
	const { priceModal, dispatch } = usePriceModal();
	const { dispatch: featureTableDispatch } = useFeatureTable();

	// priceCard 전체 정보
	const [priceCardInfoEl, setPriceCardInfoEl] = React.useState(
		priceModal.priceCards[cardIndex],
	);
	// priceCard의 content부분
	const [priceCardContentEl, setPriceCardContentEl] = React.useState(
		priceCardInfoEl.content,
	);

	const detailRef = React.useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (detailRef.current) {
			detailRef.current.style.height = priceModal.detailMaxHeight + 'px';
		}
	});

	const inputHandle = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		name: string,
		index: number,
	) => {
		if (name === 'content') {
			const newPriceCardContentEl = Array.from(priceCardContentEl);
			newPriceCardContentEl[index] = event.target.value;
			setPriceCardContentEl(newPriceCardContentEl);
			setPriceCardInfoEl(
				Object.assign({}, priceCardInfoEl, { content: priceCardContentEl }),
			);
		} else if (name === 'detail') {
			if (detailRef.current) {
				detailRef.current.style.height = '30px';
				detailRef.current.style.height = detailRef.current.scrollHeight + 'px';
				setPriceCardInfoEl(
					Object.assign({}, priceCardInfoEl, {
						detail: event.target.value,
						detailHeight: detailRef.current.scrollHeight,
					}),
				);
			}
		} else {
			setPriceCardInfoEl(
				Object.assign({}, priceCardInfoEl, { [name]: event.target.value }),
			);
		}
		dispatch(
			updatePriceCard({
				...{ card: priceCardInfoEl },
				...{ index: cardIndex },
			}),
		);
	};

	const [discountRate, setDiscountRate] = React.useState(
		priceCardInfoEl.discountRate,
	);

	const [discountPrice, setDiscountPrice] = React.useState(
		priceCardInfoEl.price,
	);

	useEffect(() => {
		discountRateCalc();
	}, [priceModal.monthYearToggle]);

	const discountRateCalc = () => {
		if (priceModal.isCheckPerYear && priceModal.monthYearToggle) {
			setDiscountRate(
				priceCardInfoEl.discountRate + priceModal.yearDiscountRate,
			);
			setDiscountPrice(
				((priceCardInfoEl.price * (100 - discountRate)) / 100) * 12,
			);
		} else {
			setDiscountRate(priceCardInfoEl.discountRate);
			setDiscountPrice((priceCardInfoEl.price * (100 - discountRate)) / 100);
		}
	};

	const [currentHeadDiscount, setCurrentHeadDiscount] = React.useState(0);

	useEffect(() => {
		headDiscountCalc();
	}, [priceModal.userCount, priceModal.isCheckPerPerson]);

	const headDiscountCalc = () => {
		if (priceModal.isCheckPerPerson) {
			const headDiscountArr = [...priceModal.headDiscount].sort(
				(a, b) => a.headCount - b.headCount,
			);
			console.log(headDiscountArr);
			const headRateCalc = headDiscountArr.filter(
				(level) => level.headCount > priceModal.userCount,
			);
			console.log(headRateCalc);
			if (headRateCalc.length !== 0) {
				setCurrentHeadDiscount(headRateCalc[0].discountRate);
			} else {
				setCurrentHeadDiscount(
					headDiscountArr[headDiscountArr.length - 1].discountRate,
				);
			}
		} else {
			setCurrentHeadDiscount(0);
		}
	};

	console.log(currentHeadDiscount);

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
		<div className="flex h-full min-h-[665px] w-[342px] flex-col items-center justify-between rounded-lg bg-white shadow-md">
			<div className="flex w-full flex-col items-center">
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
						{discountPrice.toLocaleString('ko-KR')}원/
						{priceModal.monthYearToggle ? '연' : '월'}
					</span>
					<div className="flex gap-1">
						<span className="text-[20px] text-[#FF0000]">-{discountRate}%</span>
						<span className="text-[20px] text-[#747474] line-through">
							{priceCardInfoEl.price
								? priceCardInfoEl.price.toLocaleString('ko-KR') + '원'
								: null}
						</span>
					</div>
				</div>
				<div className="w-[294px] border border-[#989898]"></div>
				<div className="min-h-[30px] w-[310px] py-[16px]">
					<textarea
						className="w-[310px] overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
						placeholder="요금제 설명"
						ref={detailRef}
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
							setPriceCardContentEl([
								...Array.from(priceCardContentEl),
								...[''],
							])
						}
					>
						+
					</button>
				</div>
			</div>
			<a
				className={`mb-[24px] flex h-[48px] w-[310px] cursor-pointer items-center justify-center rounded-[4px] font-bold text-white ${bgColor.mainColor}`}
				type="button"
				onClick={() => {
					dispatch(deletePriceCard(cardIndex));
					featureTableDispatch(removeColumn({ colIndex: cardIndex }));
				}}
			>
				구독하기
			</a>
		</div>
	);
}

export default PriceCard;
