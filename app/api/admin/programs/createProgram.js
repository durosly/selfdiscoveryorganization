import ProgramModel, { ProgramValidationSchema } from "@/models/program";
import connectMongo from "@/lib/connectDB";

async function createProgram(request) {
	try {
		const body = await request.json();

		const safe = ProgramValidationSchema.safeParse(body);

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
		await ProgramModel.create(safe.data);

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

export default createProgram;
