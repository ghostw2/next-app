'use client'
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignInDefaultValues } from '@/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const SignInForm = () => {
    return (
      <form>
        <div className='space-y-6'>
            <div className='space-y-2'>
                <Label className='space-y-1 space-x-2' htmlFor='email'>Email</Label>
                    <Input name="email"
                        id='email'
                        type='email'
                        placeholder='example@email.com'
                        required
                        autoComplete='email'
                        defaultValue={SignInDefaultValues.email}
                    />
            </div>
            <div className='space-y-2'>
                <Label className='space-y-1 space-x-2' htmlFor='password'>Password</Label>
                    <Input
                        name="password"
                        id='password'
                        type='password'
                        placeholder='passwrod'
                        required
                        autoComplete='password'
                        defaultValue={SignInDefaultValues.password}
                    />
                </div>
                <div className='space-y-2'>
                    <Button type='submit' className='w-full'>Sign In</Button>
                </div>
                <div className='text-center text-muted-foreground'>
                    Don&apos;t have an account?{' '}
                    <Link href='/sign-up' target='_self' className='link'>
                        Sign Up
                    </Link>
                </div>
        </div>
    </form>        
  )
}

export default SignInForm
