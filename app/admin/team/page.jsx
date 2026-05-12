import TeamManagement from "./components/team-management";

export const metadata = {
	title: "Team",
};

export default function TeamPage() {
	return (
		<div>
			<header className="mb-8">
				<h1 className="text-2xl font-bold">Team</h1>
				<p className="text-sm text-neutral/70">
					Invite staff by email and assign which areas of the admin they can access.
					Only owners can manage team members.
				</p>
			</header>
			<TeamManagement />
		</div>
	);
}
