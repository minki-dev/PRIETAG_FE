import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function ErrorNotGood() {
	return (
		<div>
			<Header />
			<div className=" flex h-full w-[375px] flex-col items-center justify-center bg-transparent px-[20px] sm:w-full sm:min-w-[1280px] sm:px-[120px] xl:w-full xl:min-w-[1480px] xl:bg-[#F9E8E9] xl:px-[240px]">
				<div className=" flex h-full w-full flex-col items-center justify-center bg-[#F7F8FC] pt-[72px] text-center xl:h-[808px]  ">
					<div className=" h-[120px] w-[120px] sm:h-[144px] sm:w-[144px]">
						<img
							src="/img/error_connection.svg"
							className=" object-cover "
							alt="연결안됨 이미지"
						/>
					</div>
					<div className="my-[48px] leading-[51px]">
						<div className=" text-[20px] font-bold sm:text-[32px]">
							연결 상태가 좋지 않습니다.{' '}
						</div>
						<div className="text-base font-medium text-[#989898]  sm:text-2xl">
							조금 뒤 다시 시도해 주세요.
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ErrorNotGood;
