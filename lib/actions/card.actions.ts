'use server'   
// import { prisma } from '@/prisma/prisma-client';
    // import { toPlainObject } from '../utils'
import { CardItem } from '@/types';
import { cookies } from 'next/headers';
import { formatError, toPlainObject } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cardItemSchema } from '../validators';

export const addItemToCard = async (data: CardItem) => {
    
    try {
        //get sessionCardId
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
        
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;
        // get card 
        const card = getMyCart();
        const item = cardItemSchema.parse(data);
        const product = prisma.product.findFirst({
            where: {
                id: item.productId
            }
        })
        console.log({
            sessionId: sessionCardId,
            userId: userId,
            item:product
        })
        
        

        

        //get  product from db

        //add product to card

        //return respones to show to user
        return {
            success: true,
            message: ""
        }
    } catch (error) {
        return {
            success: true,
            message: formatError(error)
        }    
    }

    
}
export const getMyCart = async() => {
    try {
        //get sessionCardId
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
        
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;
        const card = prisma.card.findFirst(
            { where: userId ? { userId: userId } :{sessionCardId:sessionCardId}}
        )
        if (!card) return undefined;
        return toPlainObject({
            ...card,
            items: card.items as CardItem[],
            itemsPrice: card.itemsPrice,
            totalPrice: card.totalPrice,
            shippingPrice: card.shippingPrice,
            taxPrice: card.taxPrice,

        })
    } catch (error) {
        console.log("oh noo")
        return undefined;
    }
 }