'use client'

import React from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/navigation'

export default function loginRequest() {

  const router = useRouter();

  return (
    <>
      <Header />
      <div className='relative flex w-[1920px] h-[808px] sm:w-[375px] justify-between'>
        <div className='w-[240px] h-[808px] bg-[#F9E8E8]' />
        <div className='w-[100%] justify-center items-center bg-[#F7F8FC]'>
          <div className='w-[640px] h-[373px] mt-[180px] ml-[400px]'>
            <Image
              src='/img/loginOrregister.svg'
              alt='Loading...'
              width={144}
              height={144}
              className='mb-[56px] mx-auto'
            />
            <h1 className='w-[640px] not-italic font-bold text-[32px] leading-[51px] text-center'>
              로그인이 필요한 페이지에요.
            </h1>
            <h2 className='w-[640px] not-italic font-medium text-2xl leading-[38px] text-[#989898] text-center'>
              로그인을 하시면 모든 기능을 이용하실 수 있어요.
            </h2>
            <div className='flex flex-col'>
              {/* 로그인으로 보내기 */}
              <button type='button' className='w-[104px] h-[34px] ml-[268px] mt-[48px] bottom-0 border rounded border-solid  bg-[#00A3FF] text-[#ffffff]'>로그인</button>
              {/* 회원가입으로 보내기 */}
              <button type='button' className='text-[#BCBCBC] mt-3 text-sm'>회원가입하기</button>
            </div>
          </div>
        </div>
        <div className=' w-[240px] h-[808px] right-0 bg-[#F9E8E8]' />
      </div>
      <Footer />
    </>
  )
}
