import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db/prisma'
import CredentialsProvider  from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
export const config = {
    pages: {
        signIn: '/sing-in',
        error: '/sing-in',
        
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider(
            {   name:"Credentials",
                credentials: {
                    email: { type: 'email' },
                    password: { type: 'password' }
           
                },
                async authorize(credentials) {
                    if (credentials === null) return null;
                    //find user in db 
                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email as string }
                    });
                    if (user && user.password) {
                        const isMatch = compareSync(credentials.password as string, user.password);
                        if (isMatch) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            };
                        }
                    }
                    return null;
                }
            }
        ),
    ],
    callbacks: {
        async session({ session, user, trigger, token }) {
            //set up the user id form the token 
            if (token?.sub) {
                session.user.id = token.sub;    
            }
            if (trigger == 'update') {
                session.user.name = user.name;
            }
            return session;

        }
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);