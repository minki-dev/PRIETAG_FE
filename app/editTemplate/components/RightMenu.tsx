'use client';

import React, { useState } from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from'react-icons/md';
import { RxPlus, RxQuestionMarkCircled } from 'react-icons/rx'

export default function RightMenu() {

  const [isFontOption, setIsFontOption] = useState(true);
  const [isOption, setIsOption] = useState(true);
  const [isTextboxOption, setIsTextboxOption] = useState(true);
  const [isDesignOption, setIsDesignOption] = useState(true);
  const [isColorOption, setIsColorOption] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  

  return (
    <>
      <div className={`fixed h-full top-0 z-10 pt-10 transition-all ${!isMenuOpen ? '-right-[246px]':' right-0'}`}>
        <div className='relative h-fit w-[246px]'>
        <button type='button' onClick={() => setIsMenuOpen(!isMenuOpen)} className={`absolute flex justify-center items-center right-[246px] z-[1] w-[32px] h-[80px] top-1/2 -translate-y-1/2 shadow-[0px_0px_6px_rgba(0,0,0,0.15)] rounded-l-xl  ${!isMenuOpen ? ' bg-[#00A3FF]':'bg-[#ffffff]'}`}>
          {isMenuOpen ? <MdOutlineArrowForwardIos className=' text-[#00A3FF] text-xl'/> : <MdOutlineArrowBackIos className=' text-[#ffffff] text-xl'/>}
        </button>

        <div className={`relative z-[2] h-fit pb-[59px] overflow-x-hidden shadow-[0px_0px_4px_rgba(0,0,0,0.5)] rounded-[12px_0px_0px_12px] bg-white box-border`}>
          {/* 미리보기 & 저장하기 */}
          <section className='flex flex-row h-[63px] px-2 mx-auto bottom-0 left-0 right-0  border-b border-solid border-gray-300'>
            <button type='button' className='w-[104px] h-[31px] m-auto mr-2 border-gray-700 border-1 rounded [3px] text-[#747474]'>미리보기</button>
            <button type='button' className='w-[104px] h-[31px] m-auto text-base font-medium text-white bg-[#00A3FF] font-ptMedium gap-10 rounded [3px]'>저장하기</button>
          </section>

          {/* 퍼블리시 버튼 */}
          <section className='h-[63px] border-b border-solid border-gray-300' >
            <button type='button' className='absolute w-[216px] h-[31px] ml-4 mt-4 text-base font-medium text-white bg-[#00A3FF] font-ptMedium rounded [3px]'>퍼블리시</button>
          </section>

          {/* 기본 글꼴 설정 */}
          <section className='rightmenu_li'>
            <button type='button' onClick={() => setIsFontOption(!isFontOption)} className='button_li'>
              <span className='option_li'>기본 글꼴 설정</span>
              {isFontOption ? <IoMdArrowDropup className='hover:text-[#00A3FF]'/>:<IoMdArrowDropdown className='hover:text-[#00A3FF]'/>}
            </button>
            {isFontOption && <select className='block w-[188px] h-[29px] mt-3 mx-auto shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.15)] rounded px-2 py-[3px]'>
              <option className='hover:bg-[#00A3FF] ml-7 text-sm text-[#747474]'>Pretendard</option>
              <option className='hover:bg-[#00A3FF] ml-7 text-sm text-[#747474]'>Google Noto Sans KR</option>
              <option className='hover:bg-[#00A3FF] ml-7 text-sm text-[#747474]'>Spoqa Han Sans Neo</option>
              <option className='hover:bg-[#00A3FF] ml-7 text-sm text-[#747474]'>IBM Plex Sans KR</option>
            </select>}
          </section>

          {/* 부가기능 */}
          <section className='rightmenu_li'>
            <button type='button' onClick={() => setIsOption(!isOption)} className='button_li'>
              <span className='option_li'>부가 기능</span>
              {isOption ? <IoMdArrowDropup className='hover:text-[#00A3FF]'/>:<IoMdArrowDropdown className='hover:text-[#00A3FF]'/>}
            </button>
          {isOption &&
            <div>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus />
                <div className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>상세 기능표 추가</div>
              </button>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus  />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>FAQ 추가</span>
              </button>
              </div>
            }
          </section>

          {/* 텍스트 박스 */}
          <section className='border-b border-solid p-[12px_0px_12px_12px] border-gray-300'>
            <button type='button' onClick={() => setIsTextboxOption(!isTextboxOption)} className='relative button_li'>
              <span className='option_li'>텍스트 박스</span>
              {isTextboxOption? <IoMdArrowDropup className='hover:text-[#00A3FF] absolute right-3'/> : <IoMdArrowDropdown className='hover:text-[#00A3FF] absolute right-3'/>}
          </button>
          {isTextboxOption &&
            <div>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus  />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>타이틀 텍스트 박스 추가</span>
              </button>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus  />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] '>서브 타이틀 텍스트 박스 추가</span>
              </button>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] '>미니 타이틀 텍스트 박스 추가</span>
              </button>
            </div>}
          </section>
          {/* 디자인 */}
          <section  className='rightmenu_li '>
            <button type='button' onClick={() => setIsDesignOption(!isDesignOption)} className='button_li'>
            <span className='option_li'>디자인</span>
            {isDesignOption ? <IoMdArrowDropup className='hover:text-[#00A3FF]'/>:<IoMdArrowDropdown className='hover:text-[#00A3FF]'/>}
          </button>
          {isDesignOption &&
            <div>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center '>                <RxPlus  />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] 	'>임의 상하 패딩 추가</span>
              </button>
              <button type='button' className='w-[198px] h-[39px] group hover:shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:text-[#00A3FF] rounded flex mx-3 items-center'>                <RxPlus />
                <span className='group-hover:text-[#00A3FF] ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] 	'>스트로크 라인 추가</span>
              </button>
            </div>}
          </section>

          {/* 컬러 정보 */}
          <section className='rightmenu_li'>
            <button type='button' onClick={() => setIsColorOption(!isColorOption)} className='w-full flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='option_li'>컬러 정보</span>
                <RxQuestionMarkCircled className='text-[#747474]'/>
              </div>
              {isColorOption ? <IoMdArrowDropup className='hover:text-[#00A3FF]'/>:<IoMdArrowDropdown className='hover:text-[#00A3FF]'/>}
          </button>
          {isColorOption &&
            <div>
              <button type='button' className='flex items-center pt-4  mr-3'>
                <div className='w-[32px] h-[32px] ml-2 rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                  <div className='w-[24px] h-[24px] bg-[#00A3FF] rounded-[50%]'> </div>
                </div>
                <span className='ml-2 text'>메인 컬러</span>
              </button>
              <button type='button' className='flex items-center pt-4 mr-3'>
                <div className='w-[32px] h-[32px] ml-2 rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                  <div className='w-[24px] h-[24px] bg-[#60C8FF] rounded-[50%]'> </div>
                </div>
                <span className='ml-2 text'>서브 컬러 01</span>
              </button>
              <button type='button' className='flex items-center pt-4 mr-3'>
                <div className='w-[32px] h-[32px] ml-2 rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                  <div className='w-[24px] h-[24px] bg-[#9CDCFF] rounded-[50%]'> </div>
                </div>
                <span className='ml-2 text'>서브 컬러 02</span>
              </button>
            </div>}
          </section>
          <section className='absolute flex flex-row h-[63px] mx-auto px-2 bottom-0 left-0 right-0'>
            <button type='button' className='w-[104px] h-[31px] mr-2 m-auto border-gray-700 border-1 rounded [3px] text-[#747474]'>되돌리기</button>
            <button type='button' className='w-[104px] h-[31px] m-auto text-base font-medium text-white bg-[#00A3FF] font-ptMedium gap-10 rounded [3px]'>다시실행</button>
          </section>
        </div>
        </div>
      </div>
    </>

  )
}
