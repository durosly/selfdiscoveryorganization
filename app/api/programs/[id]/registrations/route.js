import connectMongo from "@/lib/connectDB";
import { requirePermission } from "@/lib/guard-permission";
import EventRegistrationModel from "@/models/event-registration";
import ProgramModel from "@/models/program";

export async function GET(request, { params }) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;

	try {
		const { id } = await params;
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = Math.min(
			parseInt(searchParams.get("limit") || "50", 10),
			200,
		);
		const status = searchParams.get("status");

		await connectMongo();
		const program = await ProgramModel.findById(id).lean();
		if (!program) {
			return Response.json(
				{ status: false, message: "Event not found" },
				{ status: 404 },
			);
		}

		const query = { program: program._id };
		if (status) query.status = status;

		const data = await EventRegistrationModel.paginate(query, {
			page,
			limit,
			sort: { createdAt: -1 },
		});

		const counts = await EventRegistrationModel.aggregate([
			{ $match: { program: program._id } },
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);
		const summary = counts.reduce(
			(acc, c) => ({ ...acc, [c._id]: c.count }),
			{ confirmed: 0, waitlisted: 0, cancelled: 0 },
		);

		const checkedIn = await EventRegistrationModel.countDocuments({
			program: program._id,
			checkedInAt: { $ne: null },
		});

		return Response.json({
			status: true,
			message: "success",
			program: {
				_id: program._id,
				title: program.title,
				attendee_limit: program.attendee_limit ?? null,
				registrations_open: program.registrations_open ?? true,
			},
			data,
			summary: { ...summary, checkedIn },
		});
	} catch (error) {
		return Response.json(
			{ status: false, message: error?.message || "Failed to load attendees" },
			{ status: 500 },
		);
	}
}
