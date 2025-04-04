'use server'   

import { cookies } from 'next/headers';
import { formatError, round_to_2_decimal, toPlainObject } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cardItemSchema, insertCardSchema } from '../validators';
import { revalidatePath } from 'next/cache';
import { CardItem } from '@/types';



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
export const removeItemFromCard = async (productId: string) => { 
    try {
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
            const product = await prisma.product.findFirst({
                where: {
                    id: productId
                }
            })
            
        if (!product) throw new Error("Product does not exists")
        const card = await getMyCart();
        if (!card) throw new Error("Card does not exists");
        //check if item exists inside the card
        const exists = (card.items as CardItem[]).find((item) =>  item.productId === product.id )
        if (!exists) throw new Error("Item does not exists in the card");
        if (exists.qty === 1) {
            card.items = (card.items as CardItem[]).filter((item) => item.productId !== product.id )
        } else {
            exists.qty = exists.qty - 1;
        }
        const prices = await calcPrice(card.items)
            
            await prisma.card.update({
                where: {
                    id:card.id
                },
                data: {
                    items: { set: card.items  },
                    ...prices
                }
            })
        revalidatePath(`/product/${product.slug}`);
        return {success:true,message:`${product.name} was removed from the shopping card`}

    } catch (error) {
        return { success:false,message:formatError(error)}
    }

}
export const addItemToCard = async (data: CardItem) => {
    try {
        //get sessionCardId
        const sessionCardId = (await cookies()).get('sessionCardId')?.value;
        if (!sessionCardId) throw new Error("Session  is not defined")
        
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;
        // get card
        const  card = await getMyCart();
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
                    items: {set :card.items} ,
                    ...prices
                }
            })
        }
        revalidatePath(`/product/${product.slug}`);
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
            itemsPrice: card.itemsPrice.toNumber(),
            totalPrice: card.totalPrice.toNumber(),
            shippingPrice: card.shippingPrice.toNumber(),
            taxPrice: card.taxPrice.toNumber(),

        }) 
 }