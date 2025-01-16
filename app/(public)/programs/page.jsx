import CoverImage from "../components/cover";
import ExistingPrograms from "./components/existing-programs";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Programs",
};

function ProgramsPage() {
	return (
		<>
			<CoverImage title="Programs/Events" />
			<div className="px-5 sm:px-10">
				<ExistingPrograms />
			</div>
		</>
	);
}

export default ProgramsPage;
