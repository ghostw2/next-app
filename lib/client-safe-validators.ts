import { z } from 'zod';
;
export const ShippingAddressSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    lat: z.number().optional(),
    lng:z.number().optional(),
    phoneNumber: z.string().optional()  
  
  })