'use client';
/* eslint-disable no-param-reassign */

import React, { useEffect, useState } from 'react';
import {
	addPriceCard,
	deletePriceCard,
	setPriceCard,
	setYearDiscount,
	toggleHighLight,
	toggleIsCardSet,
	toggleIsCheckPerPerson,
	toggleIsCheckPerYear,
	updateHeadDiscount,
	usePriceModal,
} from '@/store/slice/priceModalSlice';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
	toggleOnBoardingModal,
	togglePriceModal,
	useConfig,
} from '@/store/slice/configSlice';
import HighlightDropdown from './HighlightDropDown';
import PricingDropdown from './PricingDropDown';
import { Checkbox } from '../checkbox';

const schema = yup.object().shape({
	yearDiscountRate: yup
		.number()
		.typeError('숫자만 입력 가능합니다')
		.min(0, '0 이상 100이하 의 숫자를 입력해주세요')
		.max(100, '0 이상 100 이하의 숫자를 입력해주세요'),

	perPersonInputs: yup.array().of(
		yup.object().shape({
			headCount: yup
				.number()
				.typeError('숫자만 입력 가능합니다')
				.min(0, '0 이상의 숫자를 입력해주세요'),
			discountRate: yup
				.number()
				.typeError('숫자만 입력 가능합니다')
				.min(0, '0 이상 100이하 의 숫자를 입력해주세요')
				.max(100, '0 이상 100 이하의 숫자를 입력해주세요'),
		}),
	),

	perTierInputs: yup.array().of(
		yup.object().shape({
			price: yup
				.number()
				.typeError('숫자만 입력 가능합니다')
				.min(0, '0 이상의 숫자를 입력해주세요'),
			discountRate: yup
				.number()
				.typeError('숫자만 입력 가능합니다')
				.min(0, '0 이상 100이하 의 숫자를 입력해주세요')
				.max(100, '0 이상 100 이하의 숫자를 입력해주세요'),
		}),
	),
});

export default function PriceModalForm({}: {}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { priceModal, dispatch } = usePriceModal();
	const { configState, dispatch: configDispatch } = useConfig();
	const [isChecked, setIsChecked] = useState(
		Array.from({ length: 4 }, (_, i) => i < priceModal.priceCards.length),
	);

	function countItem<T>(arr: T[], target: T): number {
		return arr.reduce(
			(count: number, item: T) => (item === target ? count + 1 : count),
			0,
		);
	}

	const handleCheckboxClick = (index: number) => {
		const updatedChecked = [...isChecked];
		updatedChecked[index] = !updatedChecked[index];
		setIsChecked(updatedChecked);
		if (updatedChecked[index]) {
			dispatch(addPriceCard());
		} else {
			if (index > priceModal.priceCards.length - 1) {
				dispatch(deletePriceCard(countItem(isChecked, true) - 1));
			}
			dispatch(deletePriceCard(index));
		}
	};

	const [tierInputValues, setTierInputValues] = useState<
		Array<{ price: string; discountRate: string }>
	>(() => {
		const initialValues = priceModal.priceCards.map((card) => ({
			price: String(card.price),
			discountRate: String(card.discountRate),
		}));

		// priceModal.priceCards의 길이가 4 미만인 경우 기본값 추가
		if (initialValues.length < 4) {
			const defaultValues = Array(4 - initialValues.length).fill({
				price: '',
				discountRate: '',
			});
			return initialValues.concat(defaultValues);
		}

		return initialValues;
	});

	const [headInputValues, setHeadInputValues] = useState<
		Array<{ headCount: string; discountRate: string }>
	>(() => {
		return priceModal.headDiscount.map((card) => {
			return {
				headCount: String(card.headCount),
				discountRate: String(card.discountRate),
			};
		});
	});

	// const [priceCard, setPriceCard] = React.useState<PriceCard[]>(testCard);
	const [yearDiscountRate, setYearDiscountRate] = useState(
		String(priceModal.yearDiscountRate),
	);

	/** 가격표 입력값 변경 핸들러 */
	const handleChangeTierInput = (
		index: number,
		field: 'price' | 'discountRate',
		value: string,
	) => {
		setTierInputValues((prevState) => {
			const updatedValues = [...prevState];
			updatedValues[index] = {
				...updatedValues[index],
				[field]: value,
			};
			return updatedValues;
		});
	};

	/** 인원당 할인율 핸들러 */
	const handleChangeHeadInput = (
		index: number,
		field: 'headCount' | 'discountRate',
		value: string,
	) => {
		setHeadInputValues((prevState) => {
			return prevState.map((item, itemIndex) => {
				if (itemIndex === index) {
					return { ...item, [field]: value };
				}
				return item;
			});
		});
	};

	/** 버튼 클릭 핸들러 */
	const handleConfirm = () => {
		const checkedValues = isChecked
			.map((checked, index) => (checked ? tierInputValues[index] : null)) // 체크된 인덱스에 해당하는 값 유지, 체크되지 않은 인덱스에는 null로 설정
			.filter((value) => value !== null); // null인 항목들을 제외하고 유효한 값만 필터링

		const updatedCard = priceModal.priceCards.map((card, index) => {
			if (checkedValues[index]) {
				return {
					...card,
					price: Number(checkedValues[index]?.price),
					discountRate: Number(checkedValues[index]?.discountRate),
				};
			}
			return card;
		});

		dispatch(setPriceCard(updatedCard));

		// 연간 할인율 업데이트
		dispatch(setYearDiscount(Number(yearDiscountRate)));

		// // 가격표 할인율 업데이트
		// tierInputValues.forEach((inputValue, index) => {
		// 	dispatch(
		// 		updateTierDiscount({
		// 			tierPrice: Number(inputValue.price),
		// 			discountRate: Number(inputValue.discountRate),
		// 			index,
		// 		}),
		// 	);
		// });

		// 인원당 할인율 업데이트
		headInputValues.forEach((inputValue, index) => {
			dispatch(
				updateHeadDiscount({
					headCount: Number(inputValue.headCount),
					discountRate: Number(inputValue.discountRate),
					index,
				}),
			);
		});
		if (configState.isOnboardingModalOpen) {
			dispatch(toggleIsCardSet());
			configDispatch(toggleOnBoardingModal());
		} else {
			dispatch(togglePriceModal());
		}
	};

	/** 연간 구독 할인율 설정 메소드 */
	const changeYearDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setYearDiscountRate(e.target.value);
	};

	return (
		<form
			className={`z-[38] h-priceModal w-priceModal ${
				configState.isOnboardingModalOpen && 'translate-y-[596px]'
			} rounded-2xl border border-gray-200 bg-white pl-6 pt-6`}
			onSubmit={handleSubmit(handleConfirm)}
		>
			<dialog
				open={configState.isOnboardingModalOpen || configState.isPriceModalOpen}
			>
				{/* 타이틀 */}
				<div className="mb-6 ml-7 font-ptBold text-xl font-medium">
					요금제 생성과 할인 정책을 설정합니다
				</div>
				{/* 옵션 생성 */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-row gap-6">
						{/* 작은 옵션 창  */}
						<div className="h-[116px] w-[176px] rounded-lg border">
							<div
								className={`h-12  rounded-t-lg  py-2.5 pl-4 ${'bg-optionColor'}`}
							>
								<span className="font-ptBold text-base text-black ">
									요금 책정 방식
								</span>
							</div>
							<div className="flex flex-row items-center rounded-b-lg pb-6 pl-6 pr-6 pt-4">
								<>
									<div className="h-[30px] w-[146px]  rounded-bl-[4px] rounded-tl-[4px]  border border-r-0 pl-2 pt-[2px] font-ptRegular text-base font-normal leading-[25.6px]  focus:outline-none">
										{priceModal.pricing}
									</div>
									<div className="  h-[30px] w-4 rounded-br-[4px]  rounded-tr-[4px]  border border-l-0 pt-1 focus:outline-none">
										<PricingDropdown />
									</div>
								</>
							</div>
						</div>
						<div className="h-[116px] w-[238px] rounded-lg border">
							<div className="flex flex-row">
								<div
									className={`${
										priceModal.isCheckPerYear
											? 'bg-optionColor text-black'
											: 'bg-disabledGray text-white'
									} h-12 w-14 rounded-tl-lg py-3 pl-4`}
								>
									<Checkbox
										onClick={() => dispatch(toggleIsCheckPerYear())}
										checked={priceModal.isCheckPerYear}
									/>
								</div>
								<div
									className={`h-12 w-full rounded-tr-lg ${
										priceModal.isCheckPerYear
											? 'bg-optionColor text-black'
											: 'bg-disabledGray text-white'
									}  py-2.5 pr-1 font-ptBold text-base leading-6 `}
								>
									연간 구독 추가 / 할인율 설정
								</div>
							</div>
							<div className="rounded-b-lg pb-6 pl-6 pt-4">
								{' '}
								<input
									type="text"
									{...register('yearDiscountRate')}
									className={`mr-2 h-[30px] w-12 rounded-[4px] border text-center ${
										errors.yearDiscountRate
											? 'border-red-500 text-red-500'
											: 'border'
									} focus:outline-none`}
									value={priceModal.isCheckPerYear ? yearDiscountRate : ''}
									disabled={!priceModal.isCheckPerYear}
									onChange={changeYearDiscount}
								/>
								<span className="font-ptRegular text-base text-borderGray">
									% 할인율 적용
								</span>
							</div>
						</div>

						<div className="h-[116px] w-[320px] rounded-lg border">
							<div className="flex flex-row">
								<div
									className={`h-12 w-14 rounded-tl-lg ${
										priceModal.isCardHighLight
											? 'bg-optionColor'
											: 'bg-disabledGray'
									}  py-3 pl-4 `}
								>
									<Checkbox
										onClick={() => dispatch(toggleHighLight())}
										checked={priceModal.isCardHighLight}
									/>
								</div>
								<span
									className={`h-12  w-full rounded-tr-lg ${
										priceModal.isCardHighLight
											? 'bg-optionColor text-black'
											: 'bg-disabledGray text-white'
									}  py-2.5 font-ptBold text-base leading-6`}
								>
									특정 요금제 강조 기능 사용
								</span>
							</div>
							<div className="flex flex-row items-center rounded-b-lg pb-6 pl-6 pt-4">
								<>
									<div className="h-[30px] w-10  rounded-bl-[4px] rounded-tl-[4px]  border border-r-0 pl-4  focus:outline-none">
										{priceModal.highLightIndex + 1}
									</div>
									<div className="mr-2  h-[30px] w-4 rounded-br-[4px]  rounded-tr-[4px]  border border-l-0 pt-1 focus:outline-none">
										<HighlightDropdown />
									</div>

									<div className="font-ptRegular text-base text-borderGray">
										번 카드 (1개 선택 가능)
									</div>
								</>
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-6">
						{/* 큰 옵션 창  */}

						<div className="h-[254px] w-[440px] rounded-lg border">
							<div className="flex h-12 w-full flex-row items-center justify-center rounded-tr-lg bg-optionColor">
								<div className="font-ptBold text-base leading-6 text-black">
									가격 카드 활성화 및 1개월 당 원가 입력 / 선택 할인율 설정
								</div>
							</div>
							<div className="flex flex-col gap-4 rounded-b-lg pb-6 pl-6 pt-4">
								{Array.from({ length: 4 }, (_, i) => {
									// const isChecked = checkedIndices.includes(i);
									// const disabled = i < 3 && isChecked[i + 1];

									return (
										<div className="flex flex-row">
											<div className="mt-[3px]">
												<Checkbox
													onClick={() => handleCheckboxClick(i)}
													checked={isChecked[i]}
												/>
											</div>

											<span className="mr-[10px] font-ptRegular text-base text-borderGray">
												{i + 1}번 카드 / 원가
											</span>
											<input
												disabled={!isChecked[i]}
												type="text"
												{...register(`perTierInputs.${i}.price`)}
												className={`mr-2 h-[30px] w-[100px] rounded-[4px] border focus:outline-none ${
													errors.perTierInputs?.[i]?.price
														? 'border-red-500 text-red-500 '
														: 'border'
												}`}
												value={tierInputValues[i].price}
												onChange={(e) =>
													handleChangeTierInput(i, 'price', e.target.value)
												}
											/>
											<span className="mr-4 font-ptRegular text-base text-borderGray">
												원
											</span>
											<input
												disabled={!isChecked[i]}
												{...register(`perTierInputs.${i}.discountRate`)}
												type="text"
												className={`mr-2 h-[30px] w-12 rounded-[4px]  border focus:outline-none ${
													errors.perTierInputs?.[i]?.discountRate
														? 'border-red-500 text-red-500'
														: 'border'
												}`}
												value={tierInputValues[i].discountRate}
												onChange={(e) =>
													handleChangeTierInput(
														i,
														'discountRate',
														e.target.value,
													)
												}
											/>
											<span className="font-ptRegular text-base text-borderGray">
												% 할인
											</span>
										</div>
									);
								})}
							</div>
						</div>
						<div className="h-[254px] w-[320px] rounded-lg border">
							<div className="flex flex-row">
								<div
									className={`${
										priceModal.isCheckPerPerson
											? 'bg-optionColor text-black'
											: 'bg-disabledGray text-white'
									} h-12 w-14 rounded-tl-lg py-3 pl-4`}
								>
									<Checkbox
										onClick={() => {
											if (priceModal.pricing === '정량제') {
												dispatch(toggleIsCheckPerPerson());
											}
										}}
										checked={
											priceModal.pricing === '정량제' &&
											priceModal.isCheckPerPerson === true
										}
									/>
								</div>
								<span
									className={`h-12  w-full rounded-tr-lg  py-2.5 font-ptBold text-base leading-6 ${
										priceModal.isCheckPerPerson
											? 'bg-optionColor text-black'
											: 'bg-disabledGray text-white'
									} `}
								>
									인원 규모 별 추가 할인율 설정
								</span>
							</div>
							<div className="flex flex-col gap-4 rounded-b-lg pb-6 pl-6 pt-4">
								{Array.from({ length: 4 }, (_, i) => {
									return (
										<div key={i}>
											<input
												type="text"
												{...register(`perPersonInputs.${i}.headCount`)}
												className={`mr-2 h-[30px] w-[100px] rounded-[4px] border  focus:outline-none ${
													errors.perPersonInputs?.[i]?.headCount
														? 'border-red-500 text-red-500 '
														: 'border'
												}}`}
												disabled={
													!priceModal.isCheckPerPerson ||
													priceModal.pricing === '정액제'
												}
												value={headInputValues[i].headCount}
												onChange={(e) =>
													handleChangeHeadInput(i, 'headCount', e.target.value)
												}
											/>
											<span className="mr-4 font-ptRegular text-base text-borderGray ">
												인 미만
											</span>
											<input
												type="text"
												{...register(`perPersonInputs.${i}.discountRate`)}
												className={`mr-2 h-[30px] w-12 rounded-[4px] border  focus:outline-none ${
													errors.perPersonInputs?.[i]?.discountRate
														? 'border-red-500  text-red-500 '
														: 'border'
												}`}
												disabled={
													!priceModal.isCheckPerPerson ||
													priceModal.pricing === '정액제'
												}
												value={headInputValues[i].discountRate}
												onChange={(e) =>
													handleChangeHeadInput(
														i,
														'discountRate',
														e.target.value,
													)
												}
											/>
											<span className="font-ptRegular text-base text-borderGray">
												% 할인
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				{/* 안내 사항 */}
				<div className="mt-4 font-ptRegular text-sm text-borderGray">
					*가격 할인은 각 항목의 할인율 %의 합연산으로 계산됩니다.
				</div>
				<div className="flex justify-between">
					{errors && (
						<div className="font-ptRegular text-sm text-red-700">
							{Array.from(
								new Set([
									...(Array.isArray(errors.perPersonInputs)
										? errors.perPersonInputs.map(
												(error) => error?.discountRate?.message,
										  )
										: []),
									...(Array.isArray(errors.perPersonInputs)
										? errors.perPersonInputs.map(
												(error) => error?.headCount?.message,
										  )
										: []),
									...(Array.isArray(errors.perTierInputs)
										? errors.perTierInputs.map((error) => error?.price?.message)
										: []),
									...(Array.isArray(errors.perTierInputs)
										? errors.perTierInputs.map(
												(error) => error?.discountRate?.message,
										  )
										: []),
									errors.yearDiscountRate?.message,
								]),
							).map((message, index) => (
								<div key={index}>{message}</div>
							))}
						</div>
					)}

					<button
						type="submit"
						className="[3px] mr-6 mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
					>
						적용
					</button>
				</div>
			</dialog>
		</form>
	);
}
