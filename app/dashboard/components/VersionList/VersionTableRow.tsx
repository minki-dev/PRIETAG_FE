import { TemplateByVersion } from '@/store/slice/dashboardSlice';
import { Checkbox } from '@/components/ui/checkbox';

import Link from 'next/link';
import {
	selectVersion,
	unselectVersion,
	useVersionList,
} from '@/store/slice/versionListSlice';

type Props = {
	className?: string;
	data: TemplateByVersion;
	index: number;
	isDeleted: boolean;
	isPublished: boolean;
};

export default function VersionTableRow({
	className,
	data,
	index,
	isDeleted,
	isPublished,
}: Props) {
	const {
		versionListState: { baseVersion, targetVersion, versionListChecks },
		dispatch: versionListDispatch,
	} = useVersionList();

	const onCheckedChange = (id: number) => {
		if (versionListChecks.size > 2) return;

		switch (versionListChecks.size) {
			case 0: // 체크박스 0개
				versionListDispatch(selectVersion({ data, id: data.id, type: 'BASE' }));
				break;
			case 1: // 체크박스 1개
				if (baseVersion) {
					//	베이스 버전 선택된 상태일 때
					if (versionListChecks.get(id)?.type !== 'BASE') {
						//	같은 체크박스 클릭이 아닐 때
						versionListDispatch(
							selectVersion({ data, id: data.id, type: 'TARGET' }),
						);
						break;
					} else {
						//	같은 체크박스 클릭일 때
						versionListDispatch(unselectVersion({ id: data.id, type: 'BASE' }));
						break;
					}
				} else {
					//	타겟 버전이 선택된 상태일 때
					if (versionListChecks.get(id)?.type !== 'TARGET') {
						//	같은 체크박스 클릭이 아닐 때
						versionListDispatch(
							selectVersion({ data, id: data.id, type: 'BASE' }),
						);
						break;
					} else {
						//	같은 체크박스 클릭일 때
						versionListDispatch(
							unselectVersion({ id: data.id, type: 'TARGET' }),
						);
						break;
					}
				}
			case 2: //	체크박스 2개
				if (versionListChecks.get(id)?.type === 'BASE') {
					// 베이스 버전 다시 클릭 시
					versionListDispatch(unselectVersion({ id: data.id, type: 'BASE' }));
					break;
				} else if (versionListChecks.get(id)?.type === 'TARGET') {
					//	타겟 버전 다시 클릭 시
					versionListDispatch(unselectVersion({ id: data.id, type: 'TARGET' }));
					break;
				}
			default:
				console.log(
					'default case hit, versionList.length: ',
					versionListChecks.size,
				);
				break;
		}
	};

	return (
		<tr className="transition-bg duration-100 hover:bg-[#F4F8FF]">
			<td className="p-4 text-center whitespace-nowrap">{index}</td>
			<td className="p-4 whitespace-nowrap">
				{data.publishDate.toLocaleString()}
			</td>
			<td className="hidden p-4 whitespace-nowrap text-start sm:table-cell">
				{data.versionName}
			</td>
			<td className="hidden p-4 text-center sm:table-cell">
				<Link className="whitespace-nowrap" href={'#'}>
					{isDeleted ? '삭제됨' : isPublished ? '사용중' : '보기'}
				</Link>
			</td>
			<td className="text-center">
				<Checkbox
					className={`${
						versionListChecks.get(data.id)?.type === 'BASE'
							? 'data-[state=checked]:bg-[#315EFF]'
							: 'data-[state=checked]:bg-[#55CEC7]'
					} ${className}`}
					disabled={
						!!baseVersion &&
						!!targetVersion &&
						versionListChecks.get(data.id)?.type !== 'BASE' &&
						versionListChecks.get(data.id)?.type !== 'TARGET'
					}
					checked={versionListChecks.get(data.id)?.checked ?? false}
					onCheckedChange={() => {
						onCheckedChange(data.id);
					}}
				/>
			</td>
		</tr>
	);
}
