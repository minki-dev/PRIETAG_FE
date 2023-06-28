'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Image from 'next/image'


export default function Home() {
	return (
		<main>
			<Header />
			<section className='w-[1920px] h-[950px] relative bg-slate-50'>
				<div className='left-[353px] top-[247px] absolute flex-col justify-center items-start gap-6 inline-flex'>
					<div className="justify-center items-start gap-4 inline-flex">
						<div className="text-indigo-600 text-[64px] font-bold">가격표 페이지를</div>
						<div className="text-indigo-600 text-[64px] font-bold">쉽게</div>
					</div>
					<div className="text-neutral-500 text-[32px] font-normal leading-10">개발 리소스 없이<br />Saas 가격표 페이지 <br />제작과 분석을 시작해보세요!</div>
				</div>
				<button type='button' className="w-[200px] h-[72px] px-14 py-3 left-[350px] top-[558px] absolute bg-blue-800 rounded-lg justify-center items-center gap-4 inline-flex">
					<div className="text-white text-[24px] font-medium leading-10">시작하기</div>
				</button>
				<div className="w-[42px] h-[42px] left-[307px] top-[210px] absolute bg-blue-600 rounded-full" />
				<Image
					src='/img/home1.svg'
					alt='home'
					width={780}
					height={780}
					className='relative top-[160px] left-[885px]'
				/>
			</section>
			<section className='w-[1920px] h-[352px] py-[120px] bg-gradient-to-r from-blue-600 to-sky-400 justify-center items-center flex flex-col z-1'>
				<div className='text-white text-[32px] font-bold leading-10'>간편하게 가격표 페이지를 제작하고,</div>
				<div className="mt-3 text-white text-[32px] font-bold leading-10">고객의 반응을 확인해보세요!</div>
			</section>
			<section className="w-[1920px] h-[720px] relative bg-white">
				<div className="w-[308px] h-[204px] left-[240px] top-[200px] absolute">
					<div className="w-72 h-[188px] left-[20px] top-[16px] absolute">
						<div className="left-0 top-0 absolute text-indigo-600 text-[30px] font-bold leading-10">노코드로 제작하는<br />가격표 페이지</div>
						<div className="left-0 top-[111px] absolute text-neutral-500 text-[22px] font-normal leading-10">더이상 불필요한 개발 리소스를<br />낭비하지 마세요!</div>
					</div>
				</div>
				<Image
					src='/img/home2.svg'
					alt='home2'
					width={1000}
					height={1000}
					className='left-[895px] top-[-30px] relative'
				/>
			</section>
			<section className="w-[1920px] h-[720px] relative bg-slate-50 top-[-130px]">
				<Image
					src='/img/home3.svg'
					alt='home3'
					width={1000}
					height={1000}
					className='absolute bottom-0 left-[240px]'
				/>
				<div className="w-[129px] h-[129px] left-[1494px] top-[98px] absolute rounded-full" />
				<div className="w-[449px] h-[113px] left-[1186px] top-[162px] absolute">
					<div className="w-6 h-6 left-[325px] top-0 absolute bg-blue-600 rounded-full" />
					<div className="left-0 top-[14px] absolute text-indigo-600 text-[32px] font-bold leading-10">한 눈에 보는 가격표의 KPI</div>
					<div className="left-0 top-[74px] absolute text-neutral-500 text-[22px] font-normal leading-10">진입수, 이탈수, 결제 전환율을 비교할 수 있어요!</div>
				</div>
			</section>
			<section className='w-[1920px] h-[1000px] relative bg-white'>
				<div className='relative top-[200px] left-[240px]'>
					<div className="w-[439px] text-indigo-600 text-[32px] font-bold leading-10">이지피만의 차별화된 기능</div>
					<div className="mt-[26px] text-neutral-500 text-[24px] font-normal leading-10">가격 설정부터 편집, 퍼블리시의 기본적인 페이지 디자인과<br />개발 기능은 물론, KPI까지 측정하고 분석할 수 있습니다.</div>
				</div>
				<div className='relative flex top-[425px] left-[240px]'>
					<Image src='/img/home_9077.svg' alt='homeSection5' width={232} height={280} className='mr-[70px]' />
					<Image src='/img/home_9091.svg' alt='homeSection5' width={232} height={280} className='mr-[70px]' />
					<Image src='/img/home_9092.svg' alt='homeSection5' width={232} height={280} className='mr-[70px]' />
					<Image src='/img/home_9081.svg' alt='homeSection5' width={232} height={280} className='mr-[70px]' />
					<Image src='/img/home_9093.svg' alt='homeSection5' width={232} height={280} className='mr-[70px]' />
				</div>
			</section>
			<section className='w-[1920px] h-[388px] py-[120px] bg-gradient-to-r from-blue-600 to-sky-400 flex-col justify-center items-center gap-8 inline-flex'>
				<div className="text-white text-[32px] font-bold leading-10">지금 이지피를 시작해 보세요!</div>
				<button className="w-[200px] h-16 px-12 py-3 bg-white rounded-lg shadow justify-center items-center gap-4 inline-flex">
					<span className="text-blue-600 text-[24px] font-medium leading-10">시작하기</span>
				</button>
			</section>
			<Footer />
		</main >
	);
}
