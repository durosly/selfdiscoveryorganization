import getMessages from "./getMessages";
import deleteMessages from "./deleteMessage";
import markAsRead from "./markAsRead";
import { requirePermission } from "@/lib/guard-permission";

export async function GET(request) {
	const guard = await requirePermission("messages");
	if (!guard.ok) return guard.response;
	return getMessages(request);
}

export async function DELETE(request) {
	const guard = await requirePermission("messages");
	if (!guard.ok) return guard.response;
	return deleteMessages(request);
}

export async function PUT(request) {
	const guard = await requirePermission("messages");
	if (!guard.ok) return guard.response;
	return markAsRead(request);
}
