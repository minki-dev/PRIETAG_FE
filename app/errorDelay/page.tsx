import React from 'react';

function ErrorDelay() {
	return (
		<div className="flex h-[808px] w-full items-center justify-center bg-[#F9E8E9]">
			<div className="w-1440px flex h-full items-center justify-center bg-[#FFEEEF] sm:w-[1440px]">
				<div className="flex h-full w-[415px] items-center justify-center bg-[#F6F6F6] sm:w-[1280px]">
					<div className="flex h-full w-[375px] items-center justify-center bg-white/100 sm:w-[1000px]">
						<div className="flex flex-col items-center justify-center text-center">
							<div className=" h-[120px] w-[120px] sm:h-[144px] sm:w-[144px]">
								<img
									src="/error_slow.svg"
									className=" object-cover "
									alt="연결느림 이미지"
								/>
							</div>
							<div className="my-[48px] leading-[51px]">
								<div className=" text-[20px] font-bold sm:text-[32px]">
									잠시 연결이 늦어지고 있습니다.{' '}
								</div>
								<div className="text-base font-medium text-[#989898]  sm:text-2xl">
									조금 뒤 다시 시도해 주세요.
								</div>
							</div>
							<button className="h-[34px] w-[104px] rounded border-[1px] border-[#747474] px-[18px] py-[5.5px] text-sm font-medium">
								다시 시도
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ErrorDelay;
