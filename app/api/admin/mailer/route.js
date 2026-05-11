import sendEmail from "./sendEmail";
import { requirePermission } from "@/lib/guard-permission";

export async function POST(request) {
	const guard = await requirePermission("mailer");
	if (!guard.ok) return guard.response;
	return sendEmail(request);
}
