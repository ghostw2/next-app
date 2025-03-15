"use server"
import React from 'react'
import ModeToggle from './mode-toggle'
import { Button } from '@/components/ui/button'
import {  EllipsisVertical, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import UserButton from './user-button'
const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
        <nav className="hidden md:flex w-full max-ws-xs gap-1">
        <ModeToggle/>   
        <Button asChild variant='ghost'>
            <Link href='/card'>
                <ShoppingCart />Card
            </Link>
        </Button>
              <UserButton />
          </nav>
          <nav className="md:hidden">
              <Sheet>
                  <SheetTrigger className='align-middle'>
                      <EllipsisVertical/>
                  </SheetTrigger>
                  <SheetContent className='flex flex-col '>
                      <SheetTitle>
                          Menu
                      </SheetTitle>
                      <SheetDescription className='flex flex-col items-start'>
                          <ModeToggle />
                          <Button asChild variant='ghost'>
                              <Link href='/card'>
                                  <ShoppingCart/> Card
                              </Link>
                          </Button>
                          <UserButton />
                      </SheetDescription>
                  </SheetContent>
              </Sheet>
          </nav>
    </div>
  )
}

export default Menu
