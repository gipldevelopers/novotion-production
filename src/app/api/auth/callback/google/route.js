import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getGoogleTokens, getGoogleUserInfo } from '@/lib/googleAuth';
import { signJwt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=no_code`);
    }

    try {
        const { id_token, access_token } = await getGoogleTokens(code);
        const googleUser = await getGoogleUserInfo(id_token, access_token);

        if (!googleUser.verified_email) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=email_not_verified`);
        }

        // 1. Check if user already exists by googleId
        let user = await prisma.user.findUnique({
            where: { googleId: googleUser.id },
        });

        // 2. If not, check if user exists by email
        if (!user) {
            user = await prisma.user.findUnique({
                where: { email: googleUser.email },
            });

            if (user) {
                // Link Google account to existing credentials account
                user = await prisma.user.update({
                    where: { email: googleUser.email },
                    data: {
                        googleId: googleUser.id,
                        provider: 'google',
                        image: user.image || googleUser.picture,
                    },
                });
            } else {
                // Create new user
                user = await prisma.user.create({
                    data: {
                        name: googleUser.name,
                        email: googleUser.email,
                        provider: 'google',
                        googleId: googleUser.id,
                        image: googleUser.picture,
                        // No password for Google users
                        password: "", // Or handle nullable in schema
                    },
                });
            }
        }

        if (user.status === 'SUSPENDED') {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=suspended`);
        }

        // Generate JWT
        const token = signJwt({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        // Determine redirect URL from state (callbackUrl)
        const state = searchParams.get('state') || '/';
        const redirectUrl = user.role === 'ADMIN' ? '/admin' : state;

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${redirectUrl}`);
    } catch (error) {
        console.error('Google Auth Error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=auth_failed`);
    }
}
