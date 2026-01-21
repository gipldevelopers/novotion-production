import { generateJWEAndJWS } from "payglocal-js-client";
import fs from "fs";
import path from "path";

const PAYGLOCAL_MERCHANT_ID =
  process.env.PAYGLOCAL_MERCHANT_ID || "uat_novot_652";
const PAYGLOCAL_PRIVATE_KEY_ID =
  process.env.PAYGLOCAL_PRIVATE_KEY_ID || "CCC8JomSXhTg6zk4";
const PAYGLOCAL_PUBLIC_KEY_ID =
  process.env.PAYGLOCAL_PUBLIC_KEY_ID || "lqMiv7pLm7ULDNMD";
const PAYGLOCAL_ENV = process.env.PAYGLOCAL_ENV || "uat";

// Set to true to test payment flow without real PayGlocal API
const MOCK_MODE = false;

const PAYGLOCAL_GPI_URL =
  PAYGLOCAL_ENV === "prod"
    ? "https://api.prod.payglocal.in/gl/v1/payments/initiate/paycollect"
    : "https://api.uat.payglocal.in/gl/v1/payments/initiate/paycollect";

// Key file paths - place your .pem files in src/key/
const KEYS_DIR = path.join(process.cwd(), "src", "key");
const PRIVATE_KEY_PATH = path.join(
  KEYS_DIR,
  process.env.PRIVATE_KEY_PATH || "kId-CCC8JomSXhTg6zk4_uat_novot_652.pem"
);
const PUBLIC_KEY_PATH = path.join(
  KEYS_DIR,
  process.env.PUBLIC_KEY_PATH || "kId-lqMiv7pLm7ULDNMD_payglocal_mid.pem"
);

// User-friendly error messages for PayGlocal error codes
const ERROR_MESSAGES = {
  "GL-400-001":
    "Payment gateway is temporarily unavailable. Our team has been notified. Please try again in a few minutes.",
  "GL-400-002":
    "Invalid payment details. Please check your information and try again.",
  "GL-400-003":
    "Transaction ID is missing. Please refresh the page and try again.",
  "GL-400-004":
    "This payment method is not available. Please try a different card or payment option.",
  "GL-400-006": "Amount mismatch detected. Please refresh and try again.",
  "GL-400-007": "Invalid card type. Please use a different card.",
  "GL-400-999": "Transaction not found. Please start a new payment.",
  "GL-201-000": "Payment was declined. Please try a different payment method.",
  "GL-201-006": "Invalid CVV. Please check your card details.",
  "GL-201-007": "Your card has expired. Please use a different card.",
  "GL-201-008": "Insufficient funds. Please use a different payment method.",
  "GL-201-009": "This card cannot be used. Please try a different card.",
  "GL-201-014":
    "Payment was declined by your bank. Please contact your bank or try a different card.",
  "GL-201-019": "Authentication failed. Please try again.",
  "GL-201-022":
    "Payment blocked for security reasons. Please try a different payment method.",
  "GL-501-000": "Payment service is temporarily down. Please try again later.",
  "GL-501-001": "Payment service is temporarily down. Please try again later.",
};

function getKeys() {
  try {
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
    const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, "utf8");

    return { privateKey, publicKey };
  } catch (err) {
    console.error("[PayGlocal] ❌ Failed to load keys:", err.message);
    throw new Error(
      "Payment system is not configured. Please contact support."
    );
  }
}

// Parse PayGlocal response and return user-friendly error
function parsePayGlocalError(responseText, httpStatus) {
  try {
    const data = JSON.parse(responseText);
    const reasonCode = data.reasonCode || "";
    const gid = data.gid || null;

    // Get user-friendly message
    const userMessage =
      ERROR_MESSAGES[reasonCode] ||
      "Payment could not be processed. Please try again or use a different payment method.";

    console.error("[PayGlocal] ❌ Error Details:");
    console.error("  - GID:", gid);
    console.error("  - Code:", reasonCode);
    console.error("  - Message:", data.message);
    console.error("  - Details:", data.errors?.detailedMessage);

    return {
      message: userMessage,
      code: reasonCode,
      gid: gid,
      technical: data.message,
    };
  } catch {
    return {
      message:
        "Unable to connect to payment gateway. Please check your internet connection and try again.",
      code: "PARSE_ERROR",
      gid: null,
      technical: responseText,
    };
  }
}

export async function createPayGlocalPaymentSession({
  amount,
  currency = "USD",
  customer,
  items,
  returnUrl,
  callbackUrl,
}) {
  const merchantTxnId =
    "NOV-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
  const merchantUniqueId = "NOVOTION-" + Date.now();

  // MOCK MODE - for testing without PayGlocal
  if (MOCK_MODE) {
    console.log("[PayGlocal] 🎭 MOCK MODE - Simulating successful payment");
    console.log("[PayGlocal] Amount:", amount, currency);
    return {
      gid: "mock_" + merchantTxnId,
      status: "CREATED",
      message: "Mock payment session created",
      reasonCode: "GL-201-001",
      redirectUrl:
        returnUrl + "?mock=true&gid=mock_" + merchantTxnId + "&status=SUCCESS",
      statusUrl: callbackUrl,
      raw: { mock: true, merchantTxnId },
    };
  }

  // PayGlocal PayCollect flow payload
  const payload = {
    merchantTxnId,
    merchantUniqueId,
    paymentData: {
      totalAmount: amount.toFixed(2),
      txnCurrency: currency,
      billingData: {
        firstName: customer?.firstName || customer?.name?.split(" ")[0] || "Customer",
        lastName: customer?.lastName || customer?.name?.split(" ").slice(1).join(" ") || "",
        addressStreet1: customer?.address || "NA",
        addressCity: customer?.city || "NA",
        addressState: customer?.state || "NA",
        addressPostalCode: customer?.postalCode || "400001",
        addressCountry: customer?.country || "IN",
        emailId: customer?.email || "customer@example.com",
        phoneNo: customer?.phone || "9999999999",
      },
    },
    merchantCallbackURL: callbackUrl,
    returnUrl: returnUrl,
  };

  console.log("[PayGlocal] Payload:", JSON.stringify(payload, null, 2));

  const { privateKey, publicKey } = getKeys();
  // Use official PayGlocal client to generate JWE and JWS tokens
  const { jweToken, jwsToken } = await generateJWEAndJWS({
    payload,
    publicKey,
    privateKey,
    merchantId: PAYGLOCAL_MERCHANT_ID,
    privateKeyId: PAYGLOCAL_PRIVATE_KEY_ID,
    publicKeyId: PAYGLOCAL_PUBLIC_KEY_ID,
  });

  console.log("[PayGlocal] 🔑 JWE Token (first 50):", jweToken);

  console.log("[PayGlocal] 🔐 JWS Token (first 50):", jwsToken);
  console.log("[PayGlocal] 🔗 URL:", PAYGLOCAL_GPI_URL);
  console.log("[PayGlocal] 🏪 Merchant:", PAYGLOCAL_MERCHANT_ID);

  // Make API request with JWE in body and JWS in header
  const res = await fetch(PAYGLOCAL_GPI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/jose",
      "x-gl-token-external": jwsToken,
    },
    body: jweToken,
  });

  const responseText = await res.text();
  console.log("[PayGlocal] 📡 Status:", res.status);
  console.log("[PayGlocal] 📄 Response:", responseText);

  if (!res.ok) {
    const error = parsePayGlocalError(responseText, res.status);
    const err = new Error(error.message);
    err.code = error.code;
    err.gid = error.gid;
    err.technical = error.technical;
    throw err;
  }

  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error("Invalid response from payment gateway. Please try again.");
  }

  // PayGlocal responses often wrap the main data in a 'data' property
  const responseData = data.data || data;

  if (!responseData.redirectUrl && !responseData.redirectURL) {
    throw new Error(
      "Payment session created but redirect URL is missing. Please try again."
    );
  }

  return {
    gid: data.gid || responseData.gid || data.GID,
    status: data.status || responseData.status || data.Status,
    message: data.message || responseData.message || data.Message,
    reasonCode: data.reasonCode || responseData.reasonCode,
    redirectUrl: responseData.redirectUrl || responseData.redirectURL,
    statusUrl: responseData.statusUrl || responseData.statusURL,
    raw: data,
  };
}

export async function getPaymentStatus(gid) {
  const statusUrl =
    PAYGLOCAL_ENV === "prod"
      ? "https://api.prod.payglocal.in/gl/v1/payments/status/" + gid
      : "https://api.uat.payglocal.in/gl/v1/payments/status/" + gid;

  const { privateKey, publicKey } = getKeys();
  const { jweToken, jwsToken } = await generateJWEAndJWS({
    payload: { gid },
    publicKey,
    privateKey,
    merchantId: PAYGLOCAL_MERCHANT_ID,
    privateKeyId: PAYGLOCAL_PRIVATE_KEY_ID,
    publicKeyId: PAYGLOCAL_PUBLIC_KEY_ID,
  });

  const res = await fetch(statusUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/jose",
      "x-gl-token-external": jwsToken,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Status check failed: " + res.status + " - " + text);
  }

  return res.json();
}

export async function createRefund({ gid, amount, currency = "USD", reason }) {
  const refundUrl =
    PAYGLOCAL_ENV === "prod"
      ? "https://api.prod.payglocal.in/gl/v1/payments/refund"
      : "https://api.uat.payglocal.in/gl/v1/payments/refund";

  const payload = {
    gid,
    merchantRefundId: "REF-" + Date.now(),
    refundAmount: amount.toFixed(2),
    refundCurrency: currency,
    reason: reason || "Customer requested",
  };

  const { privateKey, publicKey } = getKeys();
  const { jweToken, jwsToken } = await generateJWEAndJWS({
    payload,
    publicKey,
    privateKey,
    merchantId: PAYGLOCAL_MERCHANT_ID,
    privateKeyId: PAYGLOCAL_PRIVATE_KEY_ID,
    publicKeyId: PAYGLOCAL_PUBLIC_KEY_ID,
  });

  const res = await fetch(refundUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/jose",
      "x-gl-token-external": jwsToken,
    },
    body: jweToken,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Refund failed: " + res.status + " - " + text);
  }

  return res.json();
}
