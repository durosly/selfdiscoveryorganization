import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";

async function markAsRead(request) {
	try {
		const { ids } = await request.json();

		await connectMongo();

		await MessageModel.updateMany({ _id: { $in: ids } }, { $set: { read: true } });

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

export default markAsRead;
