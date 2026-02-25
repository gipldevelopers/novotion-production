import { NextResponse } from 'next/server';
import { getGoogleAuthUrl } from '@/lib/googleAuth';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const callbackUrl = searchParams.get('callbackUrl') || '/';
        const url = getGoogleAuthUrl(callbackUrl);
        return NextResponse.json({ url });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate Google URL' }, { status: 500 });
    }
}
