
"use server"
import React from 'react'
import { auth,} from '@/auth'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import SignOutForm from '@/components/sign-out-form';


const UserButton = async () => {
    const session = await auth();
    if (!session)
        return (
            <Button asChild >
                <Link href='/sign-in'>
                    <UserIcon />
                </Link>
            </Button>
        )
    const userInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U' 

    return (
        <div className='flex gap-2 items-center w-full align-center'>
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='relative w-8 h-8 rounded-full flex items-center justify-center bg-gray-200'>
                    {userInitial}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 p-2 bg-slate-200' align='end'  >
                    <DropdownMenuLabel className='font-normal pt-1'>
                        <div className="flex flex-col space-y-1">
                            <div className="text-sm font-medium leading-none">
                                {session.user?.name}
                            </div>
                            <div className="text-sm font-muted-foreground leading-none">
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className='p-0 mb-1'>
                    </DropdownMenuItem>
                    
            </DropdownMenuContent>
            </DropdownMenu>
            {session && <SignOutForm/> }
    </div>
    )
}

export default UserButton
