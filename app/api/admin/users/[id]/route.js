import { requireOwner } from "@/lib/guard-permission";
import connectMongo from "@/lib/connectDB";
import { normalizeUserAccess } from "@/lib/permissions";
import UserModel from "@/models/user";
import mongoose from "mongoose";
import { z } from "zod";

const PatchSchema = z.object({
	permissions: z.array(z.string()).min(1),
});

export async function PATCH(request, ctx) {
	const guard = await requireOwner();
	if (!guard.ok) return guard.response;

	try {
		const params = await ctx.params;
		const { id } = params;
		if (!mongoose.isValidObjectId(id)) {
			return Response.json(
				{ status: false, message: "Invalid user id" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const safe = PatchSchema.safeParse(body);
		if (!safe.success) {
			const issue = safe.error.issues[0];
			return Response.json(
				{ status: false, message: `${issue.message} (${issue.path.join(".")})` },
				{ status: 400 },
			);
		}

		await connectMongo();
		const target = await UserModel.findById(id).lean();
		if (!target) {
			return Response.json(
				{ status: false, message: "User not found" },
				{ status: 404 },
			);
		}

		const access = normalizeUserAccess(target);
		if (access.role === "owner") {
			return Response.json(
				{
					status: false,
					message: "Owner accounts cannot be edited here.",
				},
				{ status: 403 },
			);
		}

		await UserModel.updateOne(
			{ _id: id },
			{ $set: { permissions: safe.data.permissions } },
		);

		return Response.json({ status: true, message: "Updated" });
	} catch (error) {
		return Response.json(
			{ status: false, message: error?.message || "Update failed" },
			{ status: 500 },
		);
	}
}
