import Image from "next/image";
import { LuCalendar, LuClock5, LuMapPin } from "react-icons/lu";
import TimelineDisplay from "./components/timeline";
import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import convertTo12HourFormat from "@/lib/formatTime";
import { DateTime } from "luxon";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { slug } }) {
	await connectMongo();

	const program = await ProgramModel.findOne({ slug });

	if (program) {
		return {
			title: program.title,
			description: program.desc,
			openGraph: {
				images: [
					`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${program.cover_image}`,
				],
			},
		};
	}
}

async function ProgramsDetailsPage({ params: { slug } }) {
	await connectMongo();

	const program = await ProgramModel.findOne({ slug });

	if (!program) {
		notFound();
	}

	return (
		<>
			<div className="px-5 sm:px-10">
				<div className="relative h-44 w-full rounded-xl overflow-hidden">
					<Image
						fill
						src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${program.cover_image}`}
						alt={program.title}
						className="object-cover"
					/>
				</div>
				<div className="flex-1 mt-5">
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
										).toLocaleString(DateTime.DATE_MED)}
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
					<h3 className="text-2xl font-bold text-center mb-3">
						Activities
					</h3>
					<TimelineDisplay id={program._id} />
				</div>
			</div>
		</>
	);
}

export default ProgramsDetailsPage;
