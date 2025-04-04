import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db/prisma'
import CredentialsProvider  from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
        
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    secret:process.env.AUTH_TOKEN_SECRET,
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
                session.user.role = token.role as string;
                session.user.name = token.name as string;
            }
            if (trigger == 'update') {
                session.user.name = user.name;
            }
            return session;

        },
        async jwt({ token, user, trigger, session }:any) {
            if (user) {
                token.role = user.role
                if (user.name === "NO_NAME") {
                    token.name = user.email.split('@')[0]
                }
                await prisma.user.update({
                    where: { id: user.id },
                    data:{ name: token.name},
                    }
                )
            }
            return token
        },
        authorized({ request, auth }: any) {
            if (!request.cookies.get('sessionCardId')) {
                const sessionCardId = crypto.randomUUID();
                const newRequestHeaders = new Headers(request.headers);
                const response = NextResponse.next({
                    request: {
                        headers: newRequestHeaders
                    }
                })
                response.cookies.set('sessionCardId',sessionCardId)
                return response;
            } else {
                return true;
            }
        }
    }
} satisfies NextAuthConfig;

export const { handlers,   auth, signIn, signOut } = NextAuth(config);