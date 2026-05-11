import createUpdateArticle from "./create-update-article";
import { requirePermission } from "@/lib/guard-permission";

export async function POST(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return createUpdateArticle(request, ctx);
}
