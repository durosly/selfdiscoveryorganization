import { assertPermission } from "@/lib/assert-admin-permission";

export default async function ProgramsSectionLayout({ children }) {
	await assertPermission("events");
	return children;
}
