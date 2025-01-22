import mongoose from "mongoose";
import { z } from "zod";
import paginate from "mongoose-paginate-v2";
import ProgramModel from "./program";

const articleSchema = new mongoose.Schema(
	{
		program_id: { type: mongoose.Schema.Types.ObjectId, ref: ProgramModel },
		body: { type: String },
	},
	{ timestamps: true }
);

articleSchema.plugin(paginate);

const ArticleModel = mongoose.models.Article || mongoose.model("Article", articleSchema);

const ArticleValidationSchema = z.object({
	program_id: z
		.string()
		.min(5)
		.refine((id) => mongoose.Types.ObjectId.isValid(id), {
			message: "Invalid ObjectId",
		}),
	body: z
		.string()
		.min(5)
		.transform((body) => {
			// Strip out any script tags
			const scriptTagRegex =
				/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
			return body.replace(scriptTagRegex, "");
		}),
});

export { ArticleValidationSchema };

export default ArticleModel;
