import connectMongo from "@/lib/connectDB";
import {
	verifyPaypalOrder,
	verifyPaypalSubscription,
} from "@/lib/paypal";
import { recordDonation } from "@/lib/record-donation";
import { DonationConfirmSchema } from "@/models/donation";

export async function POST(request) {
	try {
		const body = await request.json();
		const safe = DonationConfirmSchema.safeParse(body);
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

		await connectMongo();

		let providerStatus = "pending";
		let captureId = null;
		let providerPayload = null;
		let verifiedAmount = null;
		let verifiedCurrency = null;

		if (data.mode === "one-time") {
			if (!data.orderId) {
				return Response.json(
					{
						status: false,
						message: "orderId is required for one-time donations",
					},
					{ status: 400 },
				);
			}
			providerPayload = await verifyPaypalOrder(data.orderId);
			const purchase = providerPayload?.purchase_units?.[0];
			const capture = purchase?.payments?.captures?.[0];
			captureId = capture?.id ?? null;
			verifiedAmount = parseFloat(
				capture?.amount?.value ?? purchase?.amount?.value ?? "0",
			);
			verifiedCurrency =
				capture?.amount?.currency_code ??
				purchase?.amount?.currency_code ??
				data.currency;

			if (
				providerPayload?.status === "COMPLETED" ||
				capture?.status === "COMPLETED"
			) {
				providerStatus = "completed";
			} else if (capture?.status === "DECLINED") {
				providerStatus = "failed";
			}
		} else {
			if (!data.subscriptionId) {
				return Response.json(
					{
						status: false,
						message:
							"subscriptionId is required for subscription donations",
					},
					{ status: 400 },
				);
			}
			providerPayload = await verifyPaypalSubscription(
				data.subscriptionId,
			);
			const billing = providerPayload?.billing_info?.last_payment;
			verifiedAmount = parseFloat(
				billing?.amount?.value ?? data.amount.toString(),
			);
			verifiedCurrency =
				billing?.amount?.currency_code ?? data.currency;
			if (
				providerPayload?.status === "ACTIVE" ||
				providerPayload?.status === "APPROVED"
			) {
				providerStatus = "completed";
			} else if (providerPayload?.status === "CANCELLED") {
				providerStatus = "failed";
			}
		}

		const finalAmount = verifiedAmount || data.amount;
		const finalCurrency = verifiedCurrency || data.currency;

		const { donation } = await recordDonation({
			provider: "paypal",
			providerOrderId:
				data.mode === "one-time" ? data.orderId : null,
			providerSubscriptionId:
				data.mode === "subscription" ? data.subscriptionId : null,
			providerCaptureId: captureId,
			amount: finalAmount,
			currency: finalCurrency,
			designation: data.designation,
			recurring: data.mode === "subscription",
			donorName: data.donorName,
			donorEmail: data.donorEmail,
			message: data.message ?? null,
			status: providerStatus,
			rawProviderPayload: providerPayload,
		});

		return Response.json({
			status: true,
			message:
				providerStatus === "completed"
					? "Thank you! Your donation has been received."
					: "Donation recorded — awaiting confirmation.",
			data: {
				id: donation._id,
				status: donation.status,
				amount: donation.amount,
				currency: donation.currency,
				designation: donation.designation,
				recurring: donation.recurring,
			},
		});
	} catch (error) {
		console.error("/api/donations/confirm error", error);
		return Response.json(
			{
				status: false,
				message:
					error?.message || "Unable to confirm donation right now.",
			},
			{ status: 500 },
		);
	}
}
