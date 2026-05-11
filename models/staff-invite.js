import crypto from "crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { PERMISSION_KEYS } from "@/lib/permissions";

/** Permissions an owner may grant via invite (not team). */
export const INVITABLE_PERMISSIONS = PERMISSION_KEYS.filter((p) => p !== "team");

const INVITABLE = INVITABLE_PERMISSIONS;

const staffInviteSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, lowercase: true, index: true },
		tokenHash: { type: String, required: true, index: true },
		permissions: [{ type: String }],
		expiresAt: { type: Date, required: true, index: true },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		acceptedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

staffInviteSchema.index({ email: 1, acceptedAt: 1 });

const StaffInviteModel =
	mongoose.models.StaffInvite ||
	mongoose.model("StaffInvite", staffInviteSchema);

export const StaffInviteCreateSchema = z.object({
	email: z.string().email(),
	permissions: z
		.array(z.string())
		.min(1)
		.refine(
			(arr) => arr.every((p) => INVITABLE.includes(p)),
			"Each permission must be a valid feature",
		),
	nameHint: z.string().max(120).optional(),
});

export function hashInviteToken(plainToken) {
	return crypto.createHash("sha256").update(plainToken).digest("hex");
}

export default StaffInviteModel;
