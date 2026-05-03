import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default function proxy(request) {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) {
		const url = new URL("/login", request.url);
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
