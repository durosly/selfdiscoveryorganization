import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";

async function getMessages(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const read = searchParams.get("read");
		const q = searchParams.get("q");

		await connectMongo();

		const query = {};

		if (read && read !== "all") {
			query.read = read === "read" ? true : false;
		}

		if (!!q) {
			query.$text = { $search: `\"${q}\"` };
		}

		const data = await MessageModel.paginate(query, { page });

		return Response.json({
			status: true,
			message: "success",
			data,
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

export default getMessages;
