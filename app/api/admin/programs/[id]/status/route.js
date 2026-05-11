import updateProgramStatus from "./updateStatus";
import { requirePermission } from "@/lib/guard-permission";

export async function PUT(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return updateProgramStatus(request, ctx);
}
