
import React from 'react'
import CheckoutC from './checkoutC'
import { auth } from '@/auth';

const CheckoutPage = async() => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) { 

  }
  
  return (
    <>
     <CheckoutC/>
    </>
  )
}

export default CheckoutPage
