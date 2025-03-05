'use client';
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
    const [currentImage, setCurrentImage] = useState(images[0])
  return (
      <>
          <div className='w-full'>
              <Image src={currentImage} alt="product-image" width={1000} height={1000} className='min-h-[300]'/>
          </div>
          <div className='flex flex-row gap-2 mt-2'>
              {images.map((image) => {
                  const active_image = (image == currentImage ? 'border-yellow-400' :'border-gray-50')
                  return (
                      <div key={image} onClick={() => setCurrentImage(image)} className={cn(active_image,'cursor-pointer border hover:border-yellow-200')  }>
                          <Image src={image} alt="product-image" width={100} height={100}/>
                      </div>
                  )
              })}
          </div>
    </>
  )
}

export default ProductImages
