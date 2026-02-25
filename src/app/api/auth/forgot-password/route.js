import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Success message to avoid account enumeration
            return NextResponse.json({ message: 'Reset link sent if account exists' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Send actual email
        try {
            await sendPasswordResetEmail(email, resetToken);
        } catch (mailError) {
            console.error('Failed to send reset email:', mailError);
            // We don't return error to user here because token is already saved, 
            // but in production you might want to handle this better.
        }

        return NextResponse.json({ message: 'Reset link sent if account exists' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
