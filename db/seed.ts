import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main(){
    try {
        const prisma = new PrismaClient();
        await Promise.all([
            prisma.product.deleteMany(),
            prisma.account.deleteMany(),
            prisma.session.deleteMany(),
            prisma.verificationToken.deleteMany(),
            prisma.user.deleteMany(),
        ])
        await Promise.all([
            prisma.product.createMany({ data: sampleData.products }),
            prisma.user.createMany({ data: sampleData.users })
        ]);
         
    
    }
    catch(error) { 
        console.error(error);
    }
    
}
main();