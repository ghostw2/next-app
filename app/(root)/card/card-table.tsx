'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import Image from 'next/image'
import { addItemToCard, getMyCart, removeItemFromCard } from '@/lib/actions/card.actions'
import { Card, CardItem } from '@/types'
import { Plus, Minus, Loader, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
const CardTable = ({ card }: { card?: Card }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

  return (
    <>
        <h2 className='text-2xl font-bold'>
            My Shopping Card      
          </h2>
          {!card || card.items.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full'>
                  <p className='text-gray-500'>Your card is empty</p>
                  <Link href='/' className="text-blue-500 hover:underline"> Go Shopping</Link>
          </div>
       )
        :
        (<div className="grid md:grid-cols-4 md:gap-5 w-100%">
            <div className='overflow-x-auto md:col-span-3'>
              <Table className='w-full'>
                <TableHeader>
                <TableRow>
                  <TableHead >Item</TableHead>
                  <TableHead className='text-center'>Qty</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {card.items && (card.items as CardItem[]).map((item) =>
                  <TableRow key={item.slug}>
                    <TableCell className='text-black flex items-center gap-2'>
                      <Link className='text-blue-500 hover:underline flex items-center' href={`/product/${item.slug}`} >
                        <Image src={item.image} alt={item.slug} width={50} height={50} />
                        <span className=''>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className='text-center'>{item.qty}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                  </TableRow>
                )}
              </TableBody>
              </Table>
            </div>
          
          </div>)}
    </>
  )
}

export default CardTable
