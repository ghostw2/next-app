'use server'   
// import { prisma } from '@/prisma/prisma-client';
    // import { toPlainObject } from '../utils'
import { CardItem } from '@/types';
import { cookies } from 'next/headers';
import { formatError, round_to_2_decimal, toPlainObject } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cardItemSchema, insertCardSchema } from '../validators';

export const calcPrice = (items: CardItem[]) => {
    const itemsPrice = round_to_2_decimal(
        items.reduce(
            (acc, item) => { acc + Number(item.price) * item.qty }
        )
    )
    const shippingPrice = round_to_2_decimal(
        itemsPrice > 100 ? 0 : 10
    ) 
    const taxPrice = round_to_2_decimal(
        0.15 * itemsPrice
    )
    const totalPrice = round_to_2_decimal(
        itemsPrice + shippingPrice + taxPrice
    )
    return ({
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice:taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    })

    
}
export const addItemToCard = async (data: CardItem) => {
    
    try {
        //get sessionCardId
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
        
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;
        // get card 
        let card = await getMyCart();
        const item = cardItemSchema.parse(data);
        const product = prisma.product.findFirst({
            where: {
                id: item.productId
            }
        })
        if (!card) {
            const newCard = insertCardSchema.parse({
                userId: userId,
                items: [item],
                sessionCardId: sessionCardId,
                ...calcPrice([item])
            })
            card = newCard
        }
        if(!product) throw new Error("Product not found!")
        const already_in = await card.items.find((item) => { item.productId === product.id })
        if (already_in) already_in.qty += 1;
        else { 
            card.items.push(item)
        }
        card.items.filter()
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

        //get sessionCardId
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
        
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;
        const card = await prisma.card.findFirst(
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
 }