'use server'   
// import { prisma } from '@/prisma/prisma-client';
    // import { toPlainObject } from '../utils'
import { CardItem } from '@/types';
import { cookies } from 'next/headers';
import { formatError, round_to_2_decimal, toPlainObject } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cardItemSchema, insertCardSchema } from '../validators';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';



export const calcPrice = async (items: CardItem[]) => {
    const itemsPrice = round_to_2_decimal(
        items.reduce((acc, item) =>  Number(acc) + (Number(item.price) * Number(item.qty)) ,0 )
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
 
    return (
        {
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice:taxPrice,
            totalPrice: totalPrice,
        }
    )
    
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
        //console.log(typeof data.price, data.price)
        // 


        const product = await prisma.product.findFirst({
            where: {
                id: data.productId
            }
        })
        
        if (!product) throw new Error("Product does not exists")
        console.log(typeof product.price ,product.price)
        const plain = toPlainObject(product);
        
        const item = cardItemSchema.parse({
            productId: plain.id,
            name:plain.name,
            slug: plain.slug,
            qty: data.qty,
            price: Number(plain.price) ,
            image: plain.images[0]
        });
        let message 
        if (!card) {
            const prices = await calcPrice([item])
            const newCard = insertCardSchema.parse({
                userId: userId,
                items: [item],
                sessionCardId: sessionCardId,
                ...prices
            })
            
            await prisma.card.create({ data: newCard })
            message = `${product.name} was added to the shopping cart`
            revalidatePath(`/product/${product.slug}`);
        } else {
            const already_in = (card.items as CardItem[]).find((item) => item.productId === product.id )
            if (already_in) {
                if (product.stock < already_in.qty + 1) {
                    throw new Error("Not enough stock for this item")
                }
                (card.items as CardItem[]).find((item) => item.productId === product.id)!.qty = already_in.qty + 1;
                message = `${product.name}'s quantity was updated in the  shopping cart`
            }
            else { 
                if(product.stock < 1) throw new Error("This item is not in stock at the moment")
                card.items.push(item)
                message = `${product.name} was added to the shopping cart`
            }
            const prices = await calcPrice(card.items)
            
            await prisma.card.update({
                where: {
                    id:card.id
                },
                data: {
                    items: card.items as Prisma.CardUpdateitemsInput,
                    ...prices
                }
            })
        }
        

        return {
            success: true,
            message: message
        }
    } catch (error) {
        return {
            success: false,
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