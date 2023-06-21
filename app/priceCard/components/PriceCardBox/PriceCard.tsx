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

	// 월간, 연간 할인율
	const [currentYearDiscount, setCurrentYearDiscount] = React.useState(0);

	useEffect(() => {
		yearDiscountCalc();
	}, [
		priceModal.monthYearToggle,
		priceModal.isCheckPerYear,
		priceModal.yearDiscountRate,
	]);

	const yearDiscountCalc = () => {
		if (priceModal.isCheckPerYear && priceModal.monthYearToggle) {
			setCurrentYearDiscount(priceModal.yearDiscountRate);
		} else {
			setCurrentYearDiscount(0);
		}
	};
	// console.log(currentYearDiscount);

	// 사용자 수 별 할인율
	const [currentHeadDiscount, setCurrentHeadDiscount] = React.useState(0);
	// 사용자 수 별 가격
	const [currentHeadPrice, setCurrentHeadPrice] = React.useState(
		priceCardInfoEl.price,
	);

	useEffect(() => {
		headDiscountCalc();
	}, [
		priceModal.userCount,
		priceModal.isCheckPerPerson,
		priceModal.headDiscount,
	]);

	const headDiscountCalc = () => {
		//setPriceCardInfoEl(priceModal.priceCards[cardIndex]);
		if (priceModal.isCheckPerPerson) {
			const headDiscountArr = [...priceModal.headDiscount].sort(
				(a, b) => a.headCount - b.headCount,
			);
			// console.log(headDiscountArr);
			const headRateCalc = headDiscountArr.filter(
				(level) => level.headCount > priceModal.userCount,
			);
			// console.log(headRateCalc);
			if (headRateCalc.length !== 0) {
				setCurrentHeadDiscount(headRateCalc[0].discountRate);
			} else {
				setCurrentHeadDiscount(
					headDiscountArr[headDiscountArr.length - 1].discountRate,
				);
			}
			setCurrentHeadPrice(priceCardInfoEl.price * priceModal.userCount);
		} else {
			setCurrentHeadDiscount(0);
			setCurrentHeadPrice(priceCardInfoEl.price);
		}
	};

	// console.log(currentHeadDiscount);

	// 가격 별 할인 적용
	const [currentTierDiscount, setCurrentTierDiscount] = React.useState(0);

	useEffect(() => {
		tierDiscountCalc();
	}, [priceModal.isCheckPerTier, priceModal.tierDiscount]);

	const tierDiscountCalc = () => {
		if (priceModal.isCheckPerTier) {
			setCurrentTierDiscount(priceCardInfoEl.discountRate);
		} else {
			setCurrentTierDiscount(0);
		}
	};

	// 전체 할인율
	const [discountRate, setDiscountRate] = React.useState(
		priceCardInfoEl.discountRate,
	);
	// 모든 할인이 적용된 가격
	const [discountPrice, setDiscountPrice] = React.useState(
		priceCardInfoEl.price,
	);

	useEffect(() => {
		discountCalc();
	}, [currentHeadDiscount, currentYearDiscount, currentTierDiscount]);

	const discountCalc = () => {
		//setPriceCardInfoEl(priceModal.priceCards[cardIndex]);
		const sumDiscountRate: number =
			currentTierDiscount + currentYearDiscount + currentHeadDiscount;
		if (sumDiscountRate > 100) {
			setDiscountRate(100);
		} else {
			setDiscountRate(sumDiscountRate);
		}
		const sumDiscountPrice: number =
			(currentHeadPrice * (100 - discountRate)) / 100;
		if (priceModal.monthYearToggle) {
			setDiscountPrice(sumDiscountPrice * 12);
		} else {
			setDiscountPrice(sumDiscountPrice);
		}
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
		<div className="flex h-full w-[336px] flex-col items-center justify-between rounded-lg bg-white shadow-md">
			<div className="flex w-full flex-col items-center">
				<label
					className={`flex h-[103px] w-full items-center justify-center rounded-t-lg ${bgColor.subColor02}`}
				>
					<input
						className={`h-[47px] w-[272px] ${bgColor.subColor02} border border-dashed border-[#BCBCBC] px-2 py-1 text-2xl font-medium outline-none`}
						type="text"
						maxLength={12}
						placeholder={`(${cardIndex + 1}번 카드) 요금제 명`}
						onChange={(event) => inputHandle(event, 'title', 0)}
					/>
				</label>
				<div className="mb-[16px] mt-[24px] flex h-[96px] w-[256px] flex-col justify-between">
					<span className="text-[32px] font-bold">
						{discountPrice.toLocaleString('ko-KR')}원/
						{priceModal.isCheckPerYear && priceModal.monthYearToggle
							? '연'
							: '월'}
					</span>
					<div className="flex gap-1">
						{priceCardInfoEl.price ? ( // 가격 설정 유무
							<>
								{discountRate ? ( // 할인 유무
									<>
										<span className="text-[20px] text-[#FF0000]">
											-{discountRate}%
										</span>
										<span className="text-[20px] text-[#747474] line-through">
											{priceModal.isCheckPerYear && priceModal.monthYearToggle // 연간 구독 여부
												? (currentHeadPrice * 12).toLocaleString('ko-KR')
												: currentHeadPrice.toLocaleString('ko-KR')}
											{/* 연간 구독 X */}원
										</span>
									</>
								) : (
									// 할인 X
									<span className="text-[20px] text-[#747474]">
										할인제도 없음
									</span>
								)}
							</> // 가격 설정 X
						) : null}
					</div>
				</div>
				<div className="w-[256px] border border-[#989898]"></div>
				<div className="mb-[24px] mt-[16px] flex min-h-[47px] flex-col items-center">
					<textarea
						className="mb-[16px] w-[272px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
						placeholder="요금제 설명"
						ref={detailRef}
						onChange={(event) => inputHandle(event, 'detail', 0)}
					/>
					<div className="w-[256px] border border-[#989898]"></div>
				</div>

				<div className="flex flex-col gap-[2px]">
					<input
						className="h-[30px] w-[272px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px] font-bold outline-none"
						type="text"
						placeholder="포함된 기능"
						maxLength={17}
						onChange={(event) => inputHandle(event, 'feature', 0)}
					/>
					{priceCardContentEl.map((data, index) => (
						<input
							className="h-[30px] w-[272px] border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
							type="text"
							placeholder="세부 기능을 입력해 주세요"
							maxLength={17}
							value={data}
							onChange={(event) => inputHandle(event, 'content', index)}
						/>
					))}
					<button
						className="h-[30px] w-[272px] border border-dashed border-[#BCBCBC]"
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
				className={`my-[40px] flex h-[48px] w-[256px] cursor-pointer items-center justify-center rounded-[4px] font-bold text-white ${bgColor.mainColor}`}
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
