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
        <div className='w-[240px] h-[808px] bg-[#F9E8E8]' />
        <div className='w-[100%] justify-center items-center bg-[#F7F8FC]'>
          <div className='w-[640px] h-[373px] mt-[180px] ml-[400px]'>
            <Image
              src='/img/error_404.svg'
              alt='Loading...'
              width={144}
              height={144}
              className='mb-[56px] mx-auto'
            />
            <h1 className='w-[640px] not-italic font-bold text-[32px] leading-[51px] text-center'>
              페이지에 연결할 수 없어요.
            </h1>
            <h2 className='w-[640px] not-italic font-medium text-2xl leading-[38px] text-[#989898] text-center'>
              올바른 주소 또는 경로를 확인해 주세요.
            </h2>
            <button type='button' onClick={() => router.back()} className='w-[104px] h-[34px] ml-[268px] mt-[48px] bottom-0 border rounded border-solid border-[#747474]'>돌아가기</button>
          </div>
        </div>
        <div className=' w-[240px] h-[808px] right-0 bg-[#F9E8E8]' />
      </div>
      <Footer />
    </>
  )
}
