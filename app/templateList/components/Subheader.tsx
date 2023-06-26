import React from 'react';

function Subheader() {
	return (
		<div className=" flex min-h-[324px] w-full min-w-[602px] flex-col justify-center bg-[url('/img/splash.svg')] px-[240px]">
			<div className="mt-[72px] min-w-[602px] text-[32px] font-bold text-[#514EDA]">
				편집 히스토리
			</div>
			<div className="mt-[8px] text-[24px] text-black">
				<div className="min-w-[602px]">
					{' '}
					직접 디자인한 가격 정책을 관리하고{' '}
				</div>
				<div className="min-w-[602px]"> 편집해 보세요 </div>
			</div>
		</div>
	);
}

export default Subheader;
