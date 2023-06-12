'use client';

import React, { useState } from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { RxPlus, RxQuestionMarkCircled } from 'react-icons/rx'

export default function RightMenu() {

  const [isFontOption, setIsFontOption] = useState(true);
  const [isOption, setIsOption] = useState(true);
  const [isTextboxOption, setIsTextboxOption] = useState(true);
  const [isDesignOption, setIsDesignOption] = useState(true);
  const [isColorOption, setIsColorOption] = useState(true);
  

  return (
      <div className='absolute w-[232px] h-[921px] shadow-[0px_0px_4px_rgba(0,0,0,0.5)] rounded-[12px_0px_0px_12px] right-0 top-[100px] bg-white box-border'>
        {/* 미리보기 & 저장하기 */}
        <section className='flex flex-row h-[63px] px-2 mx-auto bottom-0 left-0 right-0  border-b border-solid border-gray-300'>
          <button type='button' className='w-[104px] h-[31px] m-auto mr-2 border-gray-700 border-1 rounded [3px] text-[#747474]'>미리보기</button>
          <button type='button' className='w-[104px] h-[31px] m-auto text-base font-medium text-white bg-[#00A3FF] font-ptMedium gap-10 rounded [3px]'>저장하기</button>
        </section>
        {/* 퍼블리시 버튼 */}
        <section className='h-[63px]  border-b border-solid px-2 border-gray-300' >
          <button type='button' className='w-[216px] h-[31px] mt-4 text-base font-medium text-white bg-[#00A3FF] font-ptMedium mr-6 rounded [3px]'>퍼블리시</button>
        </section>
        {/* 기본 글꼴 설정 */}
        <section className=' border-b border-solid p-3 border-gray-300'>
          <button type='button' onClick={() => setIsFontOption(!isFontOption)} className='w-full flex items-center justify-between'>
            <span className='text-sm font-bold top-114 text-[#747474]'>기본 글꼴 설정</span>
            {isFontOption ? <IoMdArrowDropup />:<IoMdArrowDropdown />}
          </button>
          {isFontOption && <select className='block w-[188px] h-[29px] mt-3 mx-auto shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.15)] rounded px-2 py-[3px]'>
            <option selected className='ml-7 text-sm text-[#747474]'>Pretendard</option>
          </select>}
        </section>
        {/* 부가기능 */}
        <section className=' border-b border-solid p-3 border-gray-300'>
          <button type='button' onClick={() => setIsOption(!isOption)} className='w-full flex items-center justify-between'>
            <span className='text-sm font-bold top-114 text-[#747474]'>부가 기능</span>
            {isOption ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
        {isOption &&
          <div>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus />
              <button type='button' className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>상세 기능표 추가</button>
            </button>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus  />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>FAQ 추가</span>
              </button>
            </div>
          }
        </section>
        {/* 텍스트 박스 */}
        <section className=' border-b border-solid p-[12px_0px_12px_12px] border-gray-300'>
          <button type='button' onClick={() => setIsTextboxOption(!isTextboxOption)} className='relative w-full flex items-center justify-between'>
            <span className='text-sm font-bold top-114 text-[#747474]'>텍스트 박스</span>
            {isTextboxOption? <IoMdArrowDropup className='absolute right-3'/> : <IoMdArrowDropdown className='absolute right-3'/>}
        </button>
        {isTextboxOption &&
          <div>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus  />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474]'>타이틀 텍스트 박스 추가</span>
            </button>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus  />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] '>서브 타이틀 텍스트 박스 추가</span>
            </button>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] '>미니 타이틀 텍스트 박스 추가</span>
            </button>
          </div>}
      </section>
      {/* 디자인 */}
        <section  className=' border-b border-solid p-3 border-gray-300 '>
          <button type='button' onClick={() => setIsDesignOption(!isDesignOption)} className='w-full flex items-center justify-between'>
          <span className='text-sm font-bold top-114 text-[#747474]'>디자인</span>
          {isDesignOption ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </button>
        {isDesignOption &&
          <div>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus  />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] 	'>임의 상하 패딩 추가</span>
            </button>
            <button type='button' className='flex mx-3 my-3 items-center'>
              <RxPlus />
              <span className='ml-2 text-sm leading-[22px] font-normal not-italic text-[#747474] 	'>스트로크 라인 추가</span>
            </button>
          </div>}
        </section>
        {/* 컬러 정보 */}
        <section className='border-b border-solid p-3 border-gray-300'>
          <button type='button' onClick={() => setIsColorOption(!isColorOption)} className='w-full flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='text-sm font-bold top-114 text-[#747474]'>컬러 정보</span>
              <RxQuestionMarkCircled className='text-[#747474]'/>
            </div>
            {isColorOption ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </button>
        {isColorOption &&
          <div className='h-[194px]'>
            <button type='button' className='flex items-center pt-4  mr-3'>
              <div className='w-[32px] h-[32px] rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                <div className='w-[24px] h-[24px] bg-[#00A3FF] rounded-[50%]'> </div>
              </div>
              <span className='ml-2 text-sm font-bold top-114 text-[#747474]'>메인 컬러</span>
            </button>
            <button type='button' className='flex items-center pt-4 mr-3'>
              <div className='w-[32px] h-[32px] rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                <div className='w-[24px] h-[24px] bg-[#60C8FF] rounded-[50%]'> </div>
              </div>
              <span className='ml-2 text-sm font-bold top-114 text-[#747474]'>서브 컬러 01</span>
            </button>
            <button type='button' className='flex items-center pt-4 mr-3'>
              <div className='w-[32px] h-[32px] rounded-[50%] flex items-center justify-center border border-solid border-[#dddddd]'>
                <div className='w-[24px] h-[24px] bg-[#9CDCFF] rounded-[50%]'> </div>
              </div>
              <span className='ml-2 text-sm font-bold top-114 text-[#747474]'>서브 컬러 02</span>
            </button>
          </div>}
        </section>
        <section className='absolute flex flex-row h-[63px] mx-auto px-2 bottom-0 left-0 right-0 border-t border-solid border-gray-300'>
          <button type='button' className='w-[104px] h-[31px] mr-2 m-auto border-gray-700 border-1 rounded [3px] text-[#747474]'>되돌리기</button>
          <button type='button' className='w-[104px] h-[31px] m-auto text-base font-medium text-white bg-[#00A3FF] font-ptMedium gap-10 rounded [3px]'>다시실행</button>
        </section>
      </div>

  )
}
