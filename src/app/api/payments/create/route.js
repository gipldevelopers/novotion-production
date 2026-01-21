import { NextResponse } from "next/server";
import { createPayGlocalPaymentSession } from "@/lib/payglocal";

export async function POST(request) {
  try {
    const body = await request.json();
    const { cart, customer } = body || {};

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const amount = cart.reduce(
      (total, item) => total + (item.price || 0),
      0
    );

    const currency = "USD"; // adjust if needed or take from cart/customer

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "";

    const returnUrl = `${origin}/services/payment/success`;
    const callbackUrl = `${origin}/api/payments/webhook`;

    const session = await createPayGlocalPaymentSession({
      amount,
      currency,
      customer,
      items: cart,
      returnUrl,
      callbackUrl,
    });

    if (!session.redirectUrl) {
      return NextResponse.json(
        {
          error:
            "No redirectUrl received from PayGlocal. Check your integration config.",
          details: session.raw,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        redirectUrl: session.redirectUrl,
        statusUrl: session.statusUrl,
        gid: session.gid,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Payment API] Error:", error.message);
    if (error.code) console.error("[Payment API] Code:", error.code);
    if (error.gid) console.error("[Payment API] GID:", error.gid);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: error.message || "Unable to process payment. Please try again.",
        code: error.code || "UNKNOWN_ERROR",
      },
      { status: 400 }
    );
  }
}

