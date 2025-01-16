import Link from "next/link";
import React from "react";
import ExistingPrograms from "./components/existing-programs";

function AdminProgramsPage() {
	return (
		<>
			<div>
				<h1 className="text-2xl font-bold mb-2">Programs</h1>

				<Link
					href="/admin/programs/new"
					className="btn btn-primary"
				>
					Add new
				</Link>
			</div>
			<div className="divider">Existing events</div>
			<ExistingPrograms />
		</>
	);
}

export default AdminProgramsPage;
