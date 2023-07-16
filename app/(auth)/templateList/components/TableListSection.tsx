'use client';

import { RootState } from '@/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableList from '../components/TableList';
import Pagination from '../components/Pagination';
import { useDispatch } from 'react-redux';
import { VersionHistoryType, setCurrentPage, setVersions } from '@/store/slice/versionSlice';
import { getVersionTemplateList } from '@/fetch/auth/templateList/templateList';
import SquareBtn from '@/components/button/SquareBtn';
import { deleteVersionHistories } from '@/fetch/auth/templateList/templateHistoryList';

 
export default function TableListSection({ id }: { id: string }) {
	const {
		versions,
		currentPage,
		itemsPerPage,
		totalPage,
		isAllChecked,
		havePublish,
	} = useSelector((state: RootState) => state.version);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		
		const isNothingChecked = 	versions.every(version => !version.isChecked) 
		if(!isNothingChecked) {
			
			const ids = versions.map(version => {
				if(version.isChecked) return version.id
			})
			
			deleteVersionHistories(ids as number[])
		}
		
	}
	useEffect(() => {
		const fetchData = async () => {
			const { totalCount, template, havePublish } =
				await getVersionTemplateList({
					templateId: Number(id),
					pageNumber: 0,
					pageSize: 10,
					searchTerm: '',
				});
				const data = template.map((templateItem: Exclude<VersionHistoryType, 'isChecked'>) => {
					return {...templateItem, havePublish, isChceked: false, totalPage: totalCount } as VersionHistoryType
				})
			dispatch(setVersions(data));
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="mt-[40px] h-full w-full min-w-[900px]  border-y-[2px] border-[#989898] ">
				<TableList
					versions={versions}
					havePublish={havePublish}
					id={id}
					isAllChecked={isAllChecked}
				/>
			</div>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={dispatch(setCurrentPage)}
				totalPages={totalPage}
			/>{' '}
			<SquareBtn borderColor='transparent' onClick={handleDelete} textContent='삭제' bg='#FF0000' width='96px' textColor='white' />
		</>
	);
}
