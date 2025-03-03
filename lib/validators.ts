import { z } from 'zod';
import { formatNumberWithDecimalPlaces } from './utils';

const currency =  z.string()
.refine(
    (value) => 
                /^\d+(\.\d{2})?$/.test(formatNumberWithDecimalPlaces(Number(value)))
, "Price must be a valid number with 2 decimal places")
//Product 
//schema for inserting
export const InsertProductSchema = z.object({
    name: z.string().min(3, "Name should be atleast 3 characters long").max(255, "Name should be atmost 255 characters long"),
    slug: z.string().min(3, "Slug must be atleast 3 characters long").max(255, "Slug must be atmost 255 characters long"),
    category: z.string().min(3, "Category must be atleast 3 characters long").max(255, "Category must be atmost 255 characters long"),
    brand:z.string().min(3, "Brand must be atleast 3 characters long").max(255, "Brand must be atmost 255 characters long"),
    description: z.string().min(3, "Description must be atleast 3 characters long").max(255, "Description must be atmost 255 characters long"),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, "Atleast one image is required"),
    isFeatured: z.boolean(),
    banner:z.string().nullable(),
    price:currency
       ,
})
