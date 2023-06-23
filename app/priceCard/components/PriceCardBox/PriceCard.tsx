'use client';
import { removeColumn, useFeatureTable } from '@/store/slice/featureTableSlice';
import {
	deletePriceCard,
	updatePriceCard,
	usePriceModal,
	addContent,
} from '@/store/slice/priceModalSlice';
import React, { useEffect, useRef, useState } from 'react';
import PriceCardContent from './PriceCardContent';
import Image from 'next/image';

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
	useEffect(() => {
		setPriceCardInfoEl(priceModal.priceCards[cardIndex]);
	}, [
		priceModal.priceCards[cardIndex].price,
		priceModal.priceCards[cardIndex].discountRate,
		priceModal.priceCards[cardIndex].content,
		priceModal.pricing,
	]);

	// priceCard의 content부분
	const [priceCardContentEl, setPriceCardContentEl] = React.useState(
		priceCardInfoEl.content,
	);

	// detail 부분의 높이
	const detailRef = React.useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (detailRef.current) {
			detailRef.current.style.height = '30px';
			detailRef.current.style.height = priceModal.detailMaxHeight + 'px';
		}
	}, [priceModal.detailMaxHeight]);

	// feature 부분의 높이
	const featureRef = React.useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (featureRef.current) {
			featureRef.current.style.height = '30px';
		}
	}, []);

	const inputHandle = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		name: string,
	) => {
		if (name === 'detail') {
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
		if (featureRef.current) {
			featureRef.current.style.height = '30px';
			featureRef.current.style.height = featureRef.current.scrollHeight + 'px';
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
		priceModal.pricing,
		priceCardInfoEl,
	]);

	const headDiscountCalc = () => {
		//setPriceCardInfoEl(priceModal.priceCards[cardIndex]);
		if (priceModal.pricing === '정량제') {
			// 정량제일 경우 사용자 수 할인 여부와 관계없이 사용자 수 카운트
			if (priceModal.isCheckPerPerson) {
				const headDiscountArr = [...priceModal.headDiscount].sort(
					(a, b) => a.headCount - b.headCount,
				);
				// console.log(headDiscountArr);	// 현재 사용자 수가 level당 설정된 수 미만인 경우만 저장
				const headRateCalc = headDiscountArr.filter(
					(level) => level.headCount > priceModal.userCount,
				);
				// console.log(headRateCalc);	// 조건에 맞는 사용자 수당 할인율이 하나라도 있다면
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
			setCurrentHeadPrice(priceCardInfoEl.price * priceModal.userCount);
		} else {
			setCurrentHeadPrice(priceCardInfoEl.price);
			setCurrentHeadDiscount(0);
		}
	};

	// console.log(currentHeadDiscount);

	// 가격 별 할인 적용
	const [currentTierDiscount, setCurrentTierDiscount] = React.useState(0);

	useEffect(() => {
		setCurrentTierDiscount(priceCardInfoEl.discountRate);
	}, [priceCardInfoEl.discountRate]);

	// 전체 할인율 (초기화는 티어별 할인율로)
	const [discountRate, setDiscountRate] = React.useState(
		priceCardInfoEl.discountRate,
	);
	// 모든 할인이 적용된 가격 (초기화는 티어별 가격으로)
	const [discountPrice, setDiscountPrice] = React.useState(
		priceCardInfoEl.price,
	);

	useEffect(() => {
		discountCalc();
	}, [
		currentHeadDiscount,
		currentHeadPrice,
		currentYearDiscount,
		currentTierDiscount,
		discountRate,
		priceModal.pricing,
		priceModal.monthYearToggle,
		priceModal.userCount,
		priceModal.isCheckPerPerson,
		priceModal.isCheckPerYear,
	]);

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
			currentHeadPrice * (1 - discountRate / 100);
		if (priceModal.isCheckPerYear && priceModal.monthYearToggle) {
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

	const cardRef = useRef<HTMLDivElement>(null);
	const [isCardHovering, setIsCardHovering] = useState(false);
	const titleRef = useRef<HTMLDivElement>(null);
	const [isTitleHovering, setIsTitleHovering] = useState(false);
	const detailHoverRef = useRef<HTMLDivElement>(null);
	const [isDetailHovering, setIsDetailHovering] = useState(false);
	const featureHoverRef = useRef<HTMLDivElement>(null);
	const [isFeatureHovering, setIsFeatureHovering] = useState(false);

	// card
	const cardOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsCardHovering(true);
		if (cardRef.current) cardRef.current.style.border = '2px solid #000000';
	};
	const cardOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsCardHovering(false);
		if (cardRef.current)
			cardRef.current.style.border = '2px solid rgba(0, 0, 0, 0.15)';
	};

	// title
	const titleOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsTitleHovering(true);
		if (titleRef.current) titleRef.current.style.border = '2px solid #000000';
	};
	const titleOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsTitleHovering(false);
		if (titleRef.current)
			titleRef.current.style.border = '2px solid rgba(0, 0, 0, 0)';
	};

	// detail
	const detailOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDetailHovering(true);
		if (detailHoverRef.current)
			detailHoverRef.current.style.border = '2px solid #000000';
	};
	const detailOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDetailHovering(false);
		if (detailHoverRef.current)
			detailHoverRef.current.style.border = '2px solid rgba(0, 0, 0, 0)';
	};

	// feature
	const featureOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsFeatureHovering(true);
		if (featureHoverRef.current)
			featureHoverRef.current.style.border = '2px solid #000000';
	};
	const featureOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsFeatureHovering(false);
		if (featureHoverRef.current)
			featureHoverRef.current.style.border = '2px solid rgba(0, 0, 0, 0)';
	};

	return (
		<div
			onMouseOver={cardOverHoverHandler}
			onMouseOut={cardOutHoverHandler}
			ref={cardRef}
			className="relative flex h-full w-[336px] flex-col items-center justify-between rounded-lg bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.15)]"
		>
			{isCardHovering ? (
				<div className="absolute right-[-11px] top-[-11px] flex cursor-pointer items-center justify-center rounded-full border-2 border-solid border-black bg-white p-[8px]">
					<Image
						src="/icons/close_small.svg"
						alt="close_button"
						width={14}
						height={14}
					/>
				</div>
			) : null}

			<div className="flex w-full flex-col items-center">
				<label
					className={`flex h-[103px] w-full items-center justify-center rounded-t-lg ${bgColor.subColor02}`}
				>
					<div
						className="relative"
						onMouseOver={titleOverHoverHandler}
						onMouseOut={titleOutHoverHandler}
						ref={titleRef}
					>
						{isTitleHovering ? (
							<div className="absolute right-[-11px] top-[-11px] flex cursor-pointer items-center justify-center rounded-full border-2 border-solid border-black bg-white p-[8px]">
								<Image
									src="/icons/close_small.svg"
									alt="close_button"
									width={14}
									height={14}
								/>
							</div>
						) : null}
						<input
							className={`h-[47px] w-[272px] ${bgColor.subColor02} border border-dashed border-[#BCBCBC] px-2 py-1 text-2xl font-medium outline-none`}
							type="text"
							maxLength={12}
							placeholder={`(${cardIndex + 1}번 카드) 요금제 명`}
							onChange={(event) => inputHandle(event, 'title')}
							value={priceCardInfoEl.title}
						/>
					</div>
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
				<div
					onMouseOver={detailOverHoverHandler}
					onMouseOut={detailOutHoverHandler}
					ref={detailHoverRef}
					className="mb-[24px] mt-[16px] flex min-h-[47px] flex-col items-center"
				>
					<textarea
						className="mb-[16px] min-h-[30px] w-[272px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none"
						placeholder="요금제 설명"
						ref={detailRef}
						onChange={(event) => inputHandle(event, 'detail')}
						value={priceCardInfoEl.detail}
					/>
					<div className="w-[256px] border border-[#989898]"></div>
				</div>
				<div className="flex flex-col gap-[2px]">
					<textarea
						className="min-h-[30px] w-[272px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] font-bold outline-none"
						placeholder="타이틀을 입력해 주세요"
						onChange={(event) => inputHandle(event, 'feature')}
						value={priceCardInfoEl.feature}
						ref={featureRef}
					/>
					{priceModal.priceCards[cardIndex].content.map((data, index) => (
						<PriceCardContent cardIndex={cardIndex} contentIndex={index} />
					))}
					<button
						className="h-[30px] w-[272px] border border-dashed border-[#BCBCBC]"
						type="button"
						onClick={() => dispatch(addContent(cardIndex))}
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
