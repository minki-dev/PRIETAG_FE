import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ReturnToList({}) {
	const router = useRouter();
	return (
		<div>
			<div className="absolute left-0 top-[7px] ">
				<Image
					src="/img/page_pre.svg"
					alt="이전으로 가기"
					width={40}
					height={40}
				/>
			</div>
			<button
				onClick={() => {
					router.push('/templateList');
				}}
				className="shadow-[0_0px_4px_rgba(0, 0, 0, 0.35)] flex  h-[56px] w-[208px] items-center justify-center rounded-[3px] py-[12px] text-[20px] text-[#747474] shadow"
			>
				{' '}
				리스트로 돌아가기
			</button>
		</div>
	);
}
export default ReturnToList;
