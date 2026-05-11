import updateCover from "./updateCover";
import { requirePermission } from "@/lib/guard-permission";

export async function PUT(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return updateCover(request, ctx);
}
