import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main(){
    try {
        const prisma = new PrismaClient();
    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });

    }
    catch(error) { 
        console.error(error);
    }
    
}
main();