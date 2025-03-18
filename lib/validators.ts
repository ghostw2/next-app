import { z } from 'zod';
import { formatNumberWithDecimalPlaces } from './utils';
import { Decimal } from '@prisma/client/runtime/library';

const currency =  z.custom<Decimal>((value) => {
    // Check if the value is a Decimal instance
    if (value instanceof Decimal) {
      // Convert Decimal to number and validate
      const numberValue = value.toNumber();
      return /^\d+(\.\d{2})?$/.test(formatNumberWithDecimalPlaces(numberValue));
    }
    // If the value is not a Decimal, reject
    return false;
  }, "Price must be a valid number with 2 decimal places");
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

//schema for sign-in 
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password:z.string().min(6,"Password must be atleast 6 characters long")
})
export const signUpFormSchema = z.object({
  name:z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Passwrod must be atleast 6 characters long"),
  confirmPassword:z.string().min(6,"Password must be atleast 6 characters long")
}).refine((data) => data.confirmPassword === data.password, {
  message:"Password and Confirm Passwrod values should match",
  path:['confirmPassword']
})


//cart item 
export const cardItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency
})

export const insertCardSchema = z.object({
  items: z.array(cardItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCardId: z.string().min(1, "Session card id is required"),
  userId:z.string().optional().nullable()
})