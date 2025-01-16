import mongoose from "mongoose";
import { z } from "zod";

const timelineSchema = new mongoose.Schema({
	title: String,
	sub_title: String,
	summary: String,
	date: Date,
	created_at: { type: Date, default: Date.now },
	program_id: String,
});

const TimelineModel =
	mongoose.models.Timeline || mongoose.model("Timeline", timelineSchema);

const TimelineValidationSchema = z.object({
	title: z.string().min(3),
	sub_title: z.string().min(5),
	summary: z.string().min(2),
	date: z.string().min(2),
});

export { TimelineValidationSchema };

export default TimelineModel;
