import ChangePasswordForm from "./components/change-password-form";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Settings",
};

export default function AdminSettingsPage() {
	return (
		<div>
			<header className="mb-6">
				<h1 className="text-2xl font-bold">Settings</h1>
				<p className="text-sm text-neutral/70">
					Manage your admin account security.
				</p>
			</header>
			<ChangePasswordForm />
		</div>
	);
}
