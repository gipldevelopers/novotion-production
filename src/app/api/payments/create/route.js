import { NextResponse } from "next/server";
import { createPayGlocalPaymentSession } from "@/lib/payglocal";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

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

    // Get current user
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    let userId = null;

    if (token) {
      const payload = verifyJwt(token);
      if (payload && payload.userId) {
        userId = payload.userId;
      }
    }

    // If no logged in user, we might want to error out or handle guest
    // For now, let's assume we need a user to track "my-services"
    if (!userId) {
      // Search for user by email, or create a temporary one?
      // Let's see if we can find user by email from checkout form
      const existingUser = await prisma.user.findUnique({
        where: { email: customer.email }
      });

      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create a guest user (or just return error asking to login)
        // The user said "store user info", let's create a user if they don't exist
        // Note: Password will be empty or random since it's a guest checkout
        const guestUser = await prisma.user.create({
          data: {
            email: customer.email,
            name: `${customer.firstName} ${customer.lastName}`,
            password: "GUEST_USER_" + Math.random().toString(36).slice(-8), // Dummy password
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            postalCode: customer.postalCode,
            country: customer.country,
          }
        });
        userId = guestUser.id;
      }
    } else {
      // Update existing user's billing info
      await prisma.user.update({
        where: { id: userId },
        data: {
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: customer.country,
        }
      });
    }

    const amount = cart.reduce(
      (total, item) => total + (item.price || 0),
      0
    );

    const currency = "USD";

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "";

    const returnUrl = `${origin}/api/payments/webhook`;
    const callbackUrl = `${origin}/api/payments/callback`;

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

    // Store payment attempt in database
    await prisma.payment.create({
      data: {
        orderId: session.gid, // Using GID as orderId
        amount: amount,
        currency: currency,
        status: "PENDING",
        userId: userId,
        metadata: {
          cart,
          customer,
          sessionRaw: session.raw
        }
      }
    });

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

    return NextResponse.json(
      {
        error: error.message || "Unable to process payment. Please try again.",
        code: error.code || "UNKNOWN_ERROR",
      },
      { status: 400 }
    );
  }
}

