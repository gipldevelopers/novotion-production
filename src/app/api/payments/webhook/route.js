import { NextResponse } from "next/server";

// Basic webhook receiver for PayGlocal notifications (e.g., SI Auto Debit).
// Verify signature / payload as per the integration guide before trusting data.

export async function POST(request) {
  try {
    const payload = await request.json();

    // TODO: verify PayGlocal signature using their public certificate and
    // persist transaction status in your database.
    // The integration PDF describes webhook fields such as:
    // GID, SI ID, status, type, statusUrl, etc.

    // For now, just log and acknowledge.
    // eslint-disable-next-line no-console
    console.log("Received PayGlocal webhook", payload);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error handling PayGlocal webhook", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

