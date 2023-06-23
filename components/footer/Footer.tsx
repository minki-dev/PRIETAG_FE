import React from 'react';
import Image from 'next/image';

function Footer() {
	return (
		<div className=" shadow-[0_-1px_5px_rgba(0, 0, 0, 0.25)] relative  h-[740px] w-full  justify-between  bg-white px-[20px] py-[40px] text-[14px] shadow sm:flex sm:h-[316px] sm:flex-row   sm:px-[120px] xl:px-[240px] xl:text-[16px]">
			<div className=" w-full min-w-[300px] sm:h-[216px] sm:w-[281px] xl:w-[341px] ">
				<div className="relative h-[36px] w-[106px] sm:h-[48px] sm:w-[142px]">
					<Image
						src="/img/ezfee.svg"
						alt="로고 이미지"
						fill
						className="mb-[38px]"
					/>{' '}
				</div>
				<div className="flex h-[85px] w-full flex-col justify-between xl:h-[94px]">
					<div className="font-bold">주식회사 질링스</div>
					<div>서울특별시 관악구 청룡 5길 55, 질링스 빌딩 505호</div>
					<div>사업자 번호 101-00-1123456</div>
				</div>
			</div>
			<div className="absolute bottom-[30px] font-medium sm:bottom-[70px] ">
				Copyright {new Date().getFullYear()}. Zillinks all reserved.
			</div>
			<div className=" flex w-full flex-col items-center justify-evenly text-[rgb(116,116,116)]  sm:w-[630px]  sm:min-w-[480px] sm:flex-row   xl:min-w-[800px] xl:max-w-[60%]">
				<ul className="flex h-[116px] w-full flex-col justify-between sm:mt-[32px] sm:w-[121px] sm:min-w-[121px] xl:w-[138px] xl:min-w-[138px]">
					<div className=" font-bold text-black">Policy</div>
					<a>
						{' '}
						<li>개인정보처리방침</li>{' '}
					</a>
					<a>
						{' '}
						<li>이용 약관</li>{' '}
					</a>
					<a>
						{' '}
						<li>FAQ</li>{' '}
					</a>
				</ul>
				<ul className="mt-[32px] flex h-[116px] w-full flex-col justify-between sm:w-[180px] sm:min-w-[180px] xl:w-[200px] xl:min-w-[200px]">
					<div className="font-bold text-black">Contact</div>
					<a>
						{' '}
						<li>https://zillinks.com/contact/</li>{' '}
					</a>
					<a>
						{' '}
						<li>zillinks@zillinks.com</li>{' '}
					</a>
					<a>
						{' '}
						<li>+82.1234.5678.</li>{' '}
					</a>
				</ul>
				<ul className=" mt-[32px] flex h-[116px] w-full flex-col justify-between sm:w-[153px] sm:min-w-[153px] xl:w-[184px] xl:min-w-[184px]">
					<div className=" font-bold text-black">Family Site</div>
					<a>
						{' '}
						<li>질링스 공식 홈페이지</li>{' '}
					</a>
					<a>
						{' '}
						<li>질링스 포트폴리오 홈페이지</li>{' '}
					</a>
					<a>
						{' '}
						<li>질링스 채용 페이지</li>{' '}
					</a>
				</ul>
			</div>
		</div>
	);
}

export default Footer;
