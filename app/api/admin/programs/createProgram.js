import { NextResponse } from "next/server";
import ProgramModel, { ProgramValidationSchema } from "@/models/program";
import connectMongo from "@/lib/connectDB";

async function createProgram(request) {
	try {
		const body = await request.json();

		const safe = ProgramValidationSchema.safeParse(body);

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
		await connectMongo();
		await ProgramModel.create(safe.data);

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

export default createProgram;
