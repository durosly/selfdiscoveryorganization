import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

async function getPrograms(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const q = searchParams.get("q");

		await connectMongo();

		const query = {};

		query.status = "publish";

		if (!!q) {
			query.$text = { $search: `\"${q}\"` };
		}

		const data = await ProgramModel.paginate(query, {
			page,
			sort: { start_date: -1, start_time: 1 },
		});

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

export default getPrograms;
