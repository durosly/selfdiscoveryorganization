import connectMongo from "@/lib/connectDB";
import GalleryModel, { GalleryValidationSchema } from "@/models/program-images";

async function createUpdateGallery(req) {
	try {
		const data = await req.json();
		const isValid = GalleryValidationSchema.safeParse(data);

		if (!isValid.success) {
			return Response.json(
				{ message: isValid.error.errors[0].message },
				{ status: 400 }
			);
		}

		const { id: program_id, image } = data;

		await connectMongo();
		const gallery = await GalleryModel.findOne({ program_id });
		if (gallery) {
			gallery.images.push(image);
			await gallery.save();
		} else {
			await GalleryModel.create({ program_id, images: [image] });
		}

		return Response.json({ message: "Program gallery updated successfully" });
	} catch (error) {
		const message = error.message || "Something went wrong";
		return Response.json({ message }, { status: 500 });
	}
}

export default createUpdateGallery;
