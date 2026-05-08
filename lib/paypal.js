/**
 * PayPal helpers — small wrapper around the PayPal REST API used by the
 * `/api/donations/confirm` route to verify orders and subscriptions.
 *
 * For the client-side <PayPalButtons /> we only need the script options
 * exported from `getPaypalScriptOptions`.
 */

const SANDBOX_BASE = "https://api-m.sandbox.paypal.com";
const LIVE_BASE = "https://api-m.paypal.com";

function getBaseUrl() {
	const env = (process.env.PAYPAL_ENV || "sandbox").toLowerCase();
	return env === "live" ? LIVE_BASE : SANDBOX_BASE;
}

let cachedToken = { value: null, expiresAt: 0 };

async function getAccessToken() {
	const now = Date.now();
	if (cachedToken.value && cachedToken.expiresAt > now + 30_000) {
		return cachedToken.value;
	}

	const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const secret = process.env.PAYPAL_CLIENT_SECRET;
	if (!clientId || !secret) {
		throw new Error(
			"PayPal credentials missing: set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in env.",
		);
	}

	const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
	const res = await fetch(`${getBaseUrl()}/v1/oauth2/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	});

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`PayPal token fetch failed: ${res.status} ${text}`);
	}

	const data = await res.json();
	cachedToken = {
		value: data.access_token,
		expiresAt: now + (data.expires_in ?? 0) * 1000,
	};
	return cachedToken.value;
}

export async function verifyPaypalOrder(orderId) {
	if (!orderId) throw new Error("orderId is required");
	const token = await getAccessToken();
	const res = await fetch(
		`${getBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}`,
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`PayPal order verification failed: ${res.status} ${text}`);
	}
	return res.json();
}

export async function verifyPaypalSubscription(subscriptionId) {
	if (!subscriptionId) throw new Error("subscriptionId is required");
	const token = await getAccessToken();
	const res = await fetch(
		`${getBaseUrl()}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`,
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(
			`PayPal subscription verification failed: ${res.status} ${text}`,
		);
	}
	return res.json();
}

export function getPaypalScriptOptions({ vault = false } = {}) {
	const clientId =
		process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"; // 'test' renders sandbox sandbox stub
	const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "GBP";
	const options = {
		clientId,
		currency,
		intent: vault ? "subscription" : "capture",
		components: "buttons",
	};
	if (vault) {
		options.vault = true;
		options.intent = "subscription";
	}
	return options;
}

/**
 * Look up the configured plan id for a given preset amount, e.g.
 *   NEXT_PUBLIC_PAYPAL_PLAN_10="P-ABC..."
 */
export function getPlanIdForAmount(amount) {
	if (!amount) return null;
	const key = `NEXT_PUBLIC_PAYPAL_PLAN_${Math.round(amount)}`;
	return process.env[key] || null;
}
