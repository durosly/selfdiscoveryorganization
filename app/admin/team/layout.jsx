import { assertOwner } from "@/lib/assert-admin-permission";

export default async function TeamSectionLayout({ children }) {
	await assertOwner();
	return children;
}
