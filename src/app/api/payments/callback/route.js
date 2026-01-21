import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    return handleCallback(request);
}

export async function GET(request) {
    return handleCallback(request);
}

async function handleCallback(request) {
    try {
        const { searchParams } = new URL(request.url);
        const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

        let body = {};
        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            body = await request.json();
        } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
            try {
                const formData = await request.formData();
                body = Object.fromEntries(formData.entries());
            } catch (e) {
                const text = await request.text();
                const params = new URLSearchParams(text);
                body = Object.fromEntries(params.entries());
            }
        }

        const xGlToken = body['x-gl-token'] || request.headers.get('x-gl-token') || searchParams.get('x-gl-token');

        if (!xGlToken) {
            console.error('[PayGlocal Callback] Missing x-gl-token');
            return NextResponse.redirect(`${origin}/services/payment/failure?reason=Missing+payment+token`);
        }

        const parts = xGlToken.split('.');
        if (parts.length < 2) {
            throw new Error("Invalid token format");
        }

        const base64urlToBase64 = (str) => {
            const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
            return b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
        };

        const payloadB64 = base64urlToBase64(parts[1]);
        const payloadJson = Buffer.from(payloadB64, 'base64').toString('utf8');
        const decoded = JSON.parse(payloadJson);

        console.log('\n========== decoded PayGlocal response ==========');
        console.log(decoded);
        console.log('==============================================\n');

        const gid = decoded.gid || decoded['x-gl-gid'];
        const status = decoded.status;

        // Find payment in database
        const payment = await prisma.payment.findUnique({
            where: { orderId: gid },
            include: { user: true }
        });

        if (payment) {
            const isSuccess = ['SENT_FOR_CAPTURE', 'SUCCESS', 'COMPLETED'].includes(status);

            await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: isSuccess ? 'SUCCESS' : 'FAILED',
                    metadata: {
                        ... (payment.metadata || {}),
                        callbackRaw: decoded
                    }
                }
            });

            if (isSuccess) {
                // Record the purchases
                const cart = payment.metadata?.cart || [];

                for (const item of cart) {
                    await prisma.purchase.create({
                        data: {
                            userId: payment.userId,
                            itemId: String(item.id),
                            itemName: item.name,
                            itemPrice: item.price,
                            type: item.type || 'SERVICE',
                            status: 'ACTIVE'
                        }
                    });
                }
            }
        }

        if (['SENT_FOR_CAPTURE', 'SUCCESS', 'COMPLETED'].includes(status)) {
            const queryParams = new URLSearchParams({
                txnId: decoded.merchantTxnId || 'N/A',
                amount: decoded.totalAmount || decoded.amount || decoded.Amount || 'N/A',
                status: status,
                gid: gid || 'N/A',
                paymentMethod: decoded.paymentMethod || 'CARD'
            });
            return NextResponse.redirect(`${origin}/services/payment/success?${queryParams.toString()}`);
        } else {
            const reason = decoded.failureReason || decoded.message || `Payment status: ${status}`;
            console.log('Redirecting to failure page with reason:', reason);
            return NextResponse.redirect(`${origin}/services/payment/failure?reason=${encodeURIComponent(reason)}&txnId=${decoded.merchantTxnId || 'N/A'}`);
        }
    } catch (err) {
        console.error('Callback error:', err.message);
        const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
        return NextResponse.redirect(`${origin}/services/payment/failure?reason=${encodeURIComponent(err.message)}`);
    }
}
