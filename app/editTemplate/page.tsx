'use client';

import React, { useEffect, useState } from 'react';
import {
	PriceCard,
	setPriceCard,
	setYearDiscount,
	updateCardCount,
	updateHeadDiscount,
	updateTierDiscount,
	usePriceModal,
} from '@/store/slice/priceModalSlice';
import Counter from '@/components/Counter';
import FAQ from './components/FAQ';
import PriceModal from './components/PriceModal';
// import { testCard } from './components/Test';
import RightMenu from './components/RightMenu';
import { FAQCard, setFAQ, useFAQ } from '@/store/slice/faqSlice';
import { set } from 'react-hook-form';
import DraggableArea from './components/DraggableArea';
import Table from './components/Table/Table';
import { useConfig } from '@/store/slice/configSlice';
import PriceCardBox from '../priceCard/components/PriceCardBox/PriceCardBox';
import DiscountOptionBox from '../priceCard/components/DiscountOptionBox/DiscountOptionBox';
import TableContainer from './components/Table/TableContainer';
import { useModal } from '@/store/slice/modalSlice';
import Header from '@/components/header/Header';
import TemplateHeader from '@/components/header/TemplateHeader';

export default function EditTemplate() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { priceModal, dispatch } = usePriceModal();
	const { faq, faqDispatch } = useFAQ();
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	// 아래의 데이터 목록은 api로부터 받아오는 데이터임을 명심할 것
	const yearDiscount = 10;
	const cardCount = 2;
	const headDiscount = [
		{ headCount: 5, discountRate: 10 },
		{ headCount: 10, discountRate: 20 },
		{ headCount: 15, discountRate: 30 },
		{ headCount: 20, discountRate: 40 },
	];
	const testCard: PriceCard[] = [
		{
			title: '테스트 카드',
			price: 10000,
			discountRate: 10,
			detail: '테스트 카드 상세',
			feature: '테스트 카드 특징',
			content: ['테스트 카드 내용1', '테스트 카드 내용2', '테스트 카드 내용3'],
		},
		{
			title: '테스트 카드',
			price: 10000,
			discountRate: 10,
			detail: '테스트 카드 상세',
			feature: '테스트 카드 특징',
			content: ['테스트 카드 내용1', '테스트 카드 내용2', '테스트 카드 내용3'],
		},
	];

	const faqTest: FAQCard[] = [
		{
			question: '진짜 총으로 쏴주나요?',
			answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
		},
		{
			question: '진짜 총으로 쏴주나요?',
			answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
		},
		{
			question: '진짜 총으로 쏴주나요?',
			answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
		},
		{
			question: '진짜 총으로 쏴주나요?',
			answer: '네 총으로 쏴드립니다 아주 살살 쏴드릴거에요.',
		},
	];

	useEffect(() => {
		// testCard 길이만큼 price와 discountRate값을 initialState의 data로 교체한다
		testCard.forEach((card, index) => {
			dispatch(
				updateTierDiscount({
					index,
					tierPrice: card.price,
					discountRate: card.discountRate,
				}),
			);
		});
		dispatch(setYearDiscount(yearDiscount));
		headDiscount.forEach((card, index) => {
			dispatch(
				updateHeadDiscount({
					index,
					headCount: card.headCount,
					discountRate: card.discountRate,
				}),
			);
		});
		dispatch(updateCardCount(cardCount));

		dispatch(setPriceCard(testCard));
	}, []);

	const { configState } = useConfig();
	const { isPreview } = configState;

	const {} = useModal();
	return (
		<>
			{/* <Header /> */}
			<TemplateHeader />
			<main className="mx-auto mt-36 box-content flex w-[calc(100vw-14.5rem)] flex-col justify-center">
				<RightMenu />
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					}`}
				>
					<DraggableArea areaType="priceCardArea" />
					<DiscountOptionBox />
					<PriceCardBox />
				</section>
				<TableContainer />
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					}`}
				>
					<DraggableArea areaType="faqArea" />
					<FAQ />
				</section>
			</main>
		</>
	);
}
