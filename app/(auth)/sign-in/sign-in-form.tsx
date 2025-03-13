'use client'
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignInDefaultValues } from '@/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { useActionState } from 'react';
import { useFormStatus} from 'react-dom';

const SignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message:''
        
    })

    const SignInButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button disabled={pending} className='w-full' variant='default'>
                {pending ? 'Signing in...':'Sign In'}
            </Button>
        )
    }
    return (
      <form action={action}>
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
                    <SignInButton/>
                </div>
                {data && !data.success && (
                    <div className='text-center text-destructive'>
                        {data.message}
                    </div>
                )}
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
