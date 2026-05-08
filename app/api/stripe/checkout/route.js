/**
 * Stripe checkout — scaffold.
 *
 * This route is intentionally a stub so the donation page can wire up a
 * "Pay with card" button later without a UI rewrite. Activate it by
 * installing `stripe`, adding STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_KEY
 * to env, and replacing the body below with a real Checkout Session.
 *
 * Suggested final shape:
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 *   const session = await stripe.checkout.sessions.create({
 *     mode: recurring ? "subscription" : "payment",
 *     line_items: [{ price_data: { currency, product_data: { name: designation }, unit_amount: amount * 100 }, quantity: 1 }],
 *     success_url: `${origin}/support?success=1`,
 *     cancel_url: `${origin}/support?canceled=1`,
 *   });
 *   return Response.json({ url: session.url });
 */

export async function POST() {
	return Response.json(
		{
			status: false,
			message:
				"Stripe checkout is not enabled yet. Please use PayPal or bank transfer for now.",
		},
		{ status: 501 },
	);
}

export async function GET() {
	return Response.json(
		{
			status: false,
			message:
				"Stripe checkout is not enabled yet. Please use PayPal or bank transfer for now.",
		},
		{ status: 501 },
	);
}
