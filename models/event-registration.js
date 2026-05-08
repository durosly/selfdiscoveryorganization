import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";

const eventRegistrationSchema = new mongoose.Schema(
	{
		program: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Program",
			required: true,
			index: true,
		},
		name: { type: String, required: true },
		email: { type: String, required: true, lowercase: true, index: true },
		phone: { type: String, default: null },
		notes: { type: String, default: null },
		status: {
			type: String,
			enum: ["confirmed", "waitlisted", "cancelled"],
			default: "confirmed",
		},
	},
	{ timestamps: true },
);

eventRegistrationSchema.plugin(paginate);
eventRegistrationSchema.index({ program: 1, email: 1 }, { unique: true });

const EventRegistrationModel =
	mongoose.models.EventRegistration ||
	mongoose.model("EventRegistration", eventRegistrationSchema);

export const EventRegistrationSchema = z.object({
	name: z.string().min(2).max(120),
	email: z.string().email(),
	phone: z.string().min(5).max(40).optional().nullable(),
	notes: z.string().max(1000).optional().nullable(),
});

export default EventRegistrationModel;
