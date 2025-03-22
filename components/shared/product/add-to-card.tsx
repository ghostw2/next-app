
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'
import { CardItem, } from '@/types'
import { addItemToCard } from '@/lib/actions/card.actions'
const AddToCard = ({ item }:{item:CardItem}) => {
    const router = useRouter();
    const { toast } = useToast()
    const handleAddToCard = async () => {
        const res = await addItemToCard(item)
        if (!res.success) {
            toast({
                variant: 'destructive',
                description:res.message
            })
            return
        }
        toast({
            description: `${item.name} was added to card`,
            action: (
                <ToastAction className='bg-primary text-white hover:bg-gray-800' altText="Go to card"
                    onClick={() => router.push('/cart')}>
                    Go to card
                </ToastAction>
            )
        })

    }
  return (
      <Button className='w-full' type='button'
      onClick={handleAddToCard}
      ><Plus/>Add to Cart</Button>
  )
}

export default AddToCard
