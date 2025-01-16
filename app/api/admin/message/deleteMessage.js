import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";
import { NextResponse } from "next/server";

async function deleteMessages(request) {
	try {
		const { ids } = await request.json();

		await connectMongo();

		await MessageModel.deleteMany({ _id: { $in: ids } });

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

export default deleteMessages;
