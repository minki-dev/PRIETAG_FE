'use client';
import { removeColumn, useFeatureTable } from '@/store/slice/featureTableSlice';
import {
	deletePriceCard,
	updatePriceCard,
	usePriceModal,
	addContent,
	updateCardMaxHeight,
} from '@/store/slice/priceModalSlice';
import React, { useEffect, useRef, useState } from 'react';
import PriceCardContent from './PriceCardContent';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useConfig } from '@/store/slice/configSlice';

interface colorInfo {
	mainColor: string;
	subColor01: string;
	subColor02: string;
	fontColor: string;
}

function PriceCard({
	cardIndex,
	color,
	provided,
}: {
	cardIndex: number;
	color: colorInfo;
	provided: DraggableProvided;
}) {
	const { priceModal, dispatch } = usePriceModal();
	const { dispatch: featureTableDispatch } = useFeatureTable();
	const { configState } = useConfig();

	const { isPreview, previewMode } = configState;

	// priceCard 전체 정보
	const [priceCardInfoEl, setPriceCardInfoEl] = React.useState(
		priceModal.priceCards[cardIndex],
	);
	useEffect(() => {
		setPriceCardInfoEl(priceModal.priceCards[cardIndex]);
	}, [
		priceModal.priceCards[cardIndex].price,
		priceModal.priceCards[cardIndex].discountRate,
		//priceModal.priceCards[cardIndex].content,
		priceModal.pricing,
	]);

	// priceCard의 content부분
	const [priceCardContentEl, setPriceCardContentEl] = React.useState(
		priceModal.priceCards[cardIndex].content,
	);
	useEffect(() => {
		setPriceCardContentEl(priceModal.priceCards[cardIndex].content);
	}, [priceModal.priceCards[cardIndex].content]);

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
				const newValue = Object.assign({}, priceCardInfoEl, {
					detail: event.target.value,
					detailHeight: detailRef.current.scrollHeight,
				});
				setPriceCardInfoEl(newValue);
				dispatch(
					updatePriceCard({
						index: cardIndex,
						card: newValue,
					}),
				);
			}
		} else {
			const newValue = Object.assign({}, priceCardInfoEl, {
				[name]: event.target.value,
			});
			setPriceCardInfoEl(newValue);
			dispatch(
				updatePriceCard({
					index: cardIndex,
					card: newValue,
				}),
			);
		}
		if (featureRef.current) {
			featureRef.current.style.height = '30px';
			featureRef.current.style.height = featureRef.current.scrollHeight + 'px';
		}
		if (detailRef.current)
			detailRef.current.style.height = priceModal.detailMaxHeight + 'px';
	};

	const deleteTitleHandle = () => {
		const newValue = Object.assign({}, priceCardInfoEl, { title: '' });
		setPriceCardInfoEl(newValue);
		dispatch(
			updatePriceCard({
				index: cardIndex,
				card: newValue,
			}),
		);
	};

	const deleteDetailHandle = () => {
		const newValue = Object.assign({}, priceCardInfoEl, {
			detail: '',
			detailHeight: 30,
		});
		setPriceCardInfoEl(newValue);
		dispatch(
			updatePriceCard({
				index: cardIndex,
				card: newValue,
			}),
		);
		if (detailRef.current) {
			detailRef.current.style.height = '30px';
			detailRef.current.style.height = priceModal.detailMaxHeight + 'px';
		}
	};

	const deleteFeatureContent = () => {
		const newValue = Object.assign({}, priceCardInfoEl, {
			feature: '',
			content: [],
		});
		setPriceCardInfoEl(newValue);
		dispatch(
			updatePriceCard({
				index: cardIndex,
				card: newValue,
			}),
		);
		if (featureRef.current) {
			featureRef.current.style.height = '30px';
		}
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

	const cardRef = useRef<HTMLDivElement>(null);
	const [isCardHovering, setIsCardHovering] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const [isTitleHovering, setIsTitleHovering] = useState(false);
	const detailHoverRef = useRef<HTMLDivElement>(null);
	const [isDetailHovering, setIsDetailHovering] = useState(false);
	const featureHoverRef = useRef<HTMLDivElement>(null);
	const [isFeatureHovering, setIsFeatureHovering] = useState(false);

	// card
	const cardOverHoverHandler = (
		e: React.MouseEvent<HTMLDivElement | HTMLLabelElement>,
	) => {
		if (!isPreview) {
			if (e.target === e.currentTarget) {
				setIsCardHovering(true);
				if (cardRef.current)
					cardRef.current.style.outline = '1px solid #000000';
			}
		}
	};
	const cardOutHoverHandler = (
		e: React.MouseEvent<HTMLDivElement | HTMLLabelElement>,
	) => {
		if (!isPreview) {
			if (e.target === e.currentTarget) {
				setIsCardHovering(false);
				if (cardRef.current) cardRef.current.style.outline = 'none';
			}
		}
	};

	// title
	const titleOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsTitleHovering(true);
			if (titleRef.current) titleRef.current.style.border = '1px solid #000000';
		}
	};
	const titleOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsTitleHovering(false);
			if (titleRef.current)
				titleRef.current.style.border = '1px dashed #BCBCBC';
		}
	};

	// detail
	const detailOverHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsDetailHovering(true);
			if (detailHoverRef.current)
				detailHoverRef.current.style.outline = '1px solid #000000';
		}
	};
	const detailOutHoverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPreview) {
			setIsDetailHovering(false);
			if (detailHoverRef.current) detailHoverRef.current.style.outline = 'none';
		}
	};

	// feature
	const featureOverHoverHandler = (
		e: React.MouseEvent<HTMLTextAreaElement | HTMLImageElement>,
	) => {
		if (!isPreview) {
			setIsFeatureHovering(true);
			if (featureHoverRef.current)
				featureHoverRef.current.style.outline = '1px solid #000000';
		}
	};
	const featureOutHoverHandler = (
		e: React.MouseEvent<HTMLTextAreaElement | HTMLImageElement>,
	) => {
		if (!isPreview) {
			setIsFeatureHovering(false);
			if (featureHoverRef.current)
				featureHoverRef.current.style.outline = 'none';
		}
	};

	const { v4: uuidv4 } = require('uuid');

	// 색상 설정 및 특정 카드 강조
	const titleLabelRef = useRef<HTMLLabelElement>(null);
	const priceRef = useRef<HTMLSpanElement>(null);
	const subscribeButtonRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		// 특정 카드 강조
		if (priceModal.isCardHighLight && priceModal.highLightIndex === cardIndex) {
			if (titleLabelRef.current && titleRef.current) {
				titleLabelRef.current.style.backgroundColor = color.mainColor;
				titleRef.current.style.backgroundColor = color.mainColor;
			}
			if (cardRef.current) {
				cardRef.current.style.border = `4px solid ${color.mainColor}`;
				cardRef.current.style.borderRadius = '16px';
			}
			if (priceRef.current) {
				priceRef.current.style.color = color.subColor01;
			}
		} else {
			// 특정 카드 강조 X
			if (titleLabelRef.current && titleRef.current) {
				titleLabelRef.current.style.backgroundColor = color.subColor02;
				titleRef.current.style.backgroundColor = color.subColor02;
			}
			if (cardRef.current) {
				cardRef.current.style.border = 'none';
			}
			if (priceRef.current) {
				priceRef.current.style.color = '#000000';
			}
		}
		// 공통
		if (titleRef.current) {
			titleRef.current.style.color = color.fontColor;
		}
		if (subscribeButtonRef.current) {
			subscribeButtonRef.current.style.backgroundColor = color.mainColor;
			subscribeButtonRef.current.style.color = color.fontColor;
		}
	}, [color, priceModal.isCardHighLight, priceModal.highLightIndex, cardIndex]);

	const addContentButtonRef = useRef<HTMLButtonElement>(null);

	// 미리보기 설정
	useEffect(() => {
		if (isPreview) {
			if (titleRef.current) {
				titleRef.current.style.border = 'none';
				titleRef.current.disabled = true;
				if (titleRef.current.value === '') {
					titleRef.current.style.visibility = 'hidden';
				}
			}
			if (detailRef.current && detailHoverRef.current) {
				detailRef.current.style.border = 'none';
				detailRef.current.disabled = true;
				if (detailRef.current.value === '') {
					detailHoverRef.current.style.visibility = 'hidden';
				}
			}
			if (featureRef.current) {
				featureRef.current.style.border = 'none';
				featureRef.current.disabled = true;
				if (featureRef.current.value === '') {
					featureRef.current.style.visibility = 'hidden';
				}
			}
			if (addContentButtonRef.current) {
				addContentButtonRef.current.style.display = 'none';
			}
		} else {
			if (titleRef.current) {
				titleRef.current.style.border = '1px dashed #BCBCBC';
				titleRef.current.disabled = false;
				if (titleRef.current.value === '') {
					titleRef.current.style.visibility = 'visible';
				}
			}
			if (detailRef.current && detailHoverRef.current) {
				detailRef.current.style.border = '1px dashed #BCBCBC';
				detailRef.current.disabled = false;
				if (detailRef.current.value === '') {
					detailHoverRef.current.style.visibility = 'visible';
				}
			}
			if (featureRef.current) {
				featureRef.current.style.border = '1px dashed #BCBCBC';
				featureRef.current.disabled = false;
				if (featureRef.current.value === '') {
					featureRef.current.style.visibility = 'visible';
				}
			}
			if (addContentButtonRef.current) {
				addContentButtonRef.current.style.display = 'inline-block';
			}
		}
	}, [isPreview]);

	const cardHeightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isPreview && cardHeightRef.current)
			cardHeightRef.current.style.height = priceModal.cardMaxHeight;
	}, [priceModal.cardMaxHeight]);
	useEffect(() => {
		if (!isPreview && cardHeightRef.current)
			cardHeightRef.current.style.height = '100%';
	}, [isPreview]);

	return (
		<div
			className="h-full p-1"
			onMouseOver={cardOverHoverHandler}
			onMouseOut={cardOutHoverHandler}
			ref={cardHeightRef}
		>
			<div
				onMouseOver={cardOverHoverHandler}
				onMouseOut={cardOutHoverHandler}
				ref={cardRef}
				className={`responsiveContainer ${
					previewMode === 'tablet'
						? 'w-[239px]'
						: previewMode === 'mobile'
						? 'w-[335px]'
						: 'w-[336px]'
				}
				relative flex h-full flex-col items-center justify-between rounded-[16px] bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.15)]`}
			>
				{isCardHovering ? (
					<>
						<Image
							src="/icons/hover_delete.svg"
							alt="close_button"
							width={26}
							height={26}
							className="absolute right-[-13px] top-[-13px] cursor-pointer"
							onClick={() => {
								dispatch(deletePriceCard(cardIndex));
								featureTableDispatch(removeColumn({ colIndex: cardIndex }));
							}}
							onMouseOver={cardOverHoverHandler}
							onMouseOut={cardOutHoverHandler}
						/>
						<Image
							src="/icons/drag_hori.svg"
							alt="close_button"
							width={26}
							height={26}
							className="absolute left-[-13px] top-[-13px] cursor-pointer"
							{...provided.dragHandleProps}
							onMouseOver={cardOverHoverHandler}
							onMouseOut={cardOutHoverHandler}
						/>
					</>
				) : null}
				<div
					onMouseOver={cardOverHoverHandler}
					onMouseOut={cardOutHoverHandler}
					className="flex w-full flex-col items-center"
				>
					<label
						onMouseOver={cardOverHoverHandler}
						onMouseOut={cardOutHoverHandler}
						className={`flex h-[103px] w-full items-center justify-center rounded-t-[11px]`}
						ref={titleLabelRef}
					>
						<div
							className="relative"
							onMouseOver={titleOverHoverHandler}
							onMouseOut={titleOutHoverHandler}
						>
							{isTitleHovering ? (
								<Image
									src="/icons/hover_delete.svg"
									alt="close_button"
									width={26}
									height={26}
									className="absolute right-[-13px] top-[-13px] cursor-pointer"
									onClick={deleteTitleHandle}
								/>
							) : null}
							<input
								className={` ${
									previewMode === 'tablet'
										? 'h-[32px] w-[191px] text-xl'
										: previewMode === 'mobile'
										? 'w-[255px] text-2xl'
										: 'h-[47px] w-[272px] text-2xl'
								} responsiveInput border border-dashed border-[#BCBCBC] px-2 py-1  font-medium  outline-none`}
								type="text"
								maxLength={11}
								placeholder={`(${cardIndex + 1}번 카드) 요금제 명`}
								onChange={(event) => inputHandle(event, 'title')}
								ref={titleRef}
								value={priceCardInfoEl.title}
							/>
						</div>
					</label>
					<div
						className={`responsivePriceTag ${
							previewMode === 'tablet'
								? 'h-[73px] w-[191px] '
								: previewMode === 'mobile'
								? 'h-[55px] w-[255px] '
								: 'h-[96px] w-[256px]'
						} mb-[16px] mt-[24px] flex  flex-col justify-between`}
					>
						<span
							ref={priceRef}
							className={` 
								${
									previewMode === 'tablet'
										? 'text-2xl'
										: previewMode === 'mobile'
										? 'text-xl'
										: 'text-[32px]'
								} font-bold `}
						>
							{discountPrice.toLocaleString('ko-KR')}원/
							{priceModal.isCheckPerYear && priceModal.monthYearToggle
								? '연'
								: '월'}
						</span>
						<div className="flex gap-1 ">
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
					<div
						className={`responsiveDivider ${
							previewMode === 'tablet'
								? 'w-[191px]'
								: previewMode === 'mobile'
								? 'w-[255px]'
								: 'w-[256px]'
						}  border border-[#989898]`}
					></div>
					<div
						onMouseOver={detailOverHoverHandler}
						onMouseOut={detailOutHoverHandler}
						ref={detailHoverRef}
						className="relative mb-[24px] mt-[16px] flex min-h-[47px] flex-col items-center"
					>
						{isDetailHovering ? (
							<Image
								src="/icons/hover_delete.svg"
								alt="close_button"
								width={26}
								height={26}
								className="absolute right-[-13px] top-[-13px] cursor-pointer"
								onClick={deleteDetailHandle}
							/>
						) : null}
						<textarea
							className={`responsiveDescription ${
								previewMode === 'tablet'
									? 'w-[191px] text-sm'
									: previewMode === 'mobile'
									? 'w-[255px]'
									: 'w-[272px]'
							} mb-[16px] min-h-[30px] resize-none overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] outline-none disabled:bg-white`}
							placeholder="요금제 설명"
							ref={detailRef}
							onChange={(event) => inputHandle(event, 'detail')}
							value={priceCardInfoEl.detail}
						/>
						<div
							className={`responsiveDivider ${
								previewMode === 'tablet'
									? 'w-[191px]'
									: previewMode === 'mobile'
									? 'w-[255px]'
									: 'w-[256px]'
							} border border-[#989898]`}
						></div>
					</div>
					<div
						className={`responsiveDescription ${
							previewMode === 'tablet'
								? 'w-[191px] text-sm'
								: previewMode === 'mobile'
								? 'w-[255px]'
								: 'w-[272px]'
						} relative  flex flex-col items-center justify-center gap-[2px]`}
						ref={featureHoverRef}
					>
						{isFeatureHovering ? (
							<Image
								src="/icons/hover_delete.svg"
								alt="close_button"
								width={26}
								height={26}
								className="absolute right-[-13px] top-[-13px] cursor-pointer"
								onClick={deleteFeatureContent}
								onMouseOver={featureOverHoverHandler}
								onMouseOut={featureOutHoverHandler}
							/>
						) : null}
						<textarea
							className={`responsiveFeature ${
								previewMode === 'tablet'
									? 'w-[191px] text-sm'
									: previewMode === 'mobile'
									? 'w-[255px] text-xs'
									: 'w-[272px]'
							} min-h-[30px] resize-none  overflow-hidden border border-dashed border-[#BCBCBC] px-[8px] py-[2px] font-bold outline-none  disabled:bg-white`}
							placeholder="타이틀을 입력해 주세요"
							onChange={(event) => inputHandle(event, 'feature')}
							value={priceCardInfoEl.feature}
							ref={featureRef}
							onMouseOver={featureOverHoverHandler}
							onMouseOut={featureOutHoverHandler}
						/>
						{priceCardContentEl.map((data, index) => (
							<PriceCardContent
								key={uuidv4()}
								cardIndex={cardIndex}
								contentIndex={index}
							/>
						))}
						<button
							className={`responsiveButton  ${
								previewMode === 'tablet'
									? 'w-[191px]'
									: previewMode === 'mobile'
									? 'w-[255px] text-sm'
									: 'w-[272px]'
							} h-[30px]  border border-dashed border-[#BCBCBC]`}
							type="button"
							onClick={() => dispatch(addContent(cardIndex))}
							ref={addContentButtonRef}
						>
							+
						</button>
					</div>
				</div>
				<a
					className={` responsiveSubscribeButton ${
						previewMode === 'tablet'
							? 'h-[40px] w-[191px]'
							: previewMode === 'mobile'
							? 'h-[40px] w-[255px] text-sm'
							: 'h-[48px] w-[256px]'
					} my-[40px] flex  cursor-pointer items-center justify-center rounded-[4px] font-bold text-white`}
					type="button"
					ref={subscribeButtonRef}
				>
					구독하기
				</a>
			</div>
		</div>
	);
}

export default PriceCard;
