import connectMongo from "@/lib/connectDB";
import MessageModel, { MessageValidationSchema } from "@/models/message";
import { NextResponse } from "next/server";

async function createMessage(request) {
	try {
		const body = await request.json();

		const safe = MessageValidationSchema.safeParse(body);

		if (!safe.success) {
			return new Response(
				JSON.stringify({
					status: false,
					message:
						safe.error.issues[0].message +
						" for " +
						safe.error.issues[0].path[0],
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}
		await connectMongo();
		await MessageModel.create(safe.data);

		return NextResponse.json({ status: true, message: "Message sent" });
	} catch (error) {
		return new Response(
			JSON.stringify({
				status: false,
				message: "Something went wrong",
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

export default createMessage;
