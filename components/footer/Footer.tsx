import React from 'react';
import Image from 'next/image';

function Footer() {
	return (
		<div className="shadow-[0_-1px_5px_rgba(0, 0, 0, 0.25)] flex h-[326px] min-w-[1440px]  max-w-full justify-between bg-white px-[240px] shadow">
			<div className=" mb-[64px]  mt-[48px] h-[216px] w-[350px] min-w-[340px] ">
				<Image
					src="/img/ezfee.svg"
					alt="로고 이미지"
					width={140.72}
					height={48}
					className="mb-[38px]"
				/>{' '}
				<div className="flex  h-[128px] w-full min-w-full flex-col justify-between">
					<div className="font-bold">주식회사 질링스</div>
					<div>서울특별시 관악구 청룡 5길 55, 질링스 빌딩 505호</div>
					<div>사업자 번호 101-00-1123456</div>
					<div className="font-medium">
						Copyright {new Date().getFullYear()}. Zillinks all reserved.
					</div>
				</div>
			</div>
			<div className="  flex w-[763px] items-center text-[rgb(116,116,116)]">
				<ul className=" mr-[130px] flex h-[128px] min-w-max flex-col justify-between">
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
				<ul className="mr-[130px] flex h-[128px] min-w-max flex-col justify-between">
					<div className="  font-bold text-black">Contact</div>
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
				<ul className="flex h-[128px] min-w-max flex-col justify-between">
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
