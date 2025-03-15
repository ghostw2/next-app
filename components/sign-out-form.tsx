'use server'
import React from 'react'
import { signOutUser } from '@/lib/actions/user.actions'
import { Button } from './ui/button'
const SignOutForm = () => {
  return (
    <div className='w-full'>
      <form action={signOutUser} className='w-full'>
              <Button
                className='w-full px-2 py-4 h-4 justify-start'>
                Sign Out
            </Button>
        </form>
    </div>
  )
}

export default SignOutForm
