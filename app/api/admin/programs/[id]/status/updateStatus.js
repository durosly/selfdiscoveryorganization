import { NextResponse } from "next/server";
import ProgramModel from "@/models/program";

async function updateProgramStatus(request, { params: { id } }) {
	try {
		const { status } = await request.json();

		if (!["publish", "unpublish"].includes(status)) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "invalid status option",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		await ProgramModel.findByIdAndUpdate(id, { status });

		return NextResponse.json({ status: true, message: "success" });
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

export default updateProgramStatus;
