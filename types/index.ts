import { z } from 'zod';
import { InsertProductSchema } from '@/lib/validators';
export type Product =z.infer<typeof InsertProductSchema> & {
    id: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}