import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import { notFound } from "next/navigation";
import { LuCalendar, LuClock5, LuMapPin } from "react-icons/lu";
import { DateTime } from "luxon";
import CoverImage from "./components/cover-image";
import TimelineDisplay from "./components/timeline";
import convertTo12HourFormat from "@/lib/formatTime";
import StatusBtn from "./components/status-btn";
import DeleteBtn from "./components/delete-btn";
import ArticleSummary from "./components/article-summary";
import ArticleModel from "@/models/program-article";
import "easymde/dist/easymde.min.css";
import ProgramGallery from "./components/gallery";
import GalleryModel from "@/models/program-images";

async function AdminProgramsDetailsPage({ params }) {
	await connectMongo();
	const { id } = await params;
	const program = await ProgramModel.findById(id);

	if (!program) {
		notFound();
	}

	const article = await ArticleModel.findOne({ program_id: id });
	const articleGallery = await GalleryModel.findOne({ program_id: id });

	return (
		<div className="px-5 sm:px-10">
			<CoverImage url={program.cover_image} title={program.title} id={id} />
			<div className="flex-1">
				<h2 className="text-2xl font-bold">{program.title}</h2>
				<p>{program.desc}</p>
				<div className="mt-5 text-sm">
					<div>
						<p className="flex items-center gap-2 ">
							<LuCalendar className="inline-block" />{" "}
							{DateTime.fromJSDate(
								program.start_date
							).toLocaleString(DateTime.DATE_MED)}{" "}
							{!!program?.end_date && (
								<>
									-{" "}
									{DateTime.fromJSDate(
										program.end_date
									).toLocaleString(
										DateTime.DATE_MED
									)}
								</>
							)}
						</p>
					</div>
					<div>
						<p className="flex items-center gap-2 ">
							<LuClock5 className="inline-block" />{" "}
							{convertTo12HourFormat(program.start_time)}{" "}
							{!!program?.end_time && (
								<>
									-{" "}
									{convertTo12HourFormat(
										program.end_time
									)}
								</>
							)}
						</p>
					</div>
					<div>
						<p className="flex items-center gap-2 ">
							<LuMapPin className="inline-block" />{" "}
							{program.location}
						</p>
					</div>
				</div>
			</div>
			<div className="mt-5">
				<h3 className="text-2xl font-bold text-center mb-3">Activities</h3>
				<TimelineDisplay id={id} />
			</div>
			<div className="divider">Article</div>

			<ArticleSummary
				initialData={JSON.parse(JSON.stringify(article))}
				program_id={id}
			/>

			<div className="divider">Program gallery</div>
			<ProgramGallery
				program_id={id}
				initialData={JSON.parse(JSON.stringify(articleGallery))}
			/>

			<div className="divider">Actions</div>
			<StatusBtn id={id} status={program.status} />
			<DeleteBtn id={id} />
		</div>
	);
}

export default AdminProgramsDetailsPage;
