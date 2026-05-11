import deleteTimeline from "./deleteTimeline";
import { requirePermission } from "@/lib/guard-permission";

export async function DELETE(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return deleteTimeline(request, ctx);
}
