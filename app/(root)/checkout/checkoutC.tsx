'use client'
import React from 'react';
import { useRouter } from 'next/navigation';


const CheckoutC = () => {
  const router = useRouter();
  router.push('/shipping-address')
  return (
    <div>

    </div>
  )
}

export default CheckoutC
