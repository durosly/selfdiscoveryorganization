import connectMongo from "@/lib/connectDB";
import { requirePermission } from "@/lib/guard-permission";
import EventRegistrationModel from "@/models/event-registration";
import ProgramModel from "@/models/program";
import {
	getTicketSecret,
	verifyTicketSignature,
} from "@/lib/ticket-code";
import mongoose from "mongoose";

function escapeRegex(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Mobile check-in: search attendees or check in by id / ticket code. */
export async function GET(request, { params }) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;

	try {
		const { id } = await params;
		const { searchParams } = new URL(request.url);
		const q = searchParams.get("q")?.trim() ?? "";

		await connectMongo();
		const program = await ProgramModel.findById(id).lean();
		if (!program) {
			return Response.json(
				{ status: false, message: "Event not found" },
				{ status: 404 },
			);
		}

		if (!q) {
			return Response.json({
				status: true,
				message: "success",
				data: [],
			});
		}

		const regex = new RegExp(escapeRegex(q), "i");
		const or = [
			{ name: regex },
			{ email: regex },
			{ ticketCode: new RegExp(`^${escapeRegex(q)}$`, "i") },
		];

		const data = await EventRegistrationModel.find({
			program: program._id,
			$or: or,
		})
			.limit(30)
			.sort({ createdAt: -1 })
			.lean();

		return Response.json({
			status: true,
			message: "success",
			data,
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: error?.message || "Search failed",
			},
			{ status: 500 },
		);
	}
}

export async function POST(request, { params }) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;

	try {
		const { id } = await params;
		const body = await request.json();
		const registrationId = body.registrationId;
		const ticketCode =
			typeof body.ticketCode === "string"
				? body.ticketCode.trim().toUpperCase()
				: "";
		const sig =
			typeof body.sig === "string" ? body.sig.trim() : "";

		await connectMongo();
		const program = await ProgramModel.findById(id);
		if (!program) {
			return Response.json(
				{ status: false, message: "Event not found" },
				{ status: 404 },
			);
		}

		let reg = null;
		if (registrationId && mongoose.isValidObjectId(registrationId)) {
			reg = await EventRegistrationModel.findOne({
				_id: registrationId,
				program: program._id,
			});
		} else if (ticketCode) {
			reg = await EventRegistrationModel.findOne({
				program: program._id,
				ticketCode,
			});
		}

		if (!reg) {
			return Response.json(
				{ status: false, message: "Registration not found" },
				{ status: 404 },
			);
		}

		const secret = getTicketSecret();
		if (sig && secret) {
			const ok = verifyTicketSignature(
				String(program._id),
				reg.ticketCode,
				sig,
				secret,
			);
			if (!ok) {
				return Response.json(
					{ status: false, message: "Invalid ticket signature" },
					{ status: 400 },
				);
			}
		}

		if (reg.status !== "confirmed") {
			return Response.json(
				{
					status: false,
					message:
						"Only confirmed registrations can check in (not waitlisted/cancelled).",
				},
				{ status: 400 },
			);
		}

		if (reg.checkedInAt) {
			return Response.json(
				{
					status: false,
					message: "Already checked in",
					data: {
						checkedInAt: reg.checkedInAt,
						registration: reg.toObject(),
					},
				},
				{ status: 409 },
			);
		}

		const staffId = guard.session.user?.id;
		reg.checkedInAt = new Date();
		reg.checkedInBy =
			staffId && mongoose.isValidObjectId(staffId)
				? new mongoose.Types.ObjectId(staffId)
				: null;
		await reg.save();

		return Response.json({
			status: true,
			message: "Checked in",
			data: reg.toObject(),
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: error?.message || "Check-in failed",
			},
			{ status: 500 },
		);
	}
}
