import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

async function updateProgramRegistrationsOpen(request, { params }) {
	const { id } = await params;
	try {
		const { registrations_open } = await request.json();

		if (typeof registrations_open !== "boolean") {
			return Response.json(
				{
					status: false,
					message: "registrations_open must be a boolean",
				},
				{
					status: 400,
				},
			);
		}

		await connectMongo();
		const program = await ProgramModel.findByIdAndUpdate(
			id,
			{ registrations_open },
			{ new: true },
		);

		if (!program) {
			return Response.json(
				{ status: false, message: "program not found" },
				{ status: 404 },
			);
		}

		return Response.json({
			status: true,
			message: "success",
			data: {
				registrations_open: program.registrations_open !== false,
			},
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: error.message,
			},
			{
				status: 500,
			},
		);
	}
}

export default updateProgramRegistrationsOpen;
