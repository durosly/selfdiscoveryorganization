import { requirePermission } from "@/lib/guard-permission";
import updateProgramRegistrationsOpen from "./updateRegistrationsOpen";

export async function PUT(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return updateProgramRegistrationsOpen(request, ctx);
}
