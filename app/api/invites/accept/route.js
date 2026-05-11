import { auth } from "@/lib/auth";
import connectMongo from "@/lib/connectDB";
import StaffInviteModel, { hashInviteToken } from "@/models/staff-invite";
import UserModel from "@/models/user";
import { headers } from "next/headers";
import { z } from "zod";

const BodySchema = z.object({
	token: z.string().min(16),
	password: z.string().min(8).max(128),
	name: z.string().min(2).max(120).optional(),
});

export async function POST(request) {
	try {
		const json = await request.json();
		const safe = BodySchema.safeParse(json);
		if (!safe.success) {
			const issue = safe.error.issues[0];
			return Response.json(
				{ status: false, message: `${issue.message} (${issue.path.join(".")})` },
				{ status: 400 },
			);
		}

		await connectMongo();

		const tokenHash = hashInviteToken(safe.data.token);
		const invite = await StaffInviteModel.findOne({
			tokenHash,
			acceptedAt: null,
			expiresAt: { $gt: new Date() },
		});

		if (!invite) {
			return Response.json(
				{ status: false, message: "Invalid or expired invitation." },
				{ status: 400 },
			);
		}

		const existing = await UserModel.findOne({ email: invite.email }).lean();
		if (existing) {
			return Response.json(
				{
					status: false,
					message: "This email is already registered. Sign in instead.",
				},
				{ status: 409 },
			);
		}

		const displayName =
			safe.data.name?.trim() ||
			invite.email.split("@")[0].replace(/[._-]/g, " ");

		try {
			await auth.api.signUpEmail({
				body: {
					email: invite.email,
					password: safe.data.password,
					name: displayName,
				},
				headers: await headers(),
			});
		} catch (signErr) {
			const msg = signErr?.message || "Could not create account.";
			return Response.json({ status: false, message: String(msg) }, { status: 400 });
		}

		await UserModel.updateOne(
			{ email: invite.email },
			{
				$set: {
					role: "staff",
					permissions: invite.permissions,
					name: displayName,
				},
			},
		);

		invite.acceptedAt = new Date();
		await invite.save();

		return Response.json({
			status: true,
			message: "Account ready. You can sign in now.",
		});
	} catch (error) {
		console.error("POST /api/invites/accept", error);
		return Response.json(
			{
				status: false,
				message: error?.message || "Something went wrong.",
			},
			{ status: 500 },
		);
	}
}
