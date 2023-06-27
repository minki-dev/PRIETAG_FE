import React from 'react';
import SquareBtn from '@/components/button/SquareBtn';
import { openModal, useModal } from '@/store/slice/modalSlice';
import { GlobalModal } from '@/components/modal/GlobalModal';
import { ModalTypes } from '@/components/modal/ModalState';
import Image from 'next/image';

function PaginationBar({
	setCurrentPage,
	currentPage,
	numOfTotalPages,
	handleDeleteSelected,
	numOfVisiblePages,
}) {
	const { dispatch } = useModal();
	const prevPageHandler = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPageHandler = () => {
		if (currentPage !== numOfTotalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	const pages = [...Array(numOfVisiblePages + 1).keys()].slice(1);
	return (
		<div className="relative flex h-[168px] w-full justify-center">
			<div className="absolute left-0 top-[28px] ">
				{' '}
				<SquareBtn
					bg="#FF0000"
					textColor="#fff"
					textContent="선택 삭제"
					borderColor="#FF0000"
					onClick={() => {
						handleDeleteSelected(),
							dispatch(openModal(ModalTypes.TemplateDelModal));
					}}
				/>{' '}
				<GlobalModal />
			</div>

			<div className="flex items-center">
				<button
					onClick={() => {
						prevPageHandler();
					}}
				>
					<Image
						src="/img/page_pre.svg"
						alt="이전으로"
						width={40}
						height={40}
					/>{' '}
				</button>
				<nav className="flex">
					{pages.map((page) => (
						<span
							key={page}
							onClick={() => {
								setCurrentPage(page);
							}}
							className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${
								currentPage === page
									? 'bg-[#00A3FF] font-bold text-white'
									: null
							} cursor-pointer`}
						>
							{`${page}`}{' '}
						</span>
					))}
				</nav>
				<button
					onClick={() => {
						nextPageHandler();
					}}
				>
					<Image
						src="/img/page_next.svg"
						alt="다음으로"
						width={40}
						height={40}
					/>{' '}
				</button>
			</div>
		</div>
	);
}

export default PaginationBar;
