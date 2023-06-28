import { updatePageInfo, useDashboard } from '@/store/slice/dashboardSlice';
import React, { useEffect, useState } from 'react';

type Props = {
	prev: () => void;
	next: () => void;
	currentPage: number;
	maxPage: number;
};

export default function PaginationTab({ prev, next, currentPage, maxPage }: Props) {
  const {dispatch} = 	useDashboard()	
	
	const handlePrev = () => {
		if (currentPage > 0) {
			
			prev();
		}
	};
	const handleNext = () => {
		if (currentPage < maxPage - 1) {
			
			next();
		}
	};

	useEffect(() => {
		dispatch(updatePageInfo({ currentPage, maxPage }))
	},[currentPage, maxPage])
	return (
		<div className="sm:absolute sm:right-4 sm:top-4 xl:static flex h-[40px] w-[128px] items-center justify-between rounded-[20px] bg-[#F7F8FC]">
			<button className="w-10" onClick={handlePrev} type="button">
				{'<'}
			</button>
			<span>{currentPage + 1 + ' / ' + maxPage}</span>
			<button className="w-10" onClick={handleNext} type="button">
				{'>'}
			</button>
		</div>
	);
}
