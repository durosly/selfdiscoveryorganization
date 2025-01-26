import connectMongo from "@/lib/connectDB";
import MessageModel, { MessageValidationSchema } from "@/models/message";

async function createMessage(request) {
	try {
		const body = await request.json();

		const safe = MessageValidationSchema.safeParse(body);

		if (!safe.success) {
			return Response.json(
				{
					status: false,
					message:
						safe.error.issues[0].message +
						" for " +
						safe.error.issues[0].path[0],
				},
				{
					status: 400,
				}
			);
		}

		await connectMongo();
		await MessageModel.create(safe.data);

		return Response.json({ status: true, message: "Message sent" });
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: "Something went wrong",
			},
			{
				status: 500,
			}
		);
	}
}

export default createMessage;
