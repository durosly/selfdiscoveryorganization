import EventRegistrationEmail, {
	REGISTRATION_EMAIL_QR_CID,
} from "@/emails/event-registration-email";
import connectMongo from "@/lib/connectDB";
import transactionalTransporter from "@/lib/transactional-transporter";
import { generateTicketSegment, getTicketSecret, signTicketPayload } from "@/lib/ticket-code";
import EventRegistrationModel, { EventRegistrationSchema } from "@/models/event-registration";
import ProgramModel from "@/models/program";
import { DateTime } from "luxon";
import mongoose from "mongoose";
import QRCode from "qrcode";
import { render } from "react-email";

/** Resolve program from `[id]` segment: MongoDB ObjectId hex or document `slug`. */
async function findProgramForRegistration(routeSegment) {
	const raw = typeof routeSegment === "string" ? routeSegment.trim() : "";
	if (!raw) return null;

	const hex24 = /^[a-fA-F0-9]{24}$/;
	if (hex24.test(raw)) {
		try {
			const oid = new mongoose.Types.ObjectId(raw);
			const byId = await ProgramModel.findById(oid);
			if (byId) return byId;
		} catch {
			/* invalid ObjectId */
		}
	}

	return ProgramModel.findOne({ slug: raw });
}

export async function POST(request, { params }) {
	try {
		const { id: routeId } = await params;
		const body = await request.json();
		const safe = EventRegistrationSchema.safeParse(body);
		if (!safe.success) {
			const issue = safe.error.issues[0];
			return Response.json(
				{
					status: false,
					message: `${issue.message} for ${issue.path.join(".")}`,
				},
				{ status: 400 },
			);
		}

		await connectMongo();
		const program = await findProgramForRegistration(routeId);
		if (!program) {
			return Response.json({ status: false, message: "Event not found" }, { status: 404 });
		}

		if (program.registrations_open === false) {
			return Response.json(
				{ status: false, message: "Registration is closed for this event" },
				{ status: 400 },
			);
		}

		const existing = await EventRegistrationModel.findOne({
			program: program._id,
			email: safe.data.email.toLowerCase(),
		});
		if (existing) {
			return Response.json(
				{
					status: false,
					message: "You're already registered for this event with that email.",
				},
				{ status: 409 },
			);
		}

		let registrationStatus = "confirmed";
		if (program.attendee_limit && program.attendee_limit > 0) {
			const confirmedCount = await EventRegistrationModel.countDocuments({
				program: program._id,
				status: "confirmed",
			});
			if (confirmedCount >= program.attendee_limit) {
				registrationStatus = "waitlisted";
			}
		}

		let ticketCode = generateTicketSegment(8);
		for (let attempt = 0; attempt < 40; attempt++) {
			const clash = await EventRegistrationModel.findOne({
				program: program._id,
				ticketCode,
			}).lean();
			if (!clash) break;
			ticketCode = generateTicketSegment(8);
		}

		const registration = await EventRegistrationModel.create({
			program: program._id,
			name: safe.data.name,
			email: safe.data.email.toLowerCase(),
			phone: safe.data.phone || null,
			notes: safe.data.notes || null,
			status: registrationStatus,
			ticketCode,
		});

		const base = (process.env.NEXT_PUBLIC_URL || "").replace(/\/$/, "");
		const secret = getTicketSecret();
		const sig = secret ? signTicketPayload(String(program._id), ticketCode, secret) : "";
		const entryParams = new URLSearchParams({ p: String(program._id), code: ticketCode });
		if (sig) entryParams.set("sig", sig);
		const checkInUrl = `${base}/check-in/entry?${entryParams.toString()}`;

		let checkInQrBuffer = null;
		if (checkInUrl) {
			try {
				checkInQrBuffer = await QRCode.toBuffer(checkInUrl, {
					errorCorrectionLevel: "M",
					margin: 2,
					width: 220,
					color: { dark: "#000000", light: "#ffffff" },
				});
			} catch (qrError) {
				console.error("Check-in QR generation failed:", qrError);
			}
		}

		try {
			const html = await render(
				<EventRegistrationEmail
					name={registration.name}
					eventTitle={program.title}
					eventDate={
						program.start_date
							? DateTime.fromJSDate(program.start_date).toFormat("DDDD")
							: ""
					}
					eventLocation={program.location || ""}
					status={registration.status}
					eventUrl={`${process.env.NEXT_PUBLIC_URL || ""}/programs/${program.slug}`}
					ticketCode={registration.ticketCode}
					checkInUrl={checkInUrl}
					includeCheckInQrImage={Boolean(checkInQrBuffer)}
				/>,
			);
			const fromInfo = `SelfDiscoveryOrganization <${process.env.TRANSACTIONAL_SMTP_INFO}>`;
			const options = {
				from: fromInfo,
				to: registration.email,
				subject: `${registration.status === "waitlisted" ? "You're on the waitlist for" : "You're registered for"} ${program.title}`,
				html,
				...(checkInQrBuffer
					? {
							attachments: [
								{
									filename: "check-in-qr.png",
									content: checkInQrBuffer,
									contentType: "image/png",
									cid: REGISTRATION_EMAIL_QR_CID,
								},
							],
						}
					: {}),
			};
			// console.log("Sending email with options:", options);
			await transactionalTransporter.sendMail(options);
		} catch (mailError) {
			console.error("Registration email failed:", mailError);
		}

		return Response.json({
			status: true,
			message:
				registration.status === "waitlisted"
					? "Event is currently full — you've been added to the waitlist."
					: "You're registered! Check your email for confirmation.",
			data: {
				id: registration._id,
				status: registration.status,
			},
		});
	} catch (error) {
		console.error("/api/programs/[id]/register error", error);
		return Response.json(
			{
				status: false,
				message: error?.message || "Could not register right now.",
			},
			{ status: 500 },
		);
	}
}
