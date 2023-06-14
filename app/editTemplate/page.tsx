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

export default function EditTemplate() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { priceModal, dispatch } = usePriceModal();
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

	return (
		<div>
			<div>TemplateEdit</div>
			<RightMenu />
			<FAQ />
			<main>
				<button type="button" onClick={toggleModal}>
					모달 나와라 얍!
				</button>
				{isModalOpen && <PriceModal toggleModal={toggleModal} />}
				<Counter />
				{/* 테스트 카드 내용 */}
				{priceModal.priceCard.map((card) => (
					<div className="mb-4">
						<h1>카드 이름: {card.title}</h1>
						<h2>가격 : {card.price}</h2>
						<h3>할인율 : {card.discountRate}</h3>
						<h4>디테일 : {card.detail}</h4>
						<h5>제공 기능{card.feature}</h5>
						{card.content.map((content) => (
							<p>기능 상세 설명 : {content}</p>
						))}
					</div>
				))}
				인원별 할인 내용
				{priceModal.headDiscount.map((card) => (
					<div>
						<h1>인원 : {card.headCount}</h1>
						<h2>할인율 :{card.discountRate}</h2>
					</div>
				))}
				연간 할인율
				{priceModal.yearDiscountRate}
			</main>
		</div>
	);
}
