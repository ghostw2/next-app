import React from 'react'
import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/card.actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserById, UpdateUserShippingAddress } from '@/lib/actions/user.actions';
import ShippingCardForm from './shipping-address-form';
import { ShippingAddress } from '@/types';
import CheckoutSteps from '@/components/checkout-steps';
export const metadata: Metadata = {
  title: 'Shipping Address',
  description: "Shipping Address",
  keywords: "Shipping Address",
}
const ShippingAddressPage = async () => {
  // const card = await getMyCart();
  // if (!card || card.items.length === 0) {
  //     redirect("/cart");
  // }
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/')
  }
  const user = await getUserById(userId);
  if (!user) {
    redirect('/')
  }
  const address = user.address as ShippingAddress;
  return (
    <>
      <div className='flex items-center flex-col '>
        <CheckoutSteps current={1} />
        <ShippingCardForm address={address} />
      </div>
    </>
  )
}

export default ShippingAddressPage
