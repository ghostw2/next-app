
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { Plus,Minus,Loader } from 'lucide-react'
import { CardItem,Card } from '@/types'
import { addItemToCard, removeItemFromCard } from '@/lib/actions/card.actions'
import { useTransition } from 'react'
const AddToCard = ({ item,card }:{item:CardItem,card?:Card}) => {
    const router = useRouter();
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const handleAddToCard = async () => {
        startTransition(async () => { 
            const res = await addItemToCard(item)
            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description:res.message
                })
                return
            }
            toast({
                description:res.message,
                action: (
                    <ToastAction className='bg-primary text-white hover:bg-gray-800' altText="Go to card"
                        onClick={() => router.push('/cart')}>
                        Go to card
                    </ToastAction>
                )
            })
        })
    }
    const handleRemoveFromCard = async () => {
        startTransition(async () => { 
            const res = await removeItemFromCard(item.productId)
            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description:res.message
                })
            } else {
                toast({
                    description: res.message,
                    action: (
                        <ToastAction className='bg-primary text-white hover:bg-gray-800' altText='Go to card'>
                            Go to Card
                        </ToastAction>
                    )
                })
            }
        })
     }
    const alreadyInCard = card?.items.find((x)=> x.productId === item.productId)
    return alreadyInCard ? (
        <div>
            <Button variant="outline" onClick={handleRemoveFromCard}>
                { (isPending) ? (<Loader className='h-4 w=4 animate-spin'/>) : (<Minus className='h-4 w-4'/>) }
            </Button>
            <span className="mx-2">{ (isPending) ? (<Loader className='h-4 w=4 animate-spin'/>) : (alreadyInCard.qty)}</span>
            <Button variant={"outline"} onClick={handleAddToCard}>
                {(isPending) ? (<Loader className='h-4 w=4 animate-spin' />) : (<Plus className='h-4 w-4' />)}
            </Button>
        </div>
  ) :(
      <Button className='w-full' type='button' onClick={handleAddToCard}>
                {(isPending) ? (<Loader className='h-4 w=4 animate-spin'/>) :(<Plus />)}
                Add to Cart
            </Button>
  )
}

export default AddToCard
