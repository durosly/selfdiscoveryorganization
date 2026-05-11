import connectMongo from "@/lib/connectDB";
import convertTo12HourFormat from "@/lib/formatTime";
import EventRegistrationModel from "@/models/event-registration";
import ProgramModel from "@/models/program";
import ArticleModel from "@/models/program-article";
import GalleryModel from "@/models/program-images";
import "easymde/dist/easymde.min.css";
import { DateTime } from "luxon";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	LuCalendar,
	LuClock5,
	LuMapPin,
	LuTag,
	LuScanLine,
	LuUsers,
} from "react-icons/lu";
import ArticleSummary from "./components/article-summary";
import CoverImage from "./components/cover-image";
import CopyProgramLinkBtn from "./components/copy-program-link-btn";
import DeleteBtn from "./components/delete-btn";
import ProgramGallery from "./components/gallery";
import StatusBtn from "./components/status-btn";
import TimelineDisplay from "./components/timeline";

async function AdminProgramsDetailsPage({ params }) {
	await connectMongo();
	const { id } = await params;
	const program = await ProgramModel.findById(id);

	if (!program) {
		notFound();
	}

	const base = (process.env.NEXT_PUBLIC_URL || "").replace(/\/$/, "");
	const registrationUrl = program.slug
		? `${base}/programs/${program.slug}`
		: "";

	const article = await ArticleModel.findOne({ program_id: id });
	const articleGallery = await GalleryModel.findOne({ program_id: id });
	const confirmedCount = await EventRegistrationModel.countDocuments({
		program: program._id,
		status: "confirmed",
	});
	const checkedInCount = await EventRegistrationModel.countDocuments({
		program: program._id,
		checkedInAt: { $ne: null },
	});

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
					{program.designation ? (
						<div>
							<p className="flex items-center gap-2 ">
								<LuTag className="inline-block" /> Linked
								cause: {program.designation}
							</p>
						</div>
					) : null}
					<div>
						<p className="flex items-center gap-2 ">
							<LuUsers className="inline-block" />{" "}
							<strong>{confirmedCount}</strong>
							{program.attendee_limit
								? ` of ${program.attendee_limit}`
								: ""}{" "}
							confirmed · <strong>{checkedInCount}</strong> checked in ·{" "}
							{program.registrations_open === false
								? "registrations closed"
								: "registrations open"}
						</p>
						<div className="flex flex-wrap gap-2 mt-2">
							<CopyProgramLinkBtn url={registrationUrl} />
							<Link
								href={`/admin/programs/${id}/attendees`}
								className="btn btn-sm btn-outline">
								<LuUsers className="w-4 h-4" /> Manage attendees
							</Link>
							<Link
								href={`/admin/programs/${id}/check-in`}
								className="btn btn-sm btn-primary">
								<LuScanLine className="w-4 h-4" /> Check-in
							</Link>
						</div>
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
