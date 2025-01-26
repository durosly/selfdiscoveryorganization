import connectMongo from "@/lib/connectDB";
import TimelineModel, { TimelineValidationSchema } from "@/models/timeline";

async function createTimeline(request, { params: { id } }) {
	try {
		const body = await request.json();

		const safe = TimelineValidationSchema.safeParse(body);

		if (!id) {
			return Response.json(
				{
					status: false,
					message: "No program selected",
				},
				{
					status: 400,
				}
			);
		}

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
		await TimelineModel.create({ ...safe.data, program_id: id });

		return Response.json({
			status: true,
			message: "Timeline added successfully",
		});
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

export default createTimeline;
