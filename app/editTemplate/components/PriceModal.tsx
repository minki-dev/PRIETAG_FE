/* eslint-disable no-param-reassign */

'use client';

import React from 'react';
import {
	createPriceCard,
	setPriceCard,
	setYearDiscount,
	toggleIsCardSet,
	toggleIsCheckPerPerson,
	toggleIsCheckPerTier,
	toggleIsCheckPerYear,
	updateHeadDiscount,
	updateTierDiscount,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import { Checkbox } from './checkbox';
import Dropdown from './DropDown';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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

export default function PriceModal({
	toggleModal,
}: {
	toggleModal: () => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { priceModal, dispatch } = usePriceModal();
	const [tierInputValues, setTierInputValues] = React.useState<
		Array<{ price: string; discountRate: string }>
	>(() => {
		return priceModal.tierDiscount.map((card) => {
			return {
				price: String(card.tierPrice),
				discountRate: String(card.discountRate),
			};
		});
	});

	const [headInputValues, setHeadInputValues] = React.useState<
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
	const [yearDiscountRate, setYearDiscountRate] = React.useState(
		String(priceModal.yearDiscountRate),
	);

	/** 가격표 입력값 변경 핸들러 */
	const handleChangeTierInput = (
		index: number,
		field: 'price' | 'discountRate',
		value: string,
	) => {
		setTierInputValues((prevState) => {
			return prevState.map((item, itemIndex) => {
				if (itemIndex === index) {
					return { ...item, [field]: value };
				}
				return item;
			});
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
		// 가격 카드 설정
		const updatedCard = priceModal.priceCards.map((card, index) => {
			return {
				...card,
				price: Number(tierInputValues[index].price),
				discountRate: Number(tierInputValues[index].discountRate),
			};
		});

		dispatch(setPriceCard(updatedCard));

		// 연간 할인율 업데이트
		dispatch(setYearDiscount(Number(yearDiscountRate)));

		// 가격표 할인율 업데이트
		tierInputValues.forEach((inputValue, index) => {
			dispatch(
				updateTierDiscount({
					tierPrice: Number(inputValue.price),
					discountRate: Number(inputValue.discountRate),
					index,
				}),
			);
		});

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

		if (priceModal.isCardSet === false) {
			// 카드 개수 설정 완료
			dispatch(toggleIsCardSet());
			dispatch(createPriceCard());
		}

		toggleModal();
	};

	/** 연간 구독 할인율 설정 메소드 */
	const changeYearDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setYearDiscountRate(e.target.value);
	};

	return (
		<form
			className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
			onSubmit={handleSubmit(handleConfirm)}
		>
			<dialog
				open
				className="h-priceModal w-priceModal rounded-2xl border border-gray-200 bg-white pl-6 pt-8"
			>
				{/* 타이틀 */}
				<div className="mb-6 ml-7 font-ptBold text-xl font-medium">
					요금제 생성과 할인 정책을 설정합니다
				</div>
				{/* 옵션 생성 */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-row gap-6">
						{/* 작은 옵션 창  */}
						<div className="h-[116px] w-[380px] rounded-lg border">
							<div
								className={`h-12  rounded-t-lg  py-2.5 pl-4 ${
									priceModal.isCardSet ? 'bg-[#BCBCBC]' : 'bg-blue-500'
								}`}
							>
								<span className="font-ptBold text-base text-white ">
									요금제(가격카드 개수 설정)
								</span>
							</div>
							<div className="flex flex-row items-center rounded-b-lg pb-6 pl-6 pt-4">
								{priceModal.isCardSet === false ? (
									<>
										<div className="h-[30px] w-10  rounded-bl-[4px] rounded-tl-[4px]  border border-r-0 pl-4  focus:outline-none">
											{priceModal.cardCount}
										</div>
										<div className="mr-2  h-[30px] w-4 rounded-br-[4px]  rounded-tr-[4px]  border border-l-0 pt-1 focus:outline-none">
											<Dropdown />
										</div>

										<div className="font-ptRegular text-base text-borderGray">
											개 (최대 4개 설정 가능)
										</div>
									</>
								) : (
									<>
										<div className="mr-2 h-[30px] w-10  rounded-[4px]  border text-center focus:outline-none">
											{priceModal.cardCount}
										</div>{' '}
										<div className="font-ptRegular text-base text-borderGray">
											개 (최대 4개 설정 가능)
										</div>
									</>
								)}
							</div>
						</div>
						<div className="h-[116px] w-[380px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 w-14 rounded-tl-lg bg-blue-500 py-3 pl-4">
									<Checkbox
										onClick={() => dispatch(toggleIsCheckPerYear())}
										checked={priceModal.isCheckPerYear}
									/>
								</div>
								<span className="h-12  w-full rounded-tr-lg bg-blue-500 py-2.5 font-ptBold text-base leading-6 text-white">
									연간 구독 추가 및 할인율 설정
								</span>
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
					</div>

					<div className="flex flex-row gap-6">
						{/* 큰 옵션 창  */}
						<div className="h-[254px] w-[380px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 w-14 rounded-tl-lg bg-blue-500 py-3 pl-4">
									<Checkbox
										onClick={() => dispatch(toggleIsCheckPerPerson())}
										checked={priceModal.isCheckPerPerson}
									/>
								</div>
								<span className="h-12  w-full rounded-tr-lg bg-blue-500 py-2.5 font-ptBold text-base leading-6 text-white">
									인원 규모 당 할인율 설정
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
												disabled={!priceModal.isCheckPerPerson}
												value={
													priceModal.isCheckPerPerson
														? headInputValues[i].headCount
														: ''
												}
												onChange={(e) =>
													handleChangeHeadInput(i, 'headCount', e.target.value)
												}
											/>
											<span className="mr-4 font-ptRegular text-base text-borderGray ">
												인 미만 사용자
											</span>
											<input
												type="text"
												{...register(`perPersonInputs.${i}.discountRate`)}
												className={`mr-2 h-[30px] w-12 rounded-[4px] border  focus:outline-none ${
													errors.perPersonInputs?.[i]?.discountRate
														? 'border-red-500  text-red-500 '
														: 'border'
												}`}
												disabled={!priceModal.isCheckPerPerson}
												value={
													priceModal.isCheckPerPerson
														? headInputValues[i].discountRate
														: ''
												}
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
						<div className="h-[254px] w-[380px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 w-14 rounded-tl-lg bg-blue-500 py-3 pl-4">
									<Checkbox
										onClick={() => dispatch(toggleIsCheckPerTier())}
										checked={priceModal.isCheckPerTier}
									/>
								</div>
								<span className="h-12  w-full rounded-tr-lg bg-blue-500 py-2.5 font-ptBold text-base leading-6 text-white">
									요금제 별 할인율 설정
								</span>
							</div>
							<div className="flex flex-col gap-4 rounded-b-lg pb-6 pl-6 pt-4">
								{Array.from({ length: 4 }, (_, i) => {
									const disabled =
										priceModal.isCheckPerTier && i + 1 <= priceModal.cardCount;

									return (
										<div>
											<span className="mr-[10px] font-ptRegular text-base text-borderGray">
												{i + 1}번 카드 원가
											</span>
											<input
												disabled={!disabled}
												type="text"
												{...register(`perTierInputs.${i}.price`)}
												className={`mr-2 h-[30px] w-[100px] rounded-[4px] border focus:outline-none ${
													errors.perTierInputs?.[i]?.price
														? 'border-red-500 text-red-500 '
														: 'border'
												}`}
												value={disabled ? tierInputValues[i].price : ''}
												onChange={(e) =>
													handleChangeTierInput(i, 'price', e.target.value)
												}
											/>
											<span className="mr-4 font-ptRegular text-base text-borderGray">
												원
											</span>
											<input
												disabled={!disabled}
												{...register(`perTierInputs.${i}.discountRate`)}
												type="text"
												className={`mr-2 h-[30px] w-12 rounded-[4px]  border focus:outline-none ${
													errors.perTierInputs?.[i]?.discountRate
														? 'border-red-500 text-red-500'
														: 'border'
												}`}
												value={disabled ? tierInputValues[i].discountRate : ''}
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
