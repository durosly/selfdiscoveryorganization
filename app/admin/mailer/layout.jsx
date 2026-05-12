import { assertPermission } from "@/lib/assert-admin-permission";

export default async function MailerSectionLayout({ children }) {
	await assertPermission("mailer");
	return children;
}
