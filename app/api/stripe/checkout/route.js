import connectMongo from "@/lib/connectDB";
import { recordDonation } from "@/lib/record-donation";
import { getAppOrigin, getStripe, isStripeConfigured } from "@/lib/stripe";
import { StripeCheckoutSchema } from "@/models/donation";

const CURRENCY = "gbp";

function buildLineItem(amount, designation, recurring) {
	const productName = `Donation — ${designation}`;
	const unitAmount = Math.round(amount * 100);

	if (recurring) {
		return {
			price_data: {
				currency: CURRENCY,
				product_data: { name: productName },
				unit_amount: unitAmount,
				recurring: { interval: "month" },
			},
			quantity: 1,
		};
	}

	return {
		price_data: {
			currency: CURRENCY,
			product_data: { name: productName },
			unit_amount: unitAmount,
		},
		quantity: 1,
	};
}

export async function POST(request) {
	try {
		if (!isStripeConfigured()) {
			return Response.json(
				{
					status: false,
					message: "Card payments are not configured yet.",
				},
				{ status: 503 },
			);
		}

		const body = await request.json();
		const safe = StripeCheckoutSchema.safeParse(body);
		if (!safe.success) {
			const issue = safe.error.issues[0];
			return Response.json(
				{
					status: false,
					message: `${issue.message} for ${issue.path.join(".")}`,
				},
				{ status: 400 },
			);
		}

		const data = safe.data;
		const stripe = getStripe();
		const origin = getAppOrigin();

		const session = await stripe.checkout.sessions.create({
			mode: data.recurring ? "subscription" : "payment",
			line_items: [
				buildLineItem(data.amount, data.designation, data.recurring),
			],
			customer_email: data.donorEmail,
			metadata: {
				designation: data.designation,
				donorName: data.donorName,
				donorEmail: data.donorEmail,
				message: data.message || "",
				recurring: data.recurring ? "true" : "false",
				amount: String(data.amount),
			},
			success_url: `${origin}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/support?canceled=1`,
		});

		await connectMongo();
		await recordDonation({
			provider: "stripe",
			providerCheckoutSessionId: session.id,
			amount: data.amount,
			currency: "GBP",
			designation: data.designation,
			recurring: data.recurring,
			donorName: data.donorName,
			donorEmail: data.donorEmail,
			message: data.message ?? null,
			status: "pending",
		});

		return Response.json({ status: true, url: session.url });
	} catch (error) {
		console.error("/api/stripe/checkout error", error);
		return Response.json(
			{
				status: false,
				message:
					error?.message || "Unable to start checkout right now.",
			},
			{ status: 500 },
		);
	}
}
