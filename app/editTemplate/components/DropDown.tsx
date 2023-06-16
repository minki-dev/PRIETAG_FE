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

import { updateCardCount, usePriceModal } from '@/store/slice/priceModalSlice';
import { IoIosArrowDown } from 'react-icons/io';

export default function Dropdown() {
	const [cardCnt, setCardCnt] = React.useState('0');

	const { dispatch } = usePriceModal();
	// updateCardCount를 사용해서 업데이트 하는 메소드
	const handleCardCount = (count: string) => {
		setCardCnt(count);
		dispatch(updateCardCount(Number(count)));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type="button" aria-label="DropDown">
					<IoIosArrowDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-20 text-center bg-white">
				<DropdownMenuLabel>카드 개수 선택</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={cardCnt}
					onValueChange={(value) => handleCardCount(value)}
					className="flex flex-col justify-center "
				>
					<DropdownMenuRadioItem
						className="hover:text-white hover:bg-sky-700"
						value="1"
					>
						1
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="hover:text-white hover:bg-sky-700"
						value="2"
					>
						2
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="hover:text-white hover:bg-sky-700"
						value="3"
					>
						3
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="hover:text-white hover:bg-sky-700"
						value="4"
					>
						4
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
