import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";

async function deleteMessages(request) {
	try {
		const { ids } = await request.json();

		await connectMongo();

		await MessageModel.deleteMany({ _id: { $in: ids } });

		return Response.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return Response.json(
			{ status: false, message: error },
			{
				status: 500,
			}
		);
	}
}

export default deleteMessages;
