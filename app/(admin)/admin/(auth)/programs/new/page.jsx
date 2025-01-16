import React from "react";
import NewProgramForm from "./components/form";

function AdminNewProgramPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Add new Program</h1>
			<NewProgramForm />
		</div>
	);
}

export default AdminNewProgramPage;
