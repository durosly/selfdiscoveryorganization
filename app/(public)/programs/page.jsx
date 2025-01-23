import connectMongo from "@/lib/connectDB";
import CoverImage from "../components/cover";
import ExistingPrograms from "./components/existing-programs";
import ProgramModel from "@/models/program";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Programs",
};

async function ProgramsPage() {
	await connectMongo();
	const query = {};
	const data = await ProgramModel.paginate(query, {
		page: 1,
		sort: { start_date: -1, start_time: 1 },
	});

	return (
		<>
			<CoverImage title="Programs/Events" />
			<div className="px-5 sm:px-10">
				<ExistingPrograms initialData={JSON.parse(JSON.stringify(data))} />
			</div>
		</>
	);
}

export default ProgramsPage;
