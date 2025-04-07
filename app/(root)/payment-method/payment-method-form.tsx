'use client'
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentMethodSchema } from '@/lib/client-safe-validators'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { UpdateUserPaymentMethod } from '@/lib/actions/user.actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PAYMENT_METHODS } from '@/constants'
import { Label } from '@/components/ui/label'
const PaymentMethodForm = ({ paymentMethod }: { paymentMethod: string | null }) => {
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: paymentMethod ? { type: paymentMethod } : { type: "" }
    })
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();
    const onSubmitHandler = async (data: z.infer<typeof paymentMethodSchema>) => {
        startTransition(async () => {
            const response = await UpdateUserPaymentMethod(data)
            if (!response.success) {
                toast({
                    variant: 'destructive',
                    description: response.message
                })
                return
            } else {
                router.push('/place-order')
            }
        })
    }
    return (

        <>
            <div className='space-x-4 mx-auto w-full text-center'>
                <h1 className='h2-bold mt-4'>Payment Method</h1>
                <p className="text-sm text-muted-foreground mb-4">
                    Please enter your Payment Method below. This will be used for shipping your order.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        <div className='w-1/2 mx-auto text-left'>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof paymentMethodSchema>, 'type'> }) => (
                                    <FormItem >
                                        <FormLabel>PaymentMethod </FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} >
                                                {PAYMENT_METHODS.map((item) =>
                                                (<FormItem key={item} className='flex items-center gap-2'>
                                                    <FormControl>
                                                        <RadioGroupItem id={item} value={item} checked={item === field.value} ></RadioGroupItem>
                                                    </FormControl>
                                                    <FormLabel>{item}</FormLabel>
                                                </FormItem>
                                                ))}
                                            </RadioGroup>
                                            {/* <Input placeholder="Please enter your Payment Method" {...field} /> */}
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                            <div className='flex justify-center items-center mt-4 w-100'>
                                <Button type="submit" disabled={isPending} >
                                    {isPending ? (<Loader className='h-4 w=4 animate-spin' />) : (<ArrowRight className='h-4 w-4' />)}
                                    Submit</Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </div >

        </>
    )
}

export default PaymentMethodForm
