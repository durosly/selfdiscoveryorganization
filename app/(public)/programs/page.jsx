import connectMongo from "@/lib/connectDB";
import CoverImage from "../components/cover";
import ExistingPrograms from "./components/existing-programs";
import ProgramModel from "@/models/program";

export const metadata = {
	title: "Programs",
	description:
		"Browse Self Discovery Organization's upcoming events and programmes — register, learn more, or support our work.",
	openGraph: {
		title: "Programs & Events — Self Discovery Organization",
		description:
			"Discover our upcoming charity events, conferences and outreach programmes.",
	},
};

async function ProgramsPage() {
	await connectMongo();
	// Match app/api/programs/getPrograms.js so initialData matches client fetches.
	const query = { status: "publish" };
	const data = await ProgramModel.paginate(query, {
		page: 1,
		sort: { start_date: -1, start_time: 1 },
	});

	return (
		<>
			<CoverImage
				title="Programs & Events"
				subtitle="Discover upcoming events you can attend, support, or volunteer with."
			/>
			<div className="px-5 sm:px-10 max-w-7xl mx-auto">
				<ExistingPrograms initialData={JSON.parse(JSON.stringify(data))} />
			</div>
		</>
	);
}

export default ProgramsPage;
