import { requireOwner } from "@/lib/guard-permission";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";

export async function GET() {
	const guard = await requireOwner();
	if (!guard.ok) return guard.response;

	try {
		await connectMongo();
		const users = await UserModel.find({})
			.select("email name role permissions account_type createdAt updatedAt")
			.sort({ createdAt: -1 })
			.lean();

		return Response.json({
			status: true,
			message: "success",
			data: users,
		});
	} catch (error) {
		return Response.json(
			{ status: false, message: error?.message || "Failed to load users" },
			{ status: 500 },
		);
	}
}
