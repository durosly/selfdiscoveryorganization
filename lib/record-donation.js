import connectMongo from "@/lib/connectDB";
import DonationModel from "@/models/donation";
import DonorModel from "@/models/donor";

/**
 * Upsert donor and donation records. Idempotent when keyed by provider ids.
 */
export async function recordDonation({
	provider,
	providerOrderId = null,
	providerSubscriptionId = null,
	providerCheckoutSessionId = null,
	providerCaptureId = null,
	amount,
	currency = "GBP",
	designation,
	recurring = false,
	donorName,
	donorEmail,
	message = null,
	status = "pending",
	rawProviderPayload = null,
}) {
	await connectMongo();

	const email = donorEmail.toLowerCase();
	const isCompleted = status === "completed";

	const donor = await DonorModel.findOneAndUpdate(
		{ email },
		{
			$setOnInsert: { email },
			$set: { name: donorName },
			$inc: isCompleted ? { totalGiven: amount, donationCount: 1 } : {},
			...(isCompleted ? { $currentDate: { lastDonationAt: true } } : {}),
		},
		{ upsert: true, new: true, setDefaultsOnInsert: true },
	);

	const filter = providerCheckoutSessionId
		? { providerCheckoutSessionId }
		: providerSubscriptionId
			? { providerSubscriptionId }
			: { providerOrderId };

	const donation = await DonationModel.findOneAndUpdate(
		filter,
		{
			$setOnInsert: {
				provider,
				providerOrderId,
				providerSubscriptionId,
				providerCheckoutSessionId,
			},
			$set: {
				donor: donor._id,
				donorEmail: email,
				donorName,
				amount,
				currency,
				designation,
				recurring,
				message,
				providerCaptureId,
				status,
				rawProviderPayload,
			},
		},
		{ upsert: true, new: true, setDefaultsOnInsert: true },
	);

	return { donor, donation };
}
