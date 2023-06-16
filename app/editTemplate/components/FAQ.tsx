'use client';

import {
	FAQCard,
	addFAQ,
	clearFAQ,
	setFAQ,
	togglePreview,
	useFAQ,
} from '@/store/slice/faqSlice';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import QnACard from './QnACard';

export default function FAQ() {
	const { faq, faqDispatch } = useFAQ();

	const changeViewMode = () => {
		faqDispatch(togglePreview());
	};
	const resetInput = () => {
		faqDispatch(clearFAQ());
	};

	// input에 입력한 값 저장하는 메소드
	// const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setQuestion(e.target.value);
	// };
	// const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setAnswer(e.target.value);
	// };
	console.log(faq.isPreview);
	// 질문 입력
	// 답변 입력
	// 초기화 버튼 , 게시하기 버튼
	return (
		<>
			<div
				className={` w-full max-w-[1496px] border-[16px] bg-white  ${
					faq.isPreview === false ? 'border-[#ebf2ff]' : 'border-transparent'
				}`}
			>
				{faq.faqList.map((item, index) => (
					<QnACard question={item.question} answer={item.answer} />
				))}

				<div className="flex flex-col pr-[53px]">
					<div className="flex flex-col gap-4">
						<div className="flex justify-end gap-2">
							<button
								type="button"
								className="[3px] mt-4 h-[31px] w-[104px] rounded border border-[borderGray] bg-white font-ptMedium text-base  font-medium text-borderGray"
								onClick={resetInput}
							>
								삭제
							</button>
							<button
								type="button"
								className="[3px] mt-4 h-[31px] w-[104px] rounded bg-[#00A3FF] bg-opacity-50 font-ptMedium text-base  font-medium text-white"
							>
								게시하기
							</button>
							{/* 토글 테스트용 버튼 confirm 후 지울 것! */}
							<button
								type="button"
								className="[3px] mt-4 h-[31px] w-[104px] rounded bg-[#00A3FF] bg-opacity-50 font-ptMedium text-base  font-medium text-white"
								onClick={changeViewMode}
							>
								미리보기 활성화
							</button>

							<button
								type="button"
								className="[3px] mt-4 h-[31px] w-[104px] rounded bg-[#00A3FF] bg-opacity-50 font-ptMedium text-base  font-medium text-white"
								onClick={() => faqDispatch(addFAQ())}
							>
								FAQ 추가
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
