import { Suspense } from "react";
import AcceptInviteForm from "./components/accept-invite-form";

export const metadata = {
	title: "Accept invitation",
};

export default function AcceptInvitePage() {
	return (
		<section className="container mx-auto px-4 py-16">
			<Suspense
				fallback={
					<p className="text-center text-sm text-neutral/60">Loading…</p>
				}>
				<AcceptInviteForm />
			</Suspense>
		</section>
	);
}
