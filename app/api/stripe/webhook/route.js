import connectMongo from "@/lib/connectDB";
import { recordDonation } from "@/lib/record-donation";
import { getStripe } from "@/lib/stripe";
import DonationModel from "@/models/donation";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session) {
	const metadata = session.metadata || {};
	const recurring = metadata.recurring === "true";
	const amount =
		session.amount_total != null
			? session.amount_total / 100
			: parseFloat(metadata.amount || "0");
	const currency = (session.currency || "gbp").toUpperCase();

	await recordDonation({
		provider: "stripe",
		providerCheckoutSessionId: session.id,
		providerOrderId:
			typeof session.payment_intent === "string"
				? session.payment_intent
				: session.payment_intent?.id ?? null,
		providerSubscriptionId:
			typeof session.subscription === "string"
				? session.subscription
				: session.subscription?.id ?? null,
		amount,
		currency,
		designation: metadata.designation || "General Fund",
		recurring,
		donorName: metadata.donorName || "",
		donorEmail: metadata.donorEmail || session.customer_email || "",
		message: metadata.message || null,
		status: "completed",
		rawProviderPayload: session,
	});
}

async function handleCheckoutExpired(session) {
	await connectMongo();
	await DonationModel.findOneAndUpdate(
		{ providerCheckoutSessionId: session.id },
		{ $set: { status: "failed" } },
	);
}

export async function POST(request) {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		console.error("STRIPE_WEBHOOK_SECRET is not configured");
		return Response.json(
			{ error: "Webhook not configured" },
			{ status: 500 },
		);
	}

	const body = await request.text();
	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return Response.json({ error: "Missing signature" }, { status: 400 });
	}

	let event;
	try {
		const stripe = getStripe();
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			webhookSecret,
		);
	} catch (err) {
		console.error("Stripe webhook signature error", err.message);
		return Response.json({ error: "Invalid signature" }, { status: 400 });
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;
				if (session.payment_status === "paid" || session.mode === "subscription") {
					await handleCheckoutCompleted(session);
				}
				break;
			}
			case "checkout.session.expired": {
				await handleCheckoutExpired(event.data.object);
				break;
			}
			case "invoice.payment_failed": {
				const invoice = event.data.object;
				const subId =
					typeof invoice.subscription === "string"
						? invoice.subscription
						: invoice.subscription?.id;
				if (subId) {
					await connectMongo();
					await DonationModel.findOneAndUpdate(
						{ providerSubscriptionId: subId },
						{ $set: { status: "failed" } },
					);
				}
				break;
			}
			default:
				break;
		}
	} catch (error) {
		console.error("Stripe webhook handler error", error);
		return Response.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}

	return Response.json({ received: true });
}
