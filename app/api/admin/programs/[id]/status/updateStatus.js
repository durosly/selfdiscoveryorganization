import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

async function updateProgramStatus(request, { params: { id } }) {
	try {
		const { status } = await request.json();

		if (!["publish", "unpublish"].includes(status)) {
			return Response.json(
				{
					status: false,
					message: "invalid status option",
				},
				{
					status: 400,
				}
			);
		}

		await connectMongo();
		await ProgramModel.findByIdAndUpdate(id, { status });

		return Response.json({ status: true, message: "success" });
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

export default updateProgramStatus;
