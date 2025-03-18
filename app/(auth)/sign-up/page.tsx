
import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth';
import { redirect } from 'next/navigation'
import SignUpForm from './sign-up-form'


export const metadata: Metadata = {
    title: "Sign Up"
}
const SignUpPage = async (props: {
    searchParams: Promise<{
        callbackUrl:string
    }>
}) => {
    const { callbackUrl } = await props.searchParams
    const session = await auth()
    if (session) {
        console.log('redirecting');
       return redirect(callbackUrl || '/')
    }
  return (
      <div className='w-full max-w-md mx-auto'>
          <Card>
              <CardHeader className='space-y-4'>
                  <Link href='/' className="flex-center">
                      <Image src="/images/logo.svg" alt="logo" width={100} height={100}/>
                  </Link>
                  <CardTitle className='text-center'>
                  Sign Up
                  </CardTitle>
                  <CardDescription className="text-center">
                      Register you account 
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <SignUpForm/>
              </CardContent>
          </Card>
     
    </div>
  )
}

export default SignUpPage
