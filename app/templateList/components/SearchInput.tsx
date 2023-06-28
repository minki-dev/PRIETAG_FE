import React, { useEffect } from 'react';
import Image from 'next/image';

function SearchInput({}) {
	return (
		<div className="relative flex h-[46px] w-[400px] items-center justify-between">
			<form className="h-full" onSubmit={(e) => e.preventDefault()}>
				{' '}
				<input
					type="text"
					placeholder="검색어를 입력해 주세요"
					className="shadow-[0_0px_4px_rgba(0, 0, 0, 0.35)] absolute right-0 mt-[10px] min-w-[400px] rounded-md px-[16px] py-[10px] shadow"
				/>
				<button className="absolute right-[16px] top-[20px] cursor-pointer">
					<Image src="/img/search.svg" alt="검색하기" width={20} height={20} />
				</button>
			</form>
		</div>
	);
}

export default SearchInput;
