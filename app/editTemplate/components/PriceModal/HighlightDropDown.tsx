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
	updateCardCount,
	updateHighLightIndex,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import { IoIosArrowDown } from 'react-icons/io';

export default function HighlightDropdown() {
	const [cardIndex, setCardIndex] = React.useState('0');

	const { priceModal, dispatch } = usePriceModal();
	// updateCardCount를 사용해서 업데이트 하는 메소드
	const handleCardIndex = (count: string) => {
		setCardIndex(count);
		dispatch(updateHighLightIndex(Number(count)));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={!priceModal.isCardHighLight}>
				<button type="button" aria-label="DropDown">
					<IoIosArrowDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="mt-1 w-14 bg-white text-center"
				align="end"
			>
				<DropdownMenuRadioGroup
					value={cardIndex}
					onValueChange={(value) => handleCardIndex(value)}
					className="flex flex-col justify-center "
				>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="0"
					>
						1
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="1"
					>
						2
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="2"
					>
						3
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="font-ptRegular text-base font-normal leading-[25.6px] hover:bg-mainColor hover:text-white"
						value="3"
					>
						4
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
