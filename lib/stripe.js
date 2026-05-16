import Stripe from "stripe";

let stripeClient = null;

export function getStripe() {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("STRIPE_SECRET_KEY is not configured.");
	}
	if (!stripeClient) {
		stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
	}
	return stripeClient;
}

export function getAppOrigin() {
	const base = (process.env.NEXT_PUBLIC_URL || "").replace(/\/$/, "");
	if (!base) {
		throw new Error("NEXT_PUBLIC_URL is not configured.");
	}
	return base;
}

export function isStripeConfigured() {
	return Boolean(process.env.STRIPE_SECRET_KEY);
}
