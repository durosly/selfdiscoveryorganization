import connectMongo from "@/lib/connectDB";
import { requireAdmin } from "@/lib/require-admin";
import DonationModel from "@/models/donation";

export async function GET(request) {
	const guard = await requireAdmin();
	if (!guard.ok) return guard.response;

	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = Math.min(
			parseInt(searchParams.get("limit") || "20", 10),
			100,
		);
		const designation = searchParams.get("designation");
		const recurring = searchParams.get("recurring");
		const status = searchParams.get("status");
		const from = searchParams.get("from");
		const to = searchParams.get("to");

		const query = {};
		if (designation) query.designation = designation;
		if (recurring === "true" || recurring === "false")
			query.recurring = recurring === "true";
		if (status) query.status = status;
		if (from || to) {
			query.createdAt = {};
			if (from) query.createdAt.$gte = new Date(from);
			if (to) query.createdAt.$lte = new Date(to);
		}

		await connectMongo();

		const data = await DonationModel.paginate(query, {
			page,
			limit,
			sort: { createdAt: -1 },
		});

		const totalsAgg = await DonationModel.aggregate([
			{ $match: { ...query, status: "completed" } },
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
		]);

		return Response.json({
			status: true,
			message: "success",
			data,
			totals: totalsAgg[0] || { total: 0, count: 0 },
		});
	} catch (error) {
		return Response.json(
			{ status: false, message: error?.message || "Failed to load donations" },
			{ status: 500 },
		);
	}
}
