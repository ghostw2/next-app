'use client'
import React from 'react'
//import { ShippingAddress } from '@/types'
import { ShippingAddressSchema } from '@/lib/client-safe-validators'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { ShippingAddressDefaultValues } from '@/constants/index'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'
import { ShippingAddress } from '@/types'
import { UpdateUserShippingAddress } from '@/lib/actions/user.actions'
const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof ShippingAddressSchema>>({
        resolver: zodResolver(ShippingAddressSchema),
        defaultValues: address || ShippingAddressDefaultValues,

    });

    const [isPending, startTransition] = useTransition();
    const onSubmitHandler = (values: z.infer<typeof ShippingAddressSchema>) => {
        startTransition(async () => {
            const result = await UpdateUserShippingAddress(values)
            if (!result.success) {
                toast({
                    variant: 'destructive',
                    description: result.message
                })
                return
            } else {
                router.push('/payment-method')
            }

        })
    }
    return (
        <>
            <div className='space-y-4  mx-auto max-w-lg'>
                <h1 className='h2-bold mt-4'>Shippping Address</h1>
                <p className="text-sm text-muted-foreground">
                    Please enter your shipping address below. This will be used for shipping your order.
                </p>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmitHandler)} className="">
                        <div className="w-full grid grid-cols-2 gap-5 mx-1">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'fullName'> }) => (

                                    <FormItem >
                                        <FormLabel>Full Name </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Please enter your full name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your full name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'streetAddress'> }) => (
                                    <FormItem >
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Street Address" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Street Address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'city'> }) => (
                                    <FormItem >
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your City.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'postalCode'> }) => (
                                    <FormItem >
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Postal Code" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Postal Code.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'country'> }) => (
                                    <FormItem >
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Country" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Country.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lat"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'lat'> }) => (
                                    <FormItem >
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Latitude" {...field} type='number'
                                                onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Latitude.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lng"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'lng'> }) => (
                                    <FormItem >
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Longitude" {...field}
                                                type='number'
                                                onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Longitude.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, 'phoneNumber'> }) => (
                                    <FormItem >
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone Number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Phone Number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex justify-center items-center mt-4'>
                            <Button type="submit" disabled={isPending} >
                                {isPending ? (<Loader className='h-4 w=4 animate-spin' />) : (<ArrowRight className='h-4 w-4' />)}
                                Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default ShippingAddressForm
