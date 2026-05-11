import { assertSignedIn } from "@/lib/assert-admin-permission";

export default async function SettingsLayout({ children }) {
	await assertSignedIn();
	return children;
}
