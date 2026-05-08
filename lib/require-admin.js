import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Server-side admin guard for API route handlers.
 * Usage:
 *   const guard = await requireAdmin();
 *   if (!guard.ok) return guard.response;
 *   const { session } = guard;
 */
export async function requireAdmin() {
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
	if (session.user.account_type !== "admin") {
		return {
			ok: false,
			response: Response.json(
				{ status: false, message: "Forbidden" },
				{ status: 403 },
			),
		};
	}
	return { ok: true, session };
}
