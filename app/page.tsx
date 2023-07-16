'use client';

import Footer from '@/components/footer/Footer';
import Image from 'next/image';

export default function Home() {
	return (
		<main>
			{/* section01 */}
			<section className="relative flex h-[950px] w-full bg-slate-50 pb-[153px] pl-[353px] pr-[349px] pt-[190px]">
				<div className="flex-col">
					<div className="relative h-[254px] w-[529px]">
						<Image
							src="/img/mediumCircle.svg"
							alt="circle"
							width={42}
							height={42}
							className="absolute left-[-40px] top-[-30px]"
						/>
						<div className="text-[60px] font-bold text-[#514EDA]">
							가격표 페이지를 쉽게
						</div>
						<div className="leading-20 mt-[24px] text-[32px] font-normal text-[#747474]">
							개발 리소스 없이
							<br />
							Saas 가격표 페이지 <br />
							제작과 분석을 시작해보세요!
						</div>
					</div>
					<button className="mt-[56px] flex h-[72px] w-[200px] items-center justify-center rounded-lg bg-[#2559A7] px-[10px] py-3">
						<span className="mr-[12px] text-[20px] font-medium leading-10 text-white">
							시작하기
						</span>
						<Image
							src="/img/stroke.svg"
							alt="arrow"
							width={40}
							height={12}
							className=""
						/>
					</button>
				</div>
				<div className="flex-row">
					<Image
						src="/img/home1.svg"
						alt="home1"
						width={723}
						height={632}
						className="mt-[-100px]"
					/>
				</div>
			</section>
			{/* section02 */}
			<section className="z-1 flex h-[352px] w-full flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-sky-400 py-[120px]">
				<div className="text-[32px] font-bold leading-10 text-white">
					간편하게 가격표 페이지를 제작하고,
				</div>
				<div className="mt-3 text-[32px] font-bold leading-10 text-white">
					고객의 반응을 확인해보세요!
				</div>
			</section>
			{/* section03 */}
			<section className="relative flex h-[720px] w-full bg-white pl-[240px] pr-[237px]">
				<div className="ml-[20px] mt-[106px] h-[204px] w-[388px]">
					<div className="relative h-[103px] w-[229px]">
						<Image
							src="/img/mediumCircle.svg"
							alt="circle"
							width={24}
							height={24}
							className="absolute left-[-20px] top-[-20px]"
						/>
						<div className="text-[30px] font-bold leading-10 text-indigo-600">
							노코드로 제작하는
							<br />
							가격표 페이지
						</div>
					</div>
					<div className="h-[77px] w-[290px]">
						<div className="text-[22px] font-normal leading-10 text-neutral-500">
							더이상 불필요한 개발 리소스를
							<br />
							낭비하지 마세요!
						</div>
					</div>
				</div>
				<div className="absolute right-[237px]">
					<Image
						src="/img/price_table.png"
						alt="home2"
						width={1330}
						height={720}
					/>
				</div>
			</section>
			{/* section04 */}
			<section className="relative flex h-[720px] w-full bg-slate-50 pl-[240px] pr-[285px] pt-[162px]">
				<div className="absolute -bottom-[85px] flex h-[579px] w-[1328px]">
					<Image
						src="/img/home3.svg"
						alt="home3"
						className=""
						width={1280}
						height={579}
					/>
				</div>
				<div className="relative h-[113px] w-[449px]">
					<div className="absolute left-[1135px] top-[-15px] h-6 w-6 rounded-full bg-blue-600" />
					<div className="absolute left-[800px] h-[52px] w-[333px] text-[31px] font-bold leading-10 text-indigo-600">
						한 눈에 보는 가격표의 KPI
					</div>
					<div className="absolute left-[800px] top-10 h-[39px] w-[449px] text-[22px] font-normal leading-10 text-neutral-500">
						진입수, 이탈수, 결제 전환율을 비교할 수 있어요!
					</div>
				</div>
			</section>
			<section className="relative flex h-[900px] w-full flex-col bg-white pl-[240px] pr-[240px] pt-[200px] ">
				<div className="relative h-[145px] w-[541px] flex-row">
					<div className="w-[439px] text-[32px] font-bold leading-10 text-indigo-600">
						이지피만의 차별화된 기능
					</div>
					<div className="mt-[26px] text-[22px] font-normal leading-10 text-neutral-500">
						가격 설정부터 편집, 퍼블리시의 기본적인 페이지 디자인과
						<br />
						개발 기능은 물론, KPI까지 측정하고 분석할 수 있습니다.
					</div>
				</div>
				<div className="relative mt-[80px] flex h-[280px] w-[1440px] space-x-[70px] ">
					<Image
						src="/img/home_9077.svg"
						alt="homeSection5"
						width={232}
						height={280}
						className=""
					/>
					<Image
						src="/img/home_9091.svg"
						alt="homeSection5"
						width={232}
						height={280}
						className=""
					/>
					<Image
						src="/img/home_9092.svg"
						alt="homeSection5"
						width={232}
						height={280}
						className=""
					/>
					<Image
						src="/img/home_9081.svg"
						alt="homeSection5"
						width={232}
						height={280}
						className=""
					/>
					<Image
						src="/img/home_9093.svg"
						alt="homeSection5"
						width={232}
						height={280}
						className=""
					/>
				</div>
			</section>
			<section className="inline-flex h-[388px] w-full flex-col items-center justify-center gap-8 bg-gradient-to-r from-blue-600 to-sky-400 py-[120px]">
				<div className="text-[32px] font-bold leading-10 text-white">
					지금 이지피를 시작해 보세요!
				</div>
				<button className="mt-[32px] flex h-[72px] w-[200px] items-center justify-center rounded-lg bg-[#FFFFFF] px-[10px] py-3">
					<span className="mr-[12px] text-[20px] font-medium leading-10 text-[#315EFF]">
						시작하기
					</span>
					<Image src="/img/blueArrow.svg" alt="arrow" width={40} height={12} />
				</button>
			</section>
			<Footer />
		</main>
	);
}
