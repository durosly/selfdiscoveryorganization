import { assertPermission } from "@/lib/assert-admin-permission";

export default async function MessagesSectionLayout({ children }) {
	await assertPermission("messages");
	return children;
}
