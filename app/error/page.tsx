'use client'

import React from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/navigation'

export default function error() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className='relative flex w-[1920px] h-[808px] justify-between'>
        <div className='flex'>
          <div className='w-[240px] h-[808px] bg-[#F9E8E8]' />
          <div className=' w-[80px] h-[808px] left-[240px] bg-[#FEEEEE]' />
          <div className='w-[120px] h-[808px] left-[320px] bg-[#F6F6F6]' />
        </div>
        <div className='flex flex-col min-w-[375px] justify-center items-center'>
          <Image
            src='/img/error_404.svg'
            alt='Loading...'
            width={144}
            height={144}
            className='absolute top-[186px] mb-[56px]'
          />
          <h1 className='w-[640px] not-italic font-bold text-[32px] leading-[51px] text-center mt-[61px] '>
            페이지에 연결할 수 없어요.
          </h1>
          <h2 className='w-[640px] mb-[48px] mt-[8px] not-italic font-medium text-2xl leading-[38px] text-[#989898] text-center'>
            올바른 주소 또는 경로를 확인해 주세요.
          </h2>
          <button type='button' onClick={() => router.back()} className='w-[104px] h-[34px] border rounded border-solid border-[#747474]'>돌아가기</button>
        </div>
        <div className='flex'>
          <div className=' w-[120px] h-[808px] right-[320px] bg-[#F6F6F6]' />
          <div className=' w-[80px] h-[808px] right-[240px] bg-[#FEEEEE]' />
          <div className=' w-[240px] h-[808px] right-0 bg-[#F9E8E8]' />
        </div>
      </div>
      <Footer />
    </>
  )
}
