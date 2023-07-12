import React from 'react';
import Image from 'next/image';

const Pagination = ({
	setCurrentPage,
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="flex">
			<button
				onClick={() => {
					setCurrentPage(0);
				}}
			>
				<Image
					src="/img/page_first.svg"
					alt="처음으로"
					width={40}
					height={40}
				/>{' '}
			</button>
			<button
				onClick={() => {
					setCurrentPage(currentPage - 1);
				}}
				disabled={currentPage === 0}
			>
				<Image src="/img/page_pre.svg" alt="이전으로" width={40} height={40} />{' '}
			</button>
			{pageNumbers.map((number, index) => (
				<li
					key={index}
					onClick={() => {
						console.log(index);
					}}
					className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full ${
						index === currentPage ? 'bg-[#00A3FF] text-white' : 'bg-transparent'
					}`}
				>
					{number}
				</li>
			))}
			<button
				onClick={() => {
					setCurrentPage(currentPage + 1);
				}}
				disabled={currentPage === totalPages}
			>
				<Image src="/img/page_next.svg" alt="다음으로" width={40} height={40} />{' '}
			</button>
			<button
				onClick={() => {
					setCurrentPage(totalPages - 1);
				}}
			>
				<Image
					src="/img/page_end.svg"
					alt="마지막으로"
					width={40}
					height={40}
				/>{' '}
			</button>
		</ul>
	);
};

export default Pagination;
