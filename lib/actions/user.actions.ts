'user server';

import { signInFormSchema } from '@/lib/validators';
import { signIn, signOut } from "@/auth";
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export const signInWithCredentials = async (prevstate: unknown, formdata: FormData) => {
    try {
        const data = await signInFormSchema.parse(
            {
                email: formdata.get('email'),
                password: formdata.get('password')
            }
        );
        await signIn("Credentials",data);
        return { success: true, message: "Signed in successfully" };
        
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Could not sign in , wrong email or password" };
    }
}
//sign user out 
export  async  function signOutUser() {
    await signOut();
} 