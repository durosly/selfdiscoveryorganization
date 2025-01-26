import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import { v2 as cloudinary } from "cloudinary";

async function updateCover(request, { params: { id } }) {
	try {
		const { image } = await request.json();

		if (!id || !image) {
			throw new Error("Empty parameters");
		}

		await connectMongo();
		const program = await ProgramModel.findById(id);

		if (!program) {
			return Response.json(
				{
					status: false,
					message: "Program not found",
				},
				{
					status: 404,
				}
			);
		}

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CNAME,
			api_key: process.env.CLOUDINARY_API_kEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});

		const cover_image = program.cover_image;

		if (!!cover_image && cover_image !== "default.png") {
			await cloudinary.uploader.destroy(cover_image);
		}

		await ProgramModel.findByIdAndUpdate(id, { cover_image: image });

		return Response.json({ status: true, message: "success" });
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: error.message,
			},
			{
				status: 500,
			}
		);
	}
}

export default updateCover;
