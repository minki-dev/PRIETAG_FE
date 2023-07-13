'use client';

import React from 'react';

import { VersionHistoryState, VersionHistoryType, checkAllVersions, setVersions } from '@/store/slice/versionSlice';
import Image from 'next/image';
import TableVersionData from './TableVersionData';
import { useDispatch } from 'react-redux';

type Props = Pick<VersionHistoryState, 'havePublish' | 'versions' | 'isAllChecked' > & {id: string}

function TableList({ havePublish, versions, isAllChecked, id }: Props) {
	const dispatch = useDispatch();



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
								onChange={() => {
									dispatch(checkAllVersions())	
								}}
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
							{havePublish ? '편집' : '퍼블리시'}
						</th>
					</tr>
				</thead>
				<tbody>
					{versions &&
						versions.map((version) => (
							<TableVersionData {...version}/>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default TableList;
