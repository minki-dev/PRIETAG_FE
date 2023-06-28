'use client';

import { useFAQ } from '@/store/slice/faqSlice';
import React from 'react';
import QnACard from './QnACard';
import { useConfig } from '@/store/slice/configSlice';
export default function FAQ() {
	const { faq } = useFAQ();
	const { configState } = useConfig();
	return (
		<>
			<div
				className={` w-full max-w-[1656px] border-[16px] bg-white  ${
					configState.isPreview === false
						? 'border-[#ebf2ff]'
						: 'border-transparent'
				}`}
			>
				{faq.faqList.map((item, index) => (
					<QnACard
						key={item.id}
						index={index}
						question={item.question}
						answer={item.answer}
					/>
				))}
			</div>
		</>
	);
}
