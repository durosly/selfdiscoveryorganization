import { assertPermission } from "@/lib/assert-admin-permission";

export default async function DonationsSectionLayout({ children }) {
	await assertPermission("donations");
	return children;
}
