'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Subheader from '../components/Subheader';
import ReturnToList from '../components/ReturnToList';
import SearchInput from '../components/SearchInput';
import PaginationBar from '../components/PaginationBar';
import { deleteItem } from '@/store/slice/versionSlice';
import { useDispatch } from 'react-redux';
import TableListExample from '../components/TableListExample';

export interface Post {
	id: number;
	title: string;
	updated_at: string;
	isChecked: boolean;
}

export default function Edit() {
	return (
		<>
			<Header />
			<Subheader title="편집" />
			<div className="h-full  w-full  px-[240px]  pb-[240px] pt-[80px]">
				<div className="relative flex h-[56px]  w-full min-w-[900px] items-center justify-between">
					<ReturnToList />
					<SearchInput />
				</div>
				<div className="mt-[40px] h-full w-full min-w-[900px]  border-y-[2px] border-[#989898] ">
					<TableListExample />
				</div>
				{/* 페이지하단(페이지네이션) */}
				<PaginationBar />{' '}
			</div>
			<Footer />{' '}
		</>
	);
}
