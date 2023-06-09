'use client';

import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default function FAQ() {
	const [isPreview, setIsPreview] = React.useState(false);
	const [question, setQuestion] = React.useState('');
	const [answer, setAnswer] = React.useState('');
	const [viewAnswer, setViewAnswer] = React.useState(false);

	const toggleAnswer = () => {
		setViewAnswer(!viewAnswer);
	};

	const changeViewMode = () => {
		setIsPreview(!isPreview);
	};
	const resetInput = () => {
		setQuestion('');
		setAnswer('');
	};

	// input에 입력한 값 저장하는 메소드
	const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuestion(e.target.value);
	};
	const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value);
	};

	// 질문 입력
	// 답변 입력
	// 초기화 버튼 , 게시하기 버튼
	return (
		<div
			className={`w-full max-w-[1496px] h-[338px] bg-white border-[16px]  ${
				isPreview ? 'border-[#ebf2ff]' : 'border-transparent'
			}`}
		>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row justify-between mt-8 ">
					<div
						className={`h-12 border-dashed border-2 ${
							isPreview ? '' : 'border-transparent'
						} py-2 px-4 w-full`}
					>
						<input
							type="text"
							onChange={onChangeQuestion}
							disabled={!isPreview}
							value={question}
							placeholder="질문 내용을 입력해주세요"
							className="text-[borderGray] placeholder-[#00a3ff] font-ptMedium font-medium text-xl  placeholder-center w-full focus:outline-none bg-white "
						/>
					</div>
					<div className="flex items-center justify-center h-12 w-14">
						<IoIosArrowDown
							className={`scale-150 ${viewAnswer ? '' : 'rotate-180'}`}
							onClick={toggleAnswer}
						/>
					</div>
				</div>
				<div className="pr-[53px] flex flex-col">
					{viewAnswer && (
						<div
							className={`h-12 border-dashed border-2 ${
								isPreview ? '' : 'border-transparent'
							} py-2 px-4 w-full }`}
						>
							<input
								type="text"
								value={answer}
								onChange={onChangeAnswer}
								disabled={!isPreview}
								placeholder="답변 내용을 입력해주세요"
								className="text-[borderGray] placeholder-[borderGray] font-ptMedium font-medium text-xl  placeholder-center w-full focus:outline-none bg-white"
							/>
						</div>
					)}

					<div className="flex justify-end gap-2">
						<button
							type="button"
							className="mt-4 h-[31px] w-[104px] text-base font-medium text-borderGray border border-[borderGray] bg-white font-ptMedium  rounded [3px]"
							onClick={resetInput}
						>
							초기화
						</button>
						<button
							type="button"
							className="mt-4 h-[31px] w-[104px] text-base font-medium text-white bg-[#00A3FF] bg-opacity-50 font-ptMedium  rounded [3px]"
						>
							게시하기
						</button>
						{/* 토글 테스트용 버튼 confirm 후 지울 것! */}
						<button
							type="button"
							className="mt-4 h-[31px] w-[104px] text-base font-medium text-white bg-[#00A3FF] bg-opacity-50 font-ptMedium  rounded [3px]"
							onClick={changeViewMode}
						>
							테스트용 버튼
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
