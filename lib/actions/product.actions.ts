'use server';

import { PrismaClient } from '@prisma/client';
import { toPlainObject } from '../utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants';
//get latest proucts 
export async function getLatestProducts()  {
    const prisma = new PrismaClient();
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy:{createdAt:'desc'}
    })
    return toPlainObject(data);
}
export async function getProductBySlug(slug: string) { 
    const prisma = new PrismaClient();
    const data = await prisma.product.findFirst({
        where:{slug:slug}
    })
    return toPlainObject(data)
}