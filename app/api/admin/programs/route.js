import createProgram from "./createProgram";
import getPrograms from "./getPrograms";
import { requirePermission } from "@/lib/guard-permission";

export async function GET(request) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return getPrograms(request);
}

export async function POST(request) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return createProgram(request);
}
