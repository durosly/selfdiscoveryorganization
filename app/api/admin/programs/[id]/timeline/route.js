import createTimeline from "./createTimeline";
import { requirePermission } from "@/lib/guard-permission";

export async function POST(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return createTimeline(request, ctx);
}
