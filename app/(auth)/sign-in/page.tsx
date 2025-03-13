
import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import SignInForm from './sign-in-form'
import { auth } from '@/auth';
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
    title: "Sign In"
}
const SignInPage = async() => {
    const session = await auth()
    if (session) {
        console.log('redirecting');
       return redirect('/')
    }
  return (
      <div className='w-full max-w-md mx-auto'>
          <Card>
              <CardHeader className='space-y-4'>
                  <Link href='/' className="flex-center">
                      <Image src="/images/logo.svg" alt="logo" width={100} height={100}/>
                  </Link>
                  <CardTitle className='text-center'>
                  Sign In
                  </CardTitle>
                  <CardDescription className="text-center">
                      Sign in to your account 
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <SignInForm/>
              </CardContent>
          </Card>
     
    </div>
  )
}

export default SignInPage
