import { NextResponse } from "next/server";
import TimelineModel from "@/models/timeline";

async function deleteTimeline(_, { params: { id, t_id } }) {
	try {
		await TimelineModel.findOneAndDelete({ _id: t_id, program_id: id });
		return NextResponse.json({ status: true, message: "Deleted" });
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

export default deleteTimeline;
