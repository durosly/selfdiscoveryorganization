import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";

export const DONATION_DESIGNATIONS = [
	"Families and Prisoners Initiative",
	"Self Discovery Conference",
	"Menstrual Hygiene Day",
	"Debate and Quiz Competition",
	"International Day of the Boy Child",
	"Send a Child to School Scheme",
	"General Fund",
];

const donationSchema = new mongoose.Schema(
	{
		donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", index: true },
		donorEmail: { type: String, required: true, lowercase: true, index: true },
		donorName: { type: String, default: null },

		amount: { type: Number, required: true },
		currency: { type: String, default: "GBP" },
		designation: {
			type: String,
			enum: DONATION_DESIGNATIONS,
			default: "General Fund",
		},
		recurring: { type: Boolean, default: false },
		message: { type: String, default: null },

		provider: { type: String, default: "paypal" },
		providerOrderId: { type: String, index: true, default: null },
		providerSubscriptionId: { type: String, index: true, default: null },
		providerCaptureId: { type: String, default: null },

		status: {
			type: String,
			enum: ["pending", "completed", "failed", "refunded"],
			default: "pending",
		},

		rawProviderPayload: { type: mongoose.Schema.Types.Mixed, default: null },
	},
	{ timestamps: true },
);

donationSchema.plugin(paginate);
donationSchema.index({ createdAt: -1 });
donationSchema.index({ providerOrderId: 1 }, { unique: true, sparse: true });
donationSchema.index({ providerSubscriptionId: 1 }, { unique: true, sparse: true });

const DonationModel =
	mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export const DonationConfirmSchema = z.object({
	provider: z.enum(["paypal"]).default("paypal"),
	mode: z.enum(["one-time", "subscription"]),
	orderId: z.string().min(3).optional(),
	subscriptionId: z.string().min(3).optional(),
	amount: z.coerce.number().positive(),
	currency: z.string().min(3).max(4).default("GBP"),
	designation: z.enum(DONATION_DESIGNATIONS),
	recurring: z.boolean().default(false),
	donorName: z.string().min(1).max(120),
	donorEmail: z.string().email(),
	message: z.string().max(500).optional(),
});

export default DonationModel;
