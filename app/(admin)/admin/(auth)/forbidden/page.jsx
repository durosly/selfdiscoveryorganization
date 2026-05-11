import Link from "next/link";

export const metadata = {
	title: "Access denied",
};

export default function ForbiddenPage() {
	return (
		<div className="max-w-md mx-auto text-center py-16 px-4">
			<h1 className="text-2xl font-bold mb-2">Access denied</h1>
			<p className="text-neutral/70 text-sm mb-6">
				You don&apos;t have permission to view this section. Ask an owner to update your
				access.
			</p>
			<Link href="/admin/dashboard" className="btn btn-primary btn-sm">
				Back to dashboard
			</Link>
		</div>
	);
}
