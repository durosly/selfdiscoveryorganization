import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true, index: true },
		name: { type: String, default: null },
		totalGiven: { type: Number, default: 0 },
		donationCount: { type: Number, default: 0 },
		lastDonationAt: { type: Date, default: null },
		marketingOptIn: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const DonorModel =
	mongoose.models.Donor || mongoose.model("Donor", donorSchema);

export default DonorModel;
