import EventRegistrationEmail from "@/emails/event-registration-email";
import connectMongo from "@/lib/connectDB";
import transporter from "@/lib/transporter";
import EventRegistrationModel, {
	EventRegistrationSchema,
} from "@/models/event-registration";
import ProgramModel from "@/models/program";
import { DateTime } from "luxon";
import { render } from "react-email";

export async function POST(request, { params }) {
	try {
		const { id } = await params;
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
		const program = await ProgramModel.findById(id);
		if (!program) {
			return Response.json(
				{ status: false, message: "Event not found" },
				{ status: 404 },
			);
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
					message:
						"You're already registered for this event with that email.",
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

		const registration = await EventRegistrationModel.create({
			program: program._id,
			name: safe.data.name,
			email: safe.data.email.toLowerCase(),
			phone: safe.data.phone || null,
			notes: safe.data.notes || null,
			status: registrationStatus,
		});

		try {
			const html = await render(
				EventRegistrationEmail({
					name: registration.name,
					eventTitle: program.title,
					eventDate: program.start_date
						? DateTime.fromJSDate(program.start_date).toFormat(
								"DDDD",
							)
						: "",
					eventLocation: program.location || "",
					status: registration.status,
					eventUrl: `${process.env.NEXT_PUBLIC_URL || ""}/programs/${program.slug}`,
				}),
			);
			await transporter.sendMail({
				from: process.env.SMTP_INFO,
				to: registration.email,
				subject:
					registration.status === "waitlisted"
						? `You're on the waitlist for ${program.title}`
						: `You're registered for ${program.title}`,
				html,
			});
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
