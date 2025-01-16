import ProgramModel from "@/models/program";
import { v2 as cloudinary } from "cloudinary";

const { NextResponse } = require("next/server");

async function updateCover(request, { params: { id } }) {
	try {
		const { image } = await request.json();

		if (!id || !image) {
			throw new Error("Empty parameters");
		}

		const program = await ProgramModel.findById(id);

		if (!program) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Program not found",
				}),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json",
					},
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

		if (!!cover_image) {
			await cloudinary.uploader.destroy(cover_image);
		}

		await ProgramModel.findByIdAndUpdate(id, { cover_image: image });

		return NextResponse.json({ status: true, message: "success" });
	} catch (error) {
		return new Response(
			JSON.stringify({
				status: false,
				message: error.message,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export default updateCover;
