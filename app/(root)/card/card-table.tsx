'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import { addItemToCard,  removeItemFromCard } from '@/lib/actions/card.actions'
import { Card as CardType, CardItem } from '@/types'
import { Plus, Minus, Loader, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
const CardTable = ({ card }: { card?: CardType}) => {
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
                    <TableCell className='text-center '>
                      <div className='flex items-center justify-center w-full'>
                      <Button variant="outline" onClick={() => startTransition(async () => {
                        const res = await removeItemFromCard(item.productId)
                        toast({
                          variant: res.success ? 'default' : 'destructive',
                          description: res.message
                        })

                      })}>
                        {(isPending) ? (<Loader className='h-4 w=4 animate-spin' />) : (<Minus className='h-4 w-4' />)}
                      </Button>
                      <span className="mx-2">{(isPending) ? (<Loader className='h-4 w=4 animate-spin' />) : (item.qty)}</span>
                      <Button variant={"outline"} onClick={() => startTransition(async () => {
                        const res = await addItemToCard(item)
                        toast({
                          variant: res.success ? 'default' : 'destructive',
                          description: res.message
                        })
                      })}>
                        {(isPending) ? (<Loader className='h-4 w=4 animate-spin' />) : (<Plus className='h-4 w-4' />)}
                      </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='md:col-span-1'>
            <Card>
              <CardHeader className='flex flex-row justify-start items-center gat-2'>
                <div className='text-lg font-semi-bold'>SubTotal({card.items.reduce((acc, x) => (acc + x.qty), 0)}):
                  <span className='text-black-500 font-bold'> { formatCurrency(card.items.reduce((acc,x)=>acc + (x.price*x.qty),0))} </span> 
                </div>
              </CardHeader>
              <CardContent>
                
                  <div className='d-flex justify-between gap-2'>
                  <Button className='w-full' disabled={isPending} onClick={() => startTransition(async () => {
                    router.push('/checkout')
                  })} >
                    {
                      isPending ? (<Loader className="h-4 w-4 animate-spin" />) : (
                        <ArrowRight className='h-4 w-4'/>
                      )
                    } Proceed to Checkout
                  </Button>    
                    
                  </div>
                
              </CardContent>
            </Card>
          </div>

        </div>)}
    </>
  )
}

export default CardTable
