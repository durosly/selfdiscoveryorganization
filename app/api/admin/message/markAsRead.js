import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";
import { NextResponse } from "next/server";

async function markAsRead(request) {
	try {
		const { ids } = await request.json();

		await connectMongo();

		await MessageModel.updateMany(
			{ _id: { $in: ids } },
			{ $set: { read: true } }
		);

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return new Response(JSON.stringify({ status: false, message: error }), {
			status: 500,
			headers: { "Content-Type": `application/json` },
		});
	}
}

export default markAsRead;
