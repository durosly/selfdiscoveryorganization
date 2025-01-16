import { NextResponse } from "next/server";
import TimelineModel, { TimelineValidationSchema } from "@/models/timeline";

async function createTimeline(request, { params: { id } }) {
	try {
		const body = await request.json();

		const safe = TimelineValidationSchema.safeParse(body);

		if (!id) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No program selected",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

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

		await TimelineModel.create({ ...safe.data, program_id: id });

		return NextResponse.json({
			status: true,
			message: "Timeline added successfully",
		});
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

export default createTimeline;
