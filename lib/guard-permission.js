import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";
import connectMongo from "@/lib/connectDB";
import {
	hasPermission,
	isOwner,
	normalizeUserAccess,
} from "@/lib/permissions";
import { headers } from "next/headers";

/**
 * Server-side guard for API routes.
 * @param {string} permission - one of PERMISSION_KEYS
 */
export async function requirePermission(permission) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) {
		return {
			ok: false,
			response: Response.json(
				{ status: false, message: "Authentication required" },
				{ status: 401 },
			),
		};
	}

	await connectMongo();
	const fullUser = await getUserByEmail(session.user.email);
	const access = normalizeUserAccess(fullUser);

	if (!hasPermission(access, permission)) {
		return {
			ok: false,
			response: Response.json(
				{ status: false, message: "Forbidden" },
				{ status: 403 },
			),
		};
	}

	return {
		ok: true,
		session,
		access,
		userDoc: fullUser,
	};
}

/** Owner or legacy account_type admin (treated as owner). */
export async function requireOwner() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) {
		return {
			ok: false,
			response: Response.json(
				{ status: false, message: "Authentication required" },
				{ status: 401 },
			),
		};
	}

	await connectMongo();
	const fullUser = await getUserByEmail(session.user.email);
	const access = normalizeUserAccess(fullUser);

	if (!isOwner(access)) {
		return {
			ok: false,
			response: Response.json(
				{ status: false, message: "Forbidden" },
				{ status: 403 },
			),
		};
	}

	return { ok: true, session, access, userDoc: fullUser };
}
