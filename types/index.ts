// import { z } from 'zod';
// import { InsertProductSchema } from '@/lib/validators';
import { Decimal } from '@prisma/client/runtime/library';
import { cardItemSchema, insertCardSchema, } from '@/lib/validators';
import { ShippingAddressSchema } from '@/lib/client-safe-validators';
import { z } from 'zod';
 export type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    brand: string;
    description: string;
    stock: number;
    images: string[];
    isFeatured: boolean;
    banner: string | null;
    price: Decimal;
    rating: Decimal;
    numReviews: number;
    createdAt: Date;
    updatedAt: Date;
 };
export type Card = z.infer<typeof insertCardSchema>
export type CardItem = z.infer<typeof cardItemSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>