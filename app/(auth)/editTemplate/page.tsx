'use client';

import React, { useEffect, useState } from 'react';
import { usePriceModal } from '@/store/slice/priceModalSlice';

import FAQ from './components/FAQ';
import PriceModal from './components/PriceModal/PriceModal';
import RightMenu from './components/RightMenu';
import DraggableArea from './components/DraggableArea';
import Table from './components/Table/Table';
import {
	toggleOnBoardingModal,
	togglePriceModal,
	useConfig,
} from '@/store/slice/configSlice';
import TableContainer from './components/Table/TableContainer';
import Header from '@/components/header/Header';
import ResizablePaddingWithHandle from '@/components/ResizablePaddingWithHandle';
import { updateHeight, useDNDBox } from '@/store/slice/DNDBoxSlice';
import { GlobalModal } from '@/components/modal/GlobalModal';
import ColorModal from './components/ColorModal/ColorModal';
import OnBoardingModal from './components/OnBoardingModal/OnBoardingModal';
import NoResponsiveFooter from '@/components/footer/NoResponsiveFooter';
import UploadModal from './components/UploadModal/UploadModal';
import DiscountOptionBox from '@/app/priceCard/components/DiscountOptionBox/DiscountOptionBox';
import PriceCardBox from '@/app/priceCard/components/PriceCardBox/PriceCardBox';

export default function EditTemplate() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { priceModal, dispatch } = usePriceModal();

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	// 아래의 데이터 목록은 api로부터 받아오는 데이터임을 명심할 것
	// const yearDiscount = 10;
	// const cardCount = 2;
	// const headDiscount = [
	// 	{ headCount: 5, discountRate: 10 },
	// 	{ headCount: 10, discountRate: 20 },
	// 	{ headCount: 15, discountRate: 30 },
	// 	{ headCount: 20, discountRate: 40 },
	// ];
	// const testCard: PriceCard[] = [
	// 	{
	// 		title: '테스트 카드',
	// 		price: 10000,
	// 		discountRate: 10,
	// 		detail: '테스트 카드 상세',
	// 		feature: '테스트 카드 특징',
	// 		content: ['테스트 카드 내용1', '테스트 카드 내용2', '테스트 카드 내용3'],
	// 	},
	// 	{
	// 		title: '테스트 카드',
	// 		price: 10000,
	// 		discountRate: 10,
	// 		detail: '테스트 카드 상세',
	// 		feature: '테스트 카드 특징',
	// 		content: ['테스트 카드 내용1', '테스트 카드 내용2', '테스트 카드 내용3'],
	// 	},
	// ];

	// const faqTest: FAQCard[] = [
	// 	{
	// 		question: '진짜 총으로 쏴주나요?',
	// 		answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
	// 	},
	// 	{
	// 		question: '진짜 총으로 쏴주나요?',
	// 		answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
	// 	},
	// 	{
	// 		question: '진짜 총으로 쏴주나요?',
	// 		answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
	// 	},
	// 	{
	// 		question: '진짜 총으로 쏴주나요?',
	// 		answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
	// 	},
	// ];

	// useEffect(() => {
	// 	// testCard 길이만큼 price와 discountRate값을 initialState의 data로 교체한다
	// 	testCard.forEach((card, index) => {
	// 		dispatch(
	// 			updateTierDiscount({
	// 				index,
	// 				tierPrice: card.price,
	// 				discountRate: card.discountRate,
	// 			}),
	// 		);
	// 	});
	// 	dispatch(setYearDiscount(yearDiscount));
	// 	headDiscount.forEach((card, index) => {
	// 		dispatch(
	// 			updateHeadDiscount({
	// 				index,
	// 				headCount: card.headCount,
	// 				discountRate: card.discountRate,
	// 			}),
	// 		);
	// 	});
	// 	dispatch(updateCardCount(cardCount));

	// 	dispatch(setPriceCard(testCard));
	// }, []);

	useEffect(() => {
		if (priceModal.isCardSet === false) {
			configDispatch(toggleOnBoardingModal());
		}
	}, []);

	const { configState, dispatch: configDispatch } = useConfig();
	const { isPreview } = configState;

	const { boxState, dispatch: dndDispatch } = useDNDBox();

	const handleHeightUpdate = (index: number, height: number) => {
		dndDispatch(
			updateHeight({
				areaType: 'outerPaddings',
				index,
				content: height.toString(),
			}),
		);
	};

	return (
		<>
			{' '}
			{configState.isOnboardingModalOpen && <OnBoardingModal />}
			<GlobalModal />
			<Header />
			<main
				className={`responsiveLayout mx-auto mt-36 box-content flex  flex-col justify-center
					${
						configState.previewMode === 'tablet'
							? 'w-[1104px] border-x-[88px] border-[#E0E0E0]'
							: configState.previewMode === 'mobile'
							? 'border-x-[20]x w-[335px]'
							: 'w-[calc(100vw-14.5rem)]'
					}
					`}
			>
				<RightMenu />
				{configState.isPriceModalOpen && <PriceModal />}
				{configState.isColorModalOpen && <ColorModal />}
				{configState.isUploadModalOpen && <UploadModal />}
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					} w-full   `}
				>
					<DraggableArea areaType="priceCardArea" />
					<DiscountOptionBox />
					<PriceCardBox />
				</section>
				<ResizablePaddingWithHandle
					type="outer"
					onAction={(height) => {
						handleHeightUpdate(0, height);
					}}
				/>
				<TableContainer />
				<ResizablePaddingWithHandle
					type="outer"
					onAction={(height) => {
						handleHeightUpdate(1, height);
					}}
				/>
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					} w-full`}
				>
					<DraggableArea areaType="faqArea" />
					<FAQ />
				</section>
			</main>
			<NoResponsiveFooter />
		</>
	);
}
