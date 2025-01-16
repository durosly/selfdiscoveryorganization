import { NextResponse } from "next/server";
import ProgramModel from "@/models/program";

async function deleteProgram(_, { params: { id } }) {
	try {
		if (!id) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "program not specified",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		await ProgramModel.findOneAndDelete(id);

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

export default deleteProgram;
