'use client';

import * as React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/dropdown-menu';

import {
	setPricing,
	updateCardCount,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import { IoIosArrowDown } from 'react-icons/io';

export default function PricingDropdown() {
	const [pricingType, setPricingType] = React.useState('정액제');

	const { priceModal, dispatch: priceDispatch } = usePriceModal();
	// updateCardCount를 사용해서 업데이트 하는 메소드
	const handlePricingType = (value: string) => {
		setPricingType(value);
		priceDispatch(setPricing(value));
		// console.log(priceModal.pricing);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type="button" aria-label="DropDown">
					<IoIosArrowDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="mt-1 w-32 bg-white text-center"
				align="end"
			>
				<DropdownMenuRadioGroup
					value={pricingType}
					onValueChange={(value) => handlePricingType(value)}
					className="flex flex-col justify-center "
				>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="정액제"
					>
						정액제
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="정량제"
					>
						정량제
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
