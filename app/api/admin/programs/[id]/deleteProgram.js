import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

async function deleteProgram(_, { params: { id } }) {
	try {
		if (!id) {
			return Response.json(
				{
					status: false,
					message: "program not specified",
				},
				{
					status: 400,
				}
			);
		}

		await connectMongo();
		await ProgramModel.findOneAndDelete(id);

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

export default deleteProgram;
