'use client'

import React, { SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import versionSlice, { filterByKeyword } from '@/store/slice/versionSlice';

function SearchInput() {
	const dispatch = useDispatch();
	const [keyword, setKeyword] = useState<string>('');
	const handleSearch = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(filterByKeyword(keyword));
	};
	return (
		<div className="relative flex h-[46px] w-[400px] items-center justify-between">
			<form
				className="h-full"
				onSubmit={(e: SyntheticEvent) => e.preventDefault()}
			>
				{' '}
				<input
					type="text"
					placeholder="검색어를 입력해 주세요"
					className="shadow-[0_0px_4px_rgba(0, 0, 0, 0.35)] absolute right-0 mt-[10px] min-w-[400px] rounded-md px-[16px] py-[10px] shadow"
					value={keyword}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setKeyword(e.target.value);
					}}
				/>
				<button
					className="absolute right-[16px] top-[20px] cursor-pointer"
					onClick={handleSearch}
				>
					<Image src="/img/search.svg" alt="검색하기" width={20} height={20} />
				</button>
			</form>
		</div>
	);
}

export default SearchInput;
