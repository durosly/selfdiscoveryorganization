import connectMongo from "@/lib/connectDB";
import GalleryModel from "@/models/program-images";
import ProgramGalleryDisplay from "./gallery-display";

async function ProgramGallery({ id }) {
	await connectMongo();
	const gallery = await GalleryModel.findOne({ program_id: id });

	if (!gallery) return null;

	if (gallery.images.length === 0) return null;

	return (
		<div className="mt-10">
			<h3 className="text-2xl font-bold text-center mb-3">Program Gallery</h3>

			<ProgramGalleryDisplay images={gallery.images} />
		</div>
	);
}

export default ProgramGallery;
