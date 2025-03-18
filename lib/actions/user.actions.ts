"use server";

import { signInFormSchema, signUpFormSchema } from '@/lib/validators';
import { signIn, signOut } from "@/auth";
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
import { PrismaClient } from '@prisma/client';
import { formatError } from '../utils';

export const signInWithCredentials = async (prevstate: unknown, formdata: FormData) => {
    try {
        const data = signInFormSchema.parse(
            {
                email: formdata.get('email'),
                password: formdata.get('password')
            }
        );
        await signIn("credentials",  data);
        return { success: true, message: "Signed in successfully" };
        
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Could not sign in , wrong email or password" };
    }
}
export const signUpUser = async(prevstate:unknown,formData:FormData)=>{
    try {
        console.log(formData)
        const plainPassword = formData.get('password')
        const user = signUpFormSchema.parse({
            name :formData.get('name'),
            email: formData.get('email'),
            password: plainPassword,
            confirmPassword: formData.get('confirmPassword')
            }
        );
        
        user.password = hashSync(plainPassword as string, 10)
        const prisma = new PrismaClient();
         await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
        await signIn('credentials', {
            email: user.email,
            password:plainPassword
        })
        return { success:true,message:"Successfully created new user"}
    
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        console.log(error)
        return {success:false,message:formatError(error)}
    }
}
//sign user out 
export async function signOutUser() {
    console.log('sign-out')
    await signOut();
} 