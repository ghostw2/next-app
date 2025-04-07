import React from 'react'
import { GetUserPaymentMethod } from '@/lib/actions/user.actions'
import PaymentMethodForm from './payment-method-form'
import CheckoutSteps from '@/components/checkout-steps'
import { Metadata } from 'next'
// import { useRouter } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Select Payment Mehthod',
    description: "Shipping Address",
    keywords: "Shipping Address",
}
const PaymentMethodPage = async () => {
    const paymentMethod = await GetUserPaymentMethod()

    return (
        <>
            <div className='flex items-center flex-col'>
                <CheckoutSteps current={2} />
                <PaymentMethodForm paymentMethod={paymentMethod} />
            </div>
        </>
    )
}

export default PaymentMethodPage
