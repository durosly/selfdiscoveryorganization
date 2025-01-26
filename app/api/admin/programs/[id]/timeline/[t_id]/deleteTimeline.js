import connectMongo from "@/lib/connectDB";
import TimelineModel from "@/models/timeline";

async function deleteTimeline(_, { params: { id, t_id } }) {
	try {
		await connectMongo();
		await TimelineModel.findOneAndDelete({ _id: t_id, program_id: id });
		return Response.json({ status: true, message: "Deleted" });
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

export default deleteTimeline;
