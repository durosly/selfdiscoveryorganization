import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function GET(request) {
	try {
		if (!isStripeConfigured()) {
			return Response.json(
				{ status: false, message: "Stripe is not configured." },
				{ status: 503 },
			);
		}

		const { searchParams } = new URL(request.url);
		const sessionId = searchParams.get("session_id");

		if (!sessionId?.startsWith("cs_")) {
			return Response.json(
				{ status: false, message: "Invalid session." },
				{ status: 400 },
			);
		}

		const stripe = getStripe();
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		const isPaid =
			session.payment_status === "paid" ||
			(session.mode === "subscription" && session.status === "complete");

		if (!isPaid) {
			return Response.json(
				{ status: false, message: "Payment not completed." },
				{ status: 404 },
			);
		}

		const metadata = session.metadata || {};
		const amount =
			session.amount_total != null
				? session.amount_total / 100
				: parseFloat(metadata.amount || "0");

		return Response.json({
			status: true,
			data: {
				amount,
				currency: (session.currency || "gbp").toUpperCase(),
				designation: metadata.designation || "General Fund",
				donorName: metadata.donorName || "",
				recurring: metadata.recurring === "true",
				paymentStatus: session.payment_status,
			},
		});
	} catch (error) {
		console.error("/api/stripe/session error", error);
		return Response.json(
			{
				status: false,
				message: error?.message || "Unable to load session.",
			},
			{ status: 500 },
		);
	}
}
