import mongoose from "mongoose";
import { z } from "zod";
import paginate from "mongoose-paginate-v2";
import ProgramModel from "./program";

const gallerySchema = new mongoose.Schema(
	{
		program_id: { type: mongoose.Schema.Types.ObjectId, ref: ProgramModel },
		images: [{ type: String }],
	},
	{ timestamps: true }
);

gallerySchema.plugin(paginate);

const GalleryModel = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

const GalleryValidationSchema = z.object({
	id: z
		.string({ message: "Program ID must be a string" })
		.min(5, { message: "Program ID must be at least 5 characters" })
		.refine((id) => mongoose.Types.ObjectId.isValid(id), {
			message: "Invalid ObjectId",
		}),
	image: z
		.string({ message: "Image public ID must be a string" })
		.min(1, { message: "Image public ID must be at least 1 character" }),
});

export { GalleryValidationSchema };

export default GalleryModel;
