'use client'
import React from 'react'
import { signUpUser } from '@/lib/actions/user.actions'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpDefaultValues } from '@/constants'
const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ""
    })
    const SignUpButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button disabled={pending} className='w-full' variant='default'>
                {pending ? 'Signing Up...' : 'Sign Up'}
            </Button>
        )
    }
    return (
        <form action={action}>
            <div className='space-y-6'>
            <div className='space-y-2'>
                    <Label className='space-y-1 space-x-2' htmlFor='Name'>Name</Label>
                    <Input name="name"
                        id='name'
                        type='text'
                        placeholder='John Doe'
                        required
                        autoComplete='neme'
                        defaultValue={SignUpDefaultValues.name}
                    />
                </div>
                <div className='space-y-2'>
                    <Label className='space-y-1 space-x-2' htmlFor='email'>Email</Label>
                    <Input name="email"
                        id='email'
                        type='email'
                        placeholder='example@email.com'
                        required
                        autoComplete='email'
                        defaultValue={SignUpDefaultValues.email}
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
                        defaultValue={SignUpDefaultValues.password}
                    />
                </div>
                <div className='space-y-2'>
                    <Label className='space-y-1 space-x-2' htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        name="confirmPassword"
                        id='confirmPassword'
                        type='password'
                        placeholder='confirmPassword'
                        required
                        autoComplete='confirmPassword'
                        defaultValue={SignUpDefaultValues.confirmPassword}
                    />
                </div>
                <div className='space-y-2'>
                    <SignUpButton />
                </div>
                {data && !data.success && (
                    <div className='text-center text-destructive'>
                        {data.message}
                    </div>
                )}
                <div className='text-center text-muted-foreground'>
                   Already  have an account?{' '} ?
                    <Link href='/sign-in' target='_self' className='link'>
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default SignUpForm
