import Link from "next/link";
import React from "react";
import ExistingPrograms from "./components/existing-programs";
import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

async function AdminProgramsPage() {
	await connectMongo();
	const query = {};
	const data = await ProgramModel.paginate(query, {
		page: 1,
		sort: { start_date: -1, start_time: 1 },
	});

	return (
		<>
			<div>
				<h1 className="text-2xl font-bold mb-2">Programs</h1>

				<Link href="/admin/programs/new" className="btn btn-primary">
					Add new
				</Link>
			</div>
			<div className="divider">Existing events</div>
			<ExistingPrograms initialData={JSON.parse(JSON.stringify(data))} />
		</>
	);
}

export default AdminProgramsPage;
