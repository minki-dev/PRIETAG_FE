'use client';

import { ModalTypes } from '@/components/modal/ModalState';
import { BoxType } from '@/constants/box';
import { addBox, useDNDBox } from '@/store/slice/DNDBoxSlice';
import { togglePreview, useConfig } from '@/store/slice/configSlice';
import { openModal, useModal } from '@/store/slice/modalSlice';
import { addTable } from '@/store/slice/featureTableSlice';
import React, { useState } from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import {
	MdOutlineArrowForwardIos,
	MdOutlineArrowBackIos,
} from 'react-icons/md';
import { RxPlus, RxQuestionMarkCircled } from 'react-icons/rx';

export default function RightMenu() {
	const [isFontOption, setIsFontOption] = useState(true);
	const [isOption, setIsOption] = useState(true);
	const [isTextboxOption, setIsTextboxOption] = useState(true);
	const [isDesignOption, setIsDesignOption] = useState(true);
	const [isColorOption, setIsColorOption] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const { dispatch: dndDispatch, boxState } = useDNDBox();
	const { dispatch: modalDispatch } = useModal();
	const { configState, dispatch: configDispatch } = useConfig();

	const handleAddTable = () => {
		dndDispatch(addTable());
	};

	const handleAddBox = (boxType: BoxType) => {
		if (boxState.selectedBox === null) {
			modalDispatch(openModal(ModalTypes.PositionSelectModal));
			return;
		}
		dndDispatch(addBox({ boxType }));
	};

	const handleTogglePreview = () => {
		configDispatch(togglePreview());
	};

	return (
		<>
			<div
				className={`fixed top-0 z-10 h-full pt-10 transition-all ${
					!isMenuOpen ? '-right-[246px]' : ' right-0'
				}`}
			>
				<div className="relative h-fit w-[246px]">
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`absolute right-[246px] top-1/2 z-[1] flex h-[80px] w-[32px] -translate-y-1/2 items-center justify-center rounded-l-xl shadow-[0px_0px_6px_rgba(0,0,0,0.15)]  ${
							!isMenuOpen ? ' bg-[#00A3FF]' : 'bg-[#ffffff]'
						}`}
					>
						{isMenuOpen ? (
							<MdOutlineArrowForwardIos className=" text-xl text-[#00A3FF]" />
						) : (
							<MdOutlineArrowBackIos className=" text-xl text-[#ffffff]" />
						)}
					</button>

					<div
						className={`relative top-[40px] z-[2] box-border h-fit overflow-x-hidden rounded-[12px_0px_0px_12px] bg-white pb-[59px] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]`}
					>
						{/* 미리보기 & 저장하기 */}
						<section className="bottom-0 left-0 right-0 mx-auto flex h-[63px] flex-row border-b  border-solid border-gray-300 px-2">
							<button
								onClick={handleTogglePreview}
								type="button"
								className="[3px] m-auto mr-2 h-[31px] w-[104px] rounded border-1 border-gray-700 text-[#747474]"
							>
								미리보기
							</button>
							<button
								type="button"
								className="[3px] m-auto h-[31px] w-[104px] gap-10 rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
							>
								저장하기
							</button>
						</section>

						{/* 퍼블리시 버튼 */}
						<section className="h-[63px] border-b border-solid border-gray-300">
							<button
								type="button"
								className="[3px] absolute ml-4 mt-4 h-[31px] w-[216px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
							>
								퍼블리시
							</button>
						</section>

						{/* 기본 글꼴 설정 */}
						<section className="rightmenu_li">
							<button
								type="button"
								onClick={() => setIsFontOption(!isFontOption)}
								className="button_li"
							>
								<span className="option_li">기본 글꼴 설정</span>
								{isFontOption ? (
									<IoMdArrowDropup className="hover:text-[#00A3FF]" />
								) : (
									<IoMdArrowDropdown className="hover:text-[#00A3FF]" />
								)}
							</button>
							{isFontOption && (
								<select className="mx-auto mt-3 block h-[29px] w-[188px] rounded px-2 shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.15)]">
									<option className="ml-7 text-sm text-[#747474] hover:bg-[#00A3FF]">
										Pretendard
									</option>
									<option className="ml-7 text-sm text-[#747474] hover:bg-[#00A3FF]">
										Google Noto Sans KR
									</option>
									<option className="ml-7 text-sm text-[#747474] hover:bg-[#00A3FF]">
										Spoqa Han Sans Neo
									</option>
									<option className="ml-7 text-sm text-[#747474] hover:bg-[#00A3FF]">
										IBM Plex Sans KR
									</option>
								</select>
							)}
						</section>

						{/* 부가기능 */}
						<section className="rightmenu_li">
							<button
								type="button"
								onClick={() => setIsOption(!isOption)}
								className="button_li"
							>
								<span className="option_li">부가 기능</span>
								{isOption ? (
									<IoMdArrowDropup className="hover:text-[#00A3FF]" />
								) : (
									<IoMdArrowDropdown className="hover:text-[#00A3FF]" />
								)}
							</button>
							{isOption && (
								<div>
									<button
										onClick={handleAddTable}
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										<RxPlus />
										<div className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF]">
											상세 기능표 추가
										</div>
									</button>
									<button
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF]">
											FAQ 추가
										</span>
									</button>
								</div>
							)}
						</section>

						{/* 텍스트 박스 */}
						<section className="border-b border-solid border-gray-300 p-[12px_0px_12px_12px]">
							<button
								type="button"
								onClick={() => setIsTextboxOption(!isTextboxOption)}
								className="button_li relative"
							>
								<span className="option_li">텍스트 박스</span>
								{isTextboxOption ? (
									<IoMdArrowDropup className="absolute right-3 hover:text-[#00A3FF]" />
								) : (
									<IoMdArrowDropdown className="absolute right-3 hover:text-[#00A3FF]" />
								)}
							</button>
							{isTextboxOption && (
								<div>
									<button
										onClick={() => handleAddBox('TITLE')}
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF]">
											타이틀 텍스트 박스 추가
										</span>
									</button>
									<button
										onClick={() => handleAddBox('SUBTITLE')}
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF] ">
											서브 타이틀 텍스트 박스 추가
										</span>
									</button>
									<button
										onClick={() => handleAddBox('TEXT')}
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF] ">
											미니 타이틀 텍스트 박스 추가
										</span>
									</button>
								</div>
							)}
						</section>
						{/* 디자인 */}
						<section className="rightmenu_li ">
							<button
								type="button"
								onClick={() => setIsDesignOption(!isDesignOption)}
								className="button_li"
							>
								<span className="option_li">디자인</span>
								{isDesignOption ? (
									<IoMdArrowDropup className="hover:text-[#00A3FF]" />
								) : (
									<IoMdArrowDropdown className="hover:text-[#00A3FF]" />
								)}
							</button>
							{isDesignOption && (
								<div>
									<button
										onClick={() => handleAddBox('PADDING')}
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:px-2 hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] "
									>
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF] 	">
											임의 상하 패딩 추가
										</span>
									</button>
									<button
										type="button"
										className="group mx-3 flex h-[39px] w-[198px] items-center rounded hover:text-[#00A3FF] hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
									>
										{' '}
										<RxPlus />
										<span className="ml-2 text-sm font-normal not-italic leading-[22px] text-[#747474] group-hover:text-[#00A3FF] 	">
											스트로크 라인 추가
										</span>
									</button>
								</div>
							)}
						</section>

						{/* 컬러 정보 */}
						<section className="rightmenu_li">
							<button
								type="button"
								onClick={() => setIsColorOption(!isColorOption)}
								className="flex w-full items-center justify-between"
							>
								<div className="flex items-center">
									<span className="option_li">컬러 정보</span>
									<RxQuestionMarkCircled className="text-[#747474]" />
								</div>
								{isColorOption ? (
									<IoMdArrowDropup className="hover:text-[#00A3FF]" />
								) : (
									<IoMdArrowDropdown className="hover:text-[#00A3FF]" />
								)}
							</button>
							{isColorOption && (
								<div>
									<button type="button" className="mr-3 flex items-center pt-4">
										<div className="ml-2 flex h-[32px] w-[32px] items-center justify-center rounded-[50%] border border-solid border-[#dddddd]">
											<div
												style={{
													backgroundColor: `${configState.color.mainColor}`,
												}}
												className={`h-[24px] w-[24px]  rounded-[50%]`}
											>
												{' '}
											</div>
										</div>
										<span className="text ml-2">메인 컬러</span>
									</button>
									<button type="button" className="mr-3 flex items-center pt-4">
										<div className="ml-2 flex h-[32px] w-[32px] items-center justify-center rounded-[50%] border border-solid border-[#dddddd]">
											<div
												style={{
													backgroundColor: `${configState.color.subColor01}`,
												}}
												className="h-[24px] w-[24px] rounded-[50%] "
											>
												{' '}
											</div>
										</div>
										<span className="text ml-2">서브 컬러 01</span>
									</button>
									<button type="button" className="mr-3 flex items-center pt-4">
										<div className="ml-2 flex h-[32px] w-[32px] items-center justify-center rounded-[50%] border border-solid border-[#dddddd]">
											<div
												style={{
													backgroundColor: `${configState.color.subColor02}`,
												}}
												className="h-[24px] w-[24px] rounded-[50%] "
											>
												{' '}
											</div>
										</div>
										<span className="text ml-2">서브 컬러 02</span>
									</button>
								</div>
							)}
						</section>
						<section className="absolute bottom-0 left-0 right-0 mx-auto flex h-[63px] flex-row px-2">
							<button
								type="button"
								className="[3px] m-auto mr-2 h-[31px] w-[104px] rounded border-1 border-gray-700 text-[#747474]"
							>
								되돌리기
							</button>
							<button
								type="button"
								className="[3px] m-auto h-[31px] w-[104px] gap-10 rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
							>
								다시실행
							</button>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}
