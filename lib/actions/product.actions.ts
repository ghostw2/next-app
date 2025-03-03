'use server';

import { PrismaClient } from '@prisma/client';
import { toPlainObject} from '../utils'
//get latest proucts 
export async function getLatestProducts()  {
    const prisma = new PrismaClient();
    const data = await prisma.product.findMany({
        take: 4,
        orderBy:{createdAt:'desc'}
    })
    return toPlainObject(data);
}