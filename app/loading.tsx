import React from 'react'
import loader from '@/assets/loader.gif'
import Image from 'next/image'
const LoadingPage = () => {
  return (
      <div className='h-screen w-screen flex justify-center items-center'>
      <Image src={loader} height={150} width={150} alt='loading...'></Image>
      </div>
  )
}

export default LoadingPage
