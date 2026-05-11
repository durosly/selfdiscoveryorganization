import { auth } from "@/lib/auth";
import connectMongo from "@/lib/connectDB";
import { getUserByEmail } from "@/lib/get-user-by-email";
import {
	hasPermission,
	isOwner,
	normalizeUserAccess,
} from "@/lib/permissions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/** Any authenticated user (e.g. admin settings). */
export async function assertSignedIn() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect("/login");
}

export async function assertPermission(permission) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect("/login");
	await connectMongo();
	const fullUser = await getUserByEmail(session.user.email);
	const access = normalizeUserAccess(fullUser);
	if (!hasPermission(access, permission)) {
		redirect("/admin/forbidden");
	}
}

export async function assertOwner() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect("/login");
	await connectMongo();
	const fullUser = await getUserByEmail(session.user.email);
	const access = normalizeUserAccess(fullUser);
	if (!isOwner(access)) {
		redirect("/admin/forbidden");
	}
}
