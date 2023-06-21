import React from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export default function Loading() {
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
            src='/img/loading.svg'
            alt='Loading...'
            width={144}
            height={144}
            className='absolute top-[186px] mb-[56px]'
          />
          <h1 className='w-[640px] h-[52px] not-italic font-bold text-[32px] leading-[51px] text-center  '>
            페이지를 불러오고 있어요.
          </h1>
          <h2 className='w-[640px] h-[52px] not-italic font-medium text-2xl leading-[38px] text-[#989898] text-center'>
            로딩 중이니 잠시 기다려 주세요.
          </h2>
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
