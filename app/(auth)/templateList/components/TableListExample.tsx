'use client';

import React, { useEffect } from 'react';
import SquareBtn from '@/components/button/SquareBtn';
import { usePathname } from 'next/navigation';
import { useModal } from '@/store/slice/modalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { VersionHistoryType, setVersions } from '@/store/slice/versionSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getVersionTemplateList } from '@/app/api/auth/templateList/templateList';

function TableListExample({ id }: { id: string }) {
	const { dispatch } = useModal();
	const pathname = usePathname();
	const router = useRouter();
	const edit = '/templateList/edit';
	const publish = '/templateList/publish';

	// const versions = useSelector((state: RootState) => state.version.versions);
	// const currentPage = useSelector(
	// 	(state: RootState) => state.version.currentPage,
	// );
	// const itemsPerPage = useSelector(
	// 	(state: RootState) => state.version.itemsPerPage,
	// );

	const { versions, currentPage, itemsPerPage } = useSelector(
		(state: RootState) => state.version,
	);
	console.log(versions);
	const totalItems = versions.length;
	const pageCount = Math.ceil(totalItems / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = versions.slice(indexOfFirstItem, indexOfLastItem);
	const isAllChecked = currentItems.every((version) => version._publishing);

	useEffect(() => {
		const fetchData = async () => {
			const { totalCount, template, havePublish } =
				await getVersionTemplateList({
					templateId: Number(id),
					pageNumber: 0,
					pageSize: 10,
					searchTerm: '',
				});
			dispatch(setVersions(template));
		};
		fetchData();
	}, []);

	const handleAllChecked = () => {
		const updatedVersions = versions.map((version) => ({
			...version,
			isChecked: !isAllChecked,
		}));
		dispatch(setVersions(updatedVersions));
	};
	const handleCheckboxChange = (itemId: number) => {
		const updatedVersions = versions.map((version) =>
			version.id === itemId
				? { ...version, isChecked: !version._publishing }
				: version,
		);
		dispatch(setVersions(updatedVersions));
	};
	return (
		<div>
			<table className="w-full ">
				<thead>
					<tr className="flex h-[81px] w-full  items-center justify-between border-[#989898]  bg-[#F9F9F9] px-[16px] ">
						<th className=" min-w-[140px] text-left">
							<input
								type="checkbox"
								className="h-[24px] w-[24px]"
								checked={isAllChecked}
								onChange={handleAllChecked}
							/>
						</th>
						<th className="relative flex min-w-[150px] ">
							<div> 마지막 수정 일시 </div>
							<div className="flex items-center">
								{' '}
								<Image
									src="/img/dropdown.svg"
									width={10}
									height={8}
									className="object-cover "
									alt="드롭업"
								/>
							</div>
						</th>
						<th className="flex w-[210px] min-w-[50px]">
							<div> 버전</div>{' '}
							<div className="flex items-center">
								{' '}
								<Image
									src="/img/dropdown_s.svg"
									width={10}
									height={8}
									className="object-cover "
									alt="드롭업"
								/>{' '}
							</div>
						</th>
						<th className="flex w-[400px]">
							<div> 파일명 </div>{' '}
							<div className="flex items-center">
								{' '}
								<Image
									src="/img/dropdown_s.svg"
									width={10}
									height={8}
									className="object-cover "
									alt="드롭업"
								/>{' '}
							</div>
						</th>
						<th className="w-[100px] min-w-[28px]">
							{pathname === edit ? '편집' : '퍼블리시'}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="flex h-[81px] w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px]  text-[#747474] hover:bg-[#c8e5f4]">
						<td className="min-w-[140px]">
							{pathname === edit ? (
								<SquareBtn
									borderColor="#00A3FF"
									textColor="#00A3FF"
									textContent="퍼블리시중"
									bg="#DEF4FF"
									onClick={() => {}}
								/>
							) : (
								<input type="checkbox" className="h-[24px] w-[24px]" />
							)}
						</td>

						<td className="min-w-[150px]">2023.06.29.05:26</td>
						<td className="min-w-[210px]">26.0</td>
						<td className="min-w-[400px] text-left">
							2023 프리미엄 요금제 최종본
						</td>

						<td className="flex w-[100px] min-w-[28px] items-center justify-center">
							{pathname === edit ? (
								<SquareBtn
									textColor="#747474"
									width="88px"
									textContent="편집"
									bg="white"
									borderColor="#747474"
									onClick={() => {
										router.push('/editTemplate');
									}}
								/>
							) : (
								<SquareBtn
									textColor="#00A3FF"
									width="88px"
									textContent="퍼블리시중"
									bg="#DEF4FF"
									borderColor="#00A3FF"
									onClick={() => {}}
								/>
							)}
						</td>
					</tr>
					{versions &&
						versions.map((version) => (
							<tr
								key={version.id}
								className="flex h-[81px]  w-full cursor-pointer items-center justify-between border-t-[1px] px-[16px] text-[#747474] hover:bg-[#c8e5f4]"
							>
								<td className="min-w-[140px] ">
									<input
										type="checkbox"
										className="h-[24px] w-[24px]"
										checked={version._publishing}
										onChange={() => {
											handleCheckboxChange(version.id);
										}}
									/>
								</td>
								<td className="min-w-[150px]">{version.updated_at}</td>
								<td className="min-w-[210px]">{version.version}.0</td>
								<td className="min-w-[400px] text-left">{version.title}</td>
								<td className="flex w-[100px] min-w-[28px] items-center justify-center">
									<SquareBtn
										textColor="#747474"
										width="88px"
										textContent="편집"
										bg="white"
										borderColor="#747474"
										onClick={() => {}}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default TableListExample;
