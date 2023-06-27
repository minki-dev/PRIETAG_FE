'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Subheader from '../components/Subheader';
import ReturnToList from '../components/ReturnToList';
import SearchInput from '../components/SearchInput';
import TableTopRow from '../components/TableTopRow';
import TableList from '../components/TableList';
import PaginationBar from '../components/PaginationBar';

// axios instance 생성
const getTemplates = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

// 템플릿 조회
const getTemplatesVS = async () => {
	const res = await getTemplates.get(`/posts`);
	return res.data;
};

export interface Post {
	id: number;
	title: string;
	updated_at: string;
	isChecked: boolean;
}

export default function Edit() {
	const [posts, setPosts] = useState<Post[]>([]); // 전체 페이지에 걸쳐 보일 모든 총 게시물
	const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
	const [postsPerPage, setPostsPerPage] = useState(10);
	const numOfTotalPages = Math.ceil(posts.length / 10); //한페이지당 10개씩 보임
	const indexOfLastPost = currentPage * 10; // 현재 페이지에서 가장 마지막에 있는 게시물의 index
	const indexOfFirstPost = indexOfLastPost - 10; //현재 페이지에서 가장 첫번째에 있는 게시물의 index (0,10,20,...)
	const [visiblePosts, setVisiblePosts] = useState<Post[]>();
	const allUnCheckRef = useRef<boolean>(true);

	//검색
	const searchInputRef = useRef(); //검색창
	const [keyword, setKeyword] = useState(''); //검색창에 검색할 키워드
	const [searchedPosts, setSearchedPosts] = useState<Post[]>([]); //검색키워드를 포함한 게시물들
	const [checkItems, setCheckItems] = useState([]);

	// 페이지 첫 렌더링시 fetch해올 데이터들
	useEffect(() => {
		fetchTemplates();
	}, []);

	useEffect(() => {
		if (!posts) return;

		setVisiblePosts(posts.slice(indexOfFirstPost, indexOfLastPost));
	}, [posts]);

	// 함수 //
	//검색창에 키워드 검색했을 때 키워드 state 변환
	const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
		if (e.target.value === '') {
			fetchTemplates();
		}
	};

	// 검색창에 입력한 키워드 포함한 게시물들만 찾는 함수
	const handleSearch = () => {
		const filteredPosts: Post[] = posts.filter((post: Post) =>
			post.title.includes(keyword),
		);
		if (filteredPosts.length > 0) {
			setSearchedPosts(filteredPosts);
			setCurrentPage(1);
		}
	};

	// 보여줄 페이지 계산
	const getNumOfVisiblePages = () => {
		if (keyword === '') {
			// 검색어가 없을 경우 전체 게시물 수를 기준으로 페이지 개수 계산
			return Math.ceil(posts.length / 10);
		} else {
			// 검색어가 있을 경우 검색된 게시물 수를 기준으로 페이지 개수 계산
			return Math.ceil(searchedPosts.length / 10);
		}
	};

	// post삭제 함수.(클릭된 대상은 posts에서 제거됨)
	const handleDeleteSelected = async () => {
		// 	const deleteTargetPosts = visiblePosts.filter(
		// 		(post: Post) => post.isChecked,
		// 	);
		// 			await axios.patch('/api/template/history', {
		// 				id: deleteTargetPosts.map((post) => post.id)
		// 			});
		// 	await axios.get()
		// setPosts(updatedPosts);
		// setVisiblePosts(updatedPosts);
	};

	// 템플릿 get & setPosts
	async function fetchTemplates() {
		return await getTemplatesVS().then((res) => {
			setPosts(res);
		});
	}

	//검색한 게시물 중 10개씩만 보여주기
	const getVisibleSearchedPosts = () => {
		const startIndex = (currentPage - 1) * 10;
		const endIndex = startIndex + 10;
		return searchedPosts.slice(startIndex, endIndex);
	};

	//전체선택
	const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		allUnCheckRef.current = !allUnCheckRef.current;

		const targetPosts = keyword ? searchedPosts : visiblePosts;

		const allCheckedPosts = targetPosts.map((post: Post) => ({
			...post,
			isChecked: !allUnCheckRef.current,
		}));

		if (keyword) {
			setSearchedPosts(allCheckedPosts);
			return;
		}

		setVisiblePosts(allCheckedPosts);

		return;
	};

	//부분선택
	const handleSingleCheck = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		const isChecked = e.target.checked;
		const updatedPosts = posts.map((post) => {
			if (post.id === id) {
				return { ...post, isChecked };
			}
			return post;
		});
		setPosts(updatedPosts);
	};

	return (
		<>
			<Header />
			<Subheader title="편집" />
			<div className="h-full  w-full  px-[240px]  pb-[240px] pt-[80px]">
				<div className="relative flex h-[56px]  w-full min-w-[900px] items-center justify-between">
					<ReturnToList
						fetchTemplates={fetchTemplates}
						setSearchedPosts={setSearchedPosts}
						setKeyword={setKeyword}
						setCurrentPage={setCurrentPage}
						handleSearch={handleSearch}
					/>
					<SearchInput
						keyword={keyword}
						handleKeywordChange={handleKeywordChange}
						searchInputRef={searchInputRef}
						handleSearch={handleSearch}
						fetchTemplates={fetchTemplates}
					/>
				</div>
				<div className="mt-[40px] h-full w-full min-w-[900px]  border-y-[2px] border-[#989898] ">
					<TableTopRow
						posts={posts}
						handleAllCheck={handleAllCheck}
						visiblePosts={visiblePosts}
						searchedPosts={searchedPosts}
						keyword={keyword}
					/>
					<TableList
						visibleSearchedPosts={getVisibleSearchedPosts()}
						searchedPosts={searchedPosts}
						visiblePosts={visiblePosts}
						handleSingleCheck={handleSingleCheck}
						keyword={keyword}
						fetchTemplates={fetchTemplates}
						posts={posts}
					/>
				</div>
				{/* 페이지하단(페이지네이션) */}
				<PaginationBar
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					numOfTotalPages={numOfTotalPages}
					handleDeleteSelected={handleDeleteSelected}
					numOfVisiblePages={getNumOfVisiblePages()}
				/>{' '}
			</div>
			<Footer />{' '}
		</>
	);
}
