import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import Subheader from '../../components/Subheader';
import ReturnToList from '../../components/ReturnToList';
import SearchInput from '../../components/SearchInput';
import PaginationBar from '../../components/PaginationBar';
import TableListExample from '../../components/TableListExample';
import { getVersionTemplateList } from '@/app/api/auth/templateList/templateList';
import { store } from '@/store';

export interface Post {
	id: number;
	title: string;
	updated_at: string;
	isChecked: boolean;
}

export default async function Edit({
	params: { id },
}: {
	params: { id: string };
}) {
	// const { currentPage, itemsPerPage } = store.getState().version;
	// console.log(currentPage, itemsPerPage, params)
	// const list = await getVersionTemplateList({
	// 	pageNumber: currentPage,
	// 	pageSize: itemsPerPage,
	// 	templateId: Number(params.id),
	// 	searchTerm: '',
	// });

	// console.log({
	// 	pageNumber: currentPage,
	// 	pageSize: itemsPerPage,
	// 	templateId: Number(params.id),
	// 	searchTerm: '',
	// })
	return (
		<>
			<Header />
			<Subheader title="편집" />
			<div className="h-full  w-full  bg-[#F7F8FC]  px-[240px] pb-[240px] pt-[80px]">
				<div className="relative flex h-[56px]  w-full min-w-[900px] items-center justify-between">
					<ReturnToList />
					<SearchInput />
				</div>
				<div className="mt-[40px] h-full w-full min-w-[900px]  border-y-[2px] border-[#989898] ">
					<TableListExample id={id} />
				</div>
				<PaginationBar />{' '}
			</div>
			<Footer />{' '}
		</>
	);
}
