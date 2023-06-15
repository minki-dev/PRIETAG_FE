import { useFAQ } from '@/store/slice/faqSlice';
import React, { ChangeEventHandler, useEffect, useRef } from 'react';
import { set } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';

export default function QnACard({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) {
	const [questionValue, setQuestionValue] = React.useState(question);
	const [answerValue, setAnswerValue] = React.useState(answer);
	const [viewAnswer, setViewAnswer] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const { faq } = useFAQ();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const toggleAnswer = () => {
		setViewAnswer(!viewAnswer);
	};

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
	});

	// input에 입력한 값 저장하는 메소드
	const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuestionValue(e.target.value);
	};
	const onChangeAnswer: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setAnswerValue(e.target.value);
		const inputValue = e.target.value;
		if (inputValue.length < 300) {
			setAnswerValue(inputValue);
			setIsError(false);
		} else {
			setIsError(true);
		}
	};
	return (
		<>
			<div className="mt-8 flex flex-row justify-between ">
				<div
					className={`flex h-20 flex-row  items-center  bg-[#EAF8FF] ${
						faq.isPreview === true
							? 'border-2 border-transparent'
							: 'border-2 border-dashed'
					} w-full px-4 py-2`}
				>
					<input
						type="text"
						onChange={onChangeQuestion}
						disabled={faq.isPreview}
						value={questionValue}
						placeholder="질문 내용을 입력해주세요"
						className=" h-6 w-full bg-[#EAF8FF]  font-ptMedium text-xl font-medium  text-[#00aeff]  placeholder-[#00a3ff] focus:outline-none "
					/>
					<div className="flex h-12 w-14 items-center justify-center">
						<IoIosArrowDown
							className={`scale-150 ${viewAnswer ? '' : 'rotate-180'}`}
							onClick={toggleAnswer}
						/>
					</div>
				</div>
			</div>
			{viewAnswer && (
				<div
					className={`  ${
						faq.isPreview === true
							? 'border-2 border-transparent'
							: 'border-2 border-dashed'
					} } h-auto w-full px-4 py-10`}
				>
					<textarea
						ref={textareaRef}
						value={answerValue}
						onChange={onChangeAnswer}
						disabled={faq.isPreview}
						maxLength={300}
						placeholder="답변 내용을 입력해주세요"
						className="placeholder-center h-auto w-full  bg-white font-ptRegular text-base font-normal text-[borderGray] placeholder-[borderGray] focus:outline-none"
					/>
					<div
						className={`text-right text-sm ${
							isError ? 'text-red-500' : 'text-[#999999]'
						}`}
					>
						{answerValue.length}/{300}
						{isError && (
							<span className={`ml-2 ${faq.isPreview ? 'hidden' : ''}}`}>
								최대 글자 수에 도달했습니다
							</span>
						)}
					</div>
				</div>
			)}
		</>
	);
}
