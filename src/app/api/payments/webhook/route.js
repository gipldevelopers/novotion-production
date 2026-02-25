import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPaymentReceiptEmail, sendAdminPaymentNotification } from "@/lib/mail";

export async function POST(request) {
  try {
    let payload;
    const contentType = request.headers.get("content-type") || "";
    const acceptHeader = request.headers.get("accept") || "";
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      try {
        const formData = await request.formData();
        payload = Object.fromEntries(formData.entries());
      } catch (e) {
        const text = await request.text();
        const params = new URLSearchParams(text);
        payload = Object.fromEntries(params.entries());
      }
    }

    const xGlToken = payload['x-gl-token'];
    let decoded = null;

    if (xGlToken) {
      const parts = xGlToken.split('.');
      if (parts.length >= 2) {
        const base64urlToBase64 = (str) => {
          const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
          return b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
        };
        const payloadJson = Buffer.from(base64urlToBase64(parts[1]), 'base64').toString('utf8');
        decoded = JSON.parse(payloadJson);
        console.log("[PayGlocal Webhook] Decoded Token Status:", decoded.status);
      }
    }

    if (decoded) {
      const gid = decoded.gid || decoded['x-gl-gid'];
      const status = decoded.status;

      // Find payment in database
      const payment = await prisma.payment.findUnique({
        where: { orderId: gid },
        include: { user: true }
      });

      if (payment && payment.status === 'PENDING') {
        const isSuccess = ['SENT_FOR_CAPTURE', 'SUCCESS', 'COMPLETED'].includes(status);

        const updatedPayment = await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: isSuccess ? 'SUCCESS' : 'FAILED',
            metadata: {
              ... (payment.metadata || {}),
              webhookRaw: decoded
            }
          }
        });

        if (isSuccess) {
          // Record the purchases if not already done
          const existingPurchasesCount = await prisma.purchase.count({
            where: { paymentId: payment.id }
          });

          if (existingPurchasesCount === 0) {
            const cart = payment.metadata?.cart || [];
            const items = [];
            for (const item of cart) {
              await prisma.purchase.create({
                data: {
                  userId: payment.userId,
                  itemId: String(item.id),
                  itemName: item.name,
                  itemPrice: item.price,
                  type: item.type || 'SERVICE',
                  status: 'ACTIVE',
                  paymentId: payment.id
                }
              });
              items.push({ name: item.name, price: item.price });
            }

            // Trigger Emails
            try {
              await sendPaymentReceiptEmail(payment.user, updatedPayment, items);
              await sendAdminPaymentNotification(updatedPayment, payment.user, items);
            } catch (emailError) {
              console.error('Error triggering emails in webhook:', emailError);
            }
          }
        }
      }
    }

    // Redirect or respond
    if (acceptHeader.includes("text/html") && decoded) {
      const isSuccess = decoded.status === 'SENT_FOR_CAPTURE' || decoded.status === 'SUCCESS' || decoded.status === 'COMPLETED';
      if (isSuccess) {
        const queryParams = new URLSearchParams({
          txnId: decoded.merchantTxnId || 'N/A',
          amount: decoded.totalAmount || decoded.amount || decoded.Amount || 'N/A',
          status: decoded.status,
          gid: decoded.gid || 'N/A'
        });
        return NextResponse.redirect(`${origin}/services/payment/success?${queryParams.toString()}`);
      } else {
        const reason = decoded.failureReason || decoded.message || `Payment status: ${decoded.status}`;
        return NextResponse.redirect(`${origin}/services/payment/failure?reason=${encodeURIComponent(reason)}&txnId=${decoded.merchantTxnId || 'N/A'}`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling PayGlocal webhook", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

