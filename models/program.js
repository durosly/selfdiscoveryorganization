import mongoose from "mongoose";
import slugify from "slugify";
import { z } from "zod";
import paginate from "mongoose-paginate-v2";

const programSchema = new mongoose.Schema({
	cover_image: { type: String, default: "default.png" },
	title: String,
	desc: String,
	created_at: { type: Date, default: Date.now },
	location: String,
	start_date: Date,
	end_date: Date,
	start_time: String,
	end_time: String,
	slug: { type: String, unique: true },
	status: {
		type: String,
		enum: ["publish", "unpublished"],
		default: "unpublished",
	},
});

programSchema.plugin(paginate);
programSchema.index({ title: "text", desc: "text", location: "text" });
programSchema.index({ desc: "text" });
programSchema.index({ location: "text" });

programSchema.pre("save", async function (next) {
	const program = this;
	// only hash the password if it has been modified (or is new)

	if (!program.isModified("title")) return next();
	let slug = slugify(program.title, { lower: true });
	// generate a salt
	let slugExists = true;
	let counter = 1;
	while (slugExists) {
		// @ts-ignore
		const existingArticle = await this.constructor.findOne({ slug });
		if (!existingArticle || existingArticle._id.equals(this._id)) {
			// If no other article found with the same slug or the found article is the current one being saved
			slugExists = false;
		} else {
			// Generate a new slug with a unique identifier
			counter++;
			slug = `${slugify(program.title, { lower: true })}-${counter}`;
		}
	}

	this.slug = slug;
});

const ProgramModel =
	mongoose.models.Program || mongoose.model("Program", programSchema);

const ProgramValidationSchema = z.object({
	title: z.string().min(3),
	desc: z.string().min(5),
	location: z.string().min(2),
	start_date: z.string().min(2),
	end_date: z.string().optional(),
	start_time: z.string().min(2),
	end_time: z.string().optional(),
});

export { ProgramValidationSchema };

export default ProgramModel;
