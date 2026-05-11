import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuArrowLeft } from "react-icons/lu";
import CheckInPanel from "./components/check-in-panel";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Check-in",
};

async function CheckInPage({ params }) {
	await connectMongo();
	const { id } = await params;
	const program = await ProgramModel.findById(id).lean();
	if (!program) notFound();

	return (
		<div>
			<Link
				href={`/admin/programs/${id}`}
				className="inline-flex items-center gap-2 text-sm text-neutral/70 hover:text-primary mb-3">
				<LuArrowLeft className="w-4 h-4" /> Back to event
			</Link>
			<header className="mb-6">
				<h1 className="text-2xl font-bold">Check-in</h1>
				<p className="text-sm text-neutral/70">
					<span className="font-semibold">{program.title}</span> — search,
					enter a ticket code, or scan a QR at the door.
				</p>
			</header>
			<Suspense fallback={<p className="text-sm text-neutral/60">Loading check-in…</p>}>
				<CheckInPanel programId={id} />
			</Suspense>
		</div>
	);
}

export default CheckInPage;
