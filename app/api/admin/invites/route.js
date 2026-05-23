import StaffInviteEmail from "@/emails/staff-invite-email";
import { requireOwner } from "@/lib/guard-permission";
import connectMongo from "@/lib/connectDB";
import StaffInviteModel, {
	hashInviteToken,
	StaffInviteCreateSchema,
} from "@/models/staff-invite";
import UserModel from "@/models/user";
import crypto from "crypto";
import mongoose from "mongoose";
import { render } from "react-email";
import transactionalTransporter from "@/lib/transactional-transporter";

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(request) {
	const guard = await requireOwner();
	if (!guard.ok) return guard.response;

	try {
		const body = await request.json();
		const safe = StaffInviteCreateSchema.safeParse(body);
		if (!safe.success) {
			const issue = safe.error.issues[0];
			return Response.json(
				{ status: false, message: `${issue.message} (${issue.path.join(".")})` },
				{ status: 400 },
			);
		}

		await connectMongo();

		const emailLower = safe.data.email.toLowerCase();
		const existingUser = await UserModel.findOne({ email: emailLower }).lean();
		if (existingUser) {
			return Response.json(
				{ status: false, message: "A user with this email already exists." },
				{ status: 409 },
			);
		}

		const plainToken = crypto.randomBytes(32).toString("hex");
		const tokenHash = hashInviteToken(plainToken);
		const expiresAt = new Date(Date.now() + INVITE_TTL_MS);

		const createdBy =
			guard.session.user?.id && mongoose.isValidObjectId(guard.session.user.id)
				? new mongoose.Types.ObjectId(guard.session.user.id)
				: null;

		await StaffInviteModel.create({
			email: emailLower,
			tokenHash,
			permissions: safe.data.permissions,
			expiresAt,
			createdBy,
		});

		const base = (process.env.NEXT_PUBLIC_URL || "").replace(/\/$/, "");
		const inviteUrl = `${base}/accept-invite?token=${encodeURIComponent(plainToken)}`;

		const html = await render(
			StaffInviteEmail({
				inviteUrl,
			}),
		);

		await transactionalTransporter.sendMail({
			from: `SelfDiscoveryOrganization <${process.env.TRANSACTIONAL_SMTP_INFO}>`,
			to: emailLower,
			subject: "You are invited - admin access",
			html,
		});

		return Response.json({
			status: true,
			message: "Invitation sent.",
		});
	} catch (error) {
		console.error("POST /api/admin/invites", error);
		return Response.json(
			{ status: false, message: error?.message || "Could not send invite" },
			{ status: 500 },
		);
	}
}
