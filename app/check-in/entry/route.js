import { requirePermissionFromRequest } from "@/lib/guard-permission";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

/**
 * Public ticket QR opens this URL (no /admin in the link). After verifying an
 * authenticated staff member with events permission, redirects to the real check-in page.
 */
export async function GET(request) {
	const guard = await requirePermissionFromRequest(request, "events");
	if (!guard.ok) return guard.response;

	const url = new URL(request.url);
	const programId = url.searchParams.get("p")?.trim() ?? "";
	const code = url.searchParams.get("code")?.trim() ?? "";
	const sig = url.searchParams.get("sig")?.trim() ?? "";

	if (!mongoose.Types.ObjectId.isValid(programId)) {
		return NextResponse.redirect(new URL("/admin/programs", request.url));
	}

	const basePath = `/admin/programs/${programId}/check-in`;
	const targetPath =
		code === ""
			? basePath
			: sig
				? `${basePath}?code=${encodeURIComponent(code)}&sig=${encodeURIComponent(sig)}`
				: `${basePath}?code=${encodeURIComponent(code)}`;

	return NextResponse.redirect(new URL(targetPath, request.url));
}
