'use server';

import { prisma } from '@/prisma/prisma-client';
import { toPlainObject } from '../utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants';
//get latest proucts 
export async function getLatestProducts()  {
    
    const data = await prisma.product.findMany({
        cacheStrategy: {
            ttl: 60,
            swr:120
        },
        take: LATEST_PRODUCTS_LIMIT,
        orderBy:{createdAt:'desc'}
    })
    return toPlainObject(data);
}
export async function getProductBySlug(slug: string) { 
    const data = await prisma.product.findFirst({
        where:{slug:slug}
    })
    return toPlainObject(data)
}