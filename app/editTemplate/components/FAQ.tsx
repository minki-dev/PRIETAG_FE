'use client';

import { useFAQ } from '@/store/slice/faqSlice';
import React from 'react';
import QnACard from './QnACard';
export default function FAQ() {
	const { faq } = useFAQ();

	return (
		<>
			<div
				className={` w-full max-w-[1496px] border-[16px] bg-white  ${
					faq.isPreview === false ? 'border-[#ebf2ff]' : 'border-transparent'
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
