import cloudinary from "@/lib/cloudinary";
import GalleryModel, { GalleryValidationSchema } from "@/models/program-images";

async function deleteGalleryImage(req) {
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

		const gallery = await GalleryModel.findOne({ program_id });
		if (gallery) {
			const imageIndex = gallery.images.indexOf(image);
			if (imageIndex > -1) {
				const img = gallery.images.splice(imageIndex, 1);
				cloudinary.uploader.destroy(img);
				await gallery.save();
			} else {
				return Response.json(
					{ message: "Image not found in gallery" },
					{ status: 404 }
				);
			}
		} else {
			return Response.json({ message: "Gallery not found" }, { status: 404 });
		}

		return Response.json({ message: "Program gallery updated successfully" });
	} catch (error) {
		const message = error.message || "Something went wrong";
		return Response.json({ message }, { status: 500 });
	}
}

export default deleteGalleryImage;
