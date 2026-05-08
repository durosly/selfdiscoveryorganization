import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import AttendeesTable from "./components/attendees-table";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Attendees",
};

async function AttendeesPage({ params }) {
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
				<h1 className="text-2xl font-bold">Attendees</h1>
				<p className="text-sm text-neutral/70">
					Registrations for{" "}
					<span className="font-semibold">{program.title}</span>
					{program.attendee_limit ? (
						<>
							{" "}— capacity {program.attendee_limit}
						</>
					) : null}
				</p>
			</header>
			<AttendeesTable
				programId={id}
				programTitle={program.title}
				attendeeLimit={program.attendee_limit ?? null}
			/>
		</div>
	);
}

export default AttendeesPage;
