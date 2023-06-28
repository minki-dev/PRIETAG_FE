'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Image from 'next/image'


export default function Home() {
	return (
		<main>
			<Header />
			{/* section01 */}
			<section className="w-full h-[950px] relative flex pl-[353px] pr-[349px] pt-[190px] pb-[153px] bg-slate-50">
				<div className='flex-col'>
					<div className='relative w-[529px] h-[254px]'>
						<Image
							src='/img/mediumCircle.svg'
							alt='circle'
							width={42}
							height={42}
							className='absolute left-[-40px] top-[-30px]'
						/>
						<div className="text-[#514EDA] text-[64px] font-bold">가격표 페이지를 쉽게</div>
						<div className="text-[#747474] text-[32px] font-normal leading-20 mt-[24px]">개발 리소스 없이<br />Saas 가격표 페이지 <br />제작과 분석을 시작해보세요!</div>
					</div>
					<button className='w-[200px] h-[72px] mt-[56px] px-[10px] py-3 flex bg-[#2559A7] rounded-lg justify-center items-center'>
						<span className="text-white text-[20px] font-medium leading-10 mr-[12px]">
							시작하기
						</span>
						<Image
							src='/img/stroke.svg'
							alt='arrow'
							width={40}
							height={12}
							className=''
						/>
					</button>
				</div>
				<div className='flex-row'>
					<Image
						src='/img/home1.svg'
						alt='home1'
						width={723}
						height={632}
						className='mt-[-100px]'
					/>
				</div>
			</section >
			{/* section02 */}
			< section className='w-full h-[352px] py-[120px] bg-gradient-to-r from-blue-600 to-sky-400 justify-center items-center flex flex-col z-1' >
				<div className='text-white text-[32px] font-bold leading-10'>간편하게 가격표 페이지를 제작하고,</div>
				<div className="mt-3 text-white text-[32px] font-bold leading-10">고객의 반응을 확인해보세요!</div>
			</ section>
			{/* section03 */}
			<section className="w-full h-[720px] relative flex bg-white pl-[240px] pr-[237px]" >
				<div className='w-[388px] h-[204px] ml-[20px] mt-[106px]'>
					<div className='relative w-[229px] h-[103px]'>
						<Image
							src='/img/mediumCircle.svg'
							alt='circle'
							width={24}
							height={24}
							className='absolute left-[-20px] top-[-20px]'
						/>
						<div className="text-indigo-600 text-[32px] font-bold leading-10">노코드로 제작하는<br />가격표 페이지</div>
					</div>
					<div className='w-[288px] h-[77px]'>
						<div className="text-neutral-500 text-[23px] font-normal leading-10">더이상 불필요한 개발 리소스를<br />낭비하지 마세요!</div>
					</div>
				</div>
				<div className='absolute right-[237px]'>
					<Image
						src='/img/price_table.png'
						alt='home2'
						width={1330}
						height={720}
					/>
				</div>
			</section >
			{/* section04 */}
			<section className="w-full h-[720px] relative flex bg-slate-50 pl-[240px] pt-[162px] pr-[285px]">
				<div className='w-[1328px] h-[579px] flex absolute -bottom-[85px]'>
					<Image
						src='/img/home3.svg'
						alt='home3'
						className=''
						width={1280}
						height={579}
					/>
				</div>
				<div className="relative w-[449px] h-[113px]">
					<div className="w-6 h-6 left-[325px] absolute top-[-15px] left-[1120px] bg-blue-600 rounded-full" />
					<div className="absolute w-[329px] h-[52px] text-indigo-600 text-[31px] font-bold leading-10 left-[800px]">한 눈에 보는 가격표의 KPI</div>
					<div className="absolute w-[449px] h-[39px] text-neutral-500 text-[22px] top-10 left-[800px] font-normal leading-10">진입수, 이탈수, 결제 전환율을 비교할 수 있어요!</div>
				</div>
			</section>
			<section className='w-full h-[900px] relative flex flex-col bg-white pt-[200px] pl-[240px] pr-[240px] ' >
				<div className='relative flex-row w-[541px] h-[145px]'>
					<div className="w-[439px] text-indigo-600 text-[32px] font-bold leading-10">이지피만의 차별화된 기능</div>
					<div className="mt-[26px] text-neutral-500 text-[22px] font-normal leading-10">가격 설정부터 편집, 퍼블리시의 기본적인 페이지 디자인과<br />개발 기능은 물론, KPI까지 측정하고 분석할 수 있습니다.</div>
				</div>
				<div className='relative flex w-[1440px] h-[280px] mt-[80px] space-x-[70px] ' >
					<Image src='/img/home_9077.svg' alt='homeSection5' width={232} height={280} className='' />
					<Image src='/img/home_9091.svg' alt='homeSection5' width={232} height={280} className=' ' />
					<Image src='/img/home_9092.svg' alt='homeSection5' width={232} height={280} className=' ' />
					<Image src='/img/home_9081.svg' alt='homeSection5' width={232} height={280} className=' ' />
					<Image src='/img/home_9093.svg' alt='homeSection5' width={232} height={280} className=' ' />
				</div>
			</section >
			<section className='w-full h-[388px] py-[120px] bg-gradient-to-r from-blue-600 to-sky-400 flex-col justify-center items-center gap-8 inline-flex'>
				<div className="text-white text-[32px] font-bold leading-10">지금 이지피를 시작해 보세요!</div>
				<button className='w-[200px] h-[72px] mt-[32px] px-[10px] py-3 flex bg-[#FFFFFF] rounded-lg justify-center items-center'>
					<span className="text-[#315EFF] text-[20px] font-medium leading-10 mr-[12px]">
						시작하기
					</span>
					<Image
						src='/img/blueArrow.svg'
						alt='arrow'
						width={40}
						height={12}
					/>
				</button>
			</section>
			<Footer />
		</main >
	);
}
