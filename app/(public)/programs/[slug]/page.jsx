import SectionHeading from "@/app/components/ui/section-heading";
import connectMongo from "@/lib/connectDB";
import convertTo12HourFormat from "@/lib/formatTime";
import EventRegistrationModel from "@/models/event-registration";
import ProgramModel from "@/models/program";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	LuArrowLeft,
	LuCalendar,
	LuClock5,
	LuMapPin,
	LuTag,
	LuUsers,
} from "react-icons/lu";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import DisplayArticle from "./components/article";
import ProgramGallery from "./components/gallery";
import RegisterEventForm from "./components/register-event-form";
import TimelineDisplay from "./components/timeline";

export async function generateMetadata({ params }) {
	await connectMongo();
	const { slug } = await params;

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

async function ProgramsDetailsPage({ params }) {
	await connectMongo();
	const { slug } = await params;
	const program = await ProgramModel.findOne({ slug });

	if (!program) {
		notFound();
	}

	const confirmedCount = await EventRegistrationModel.countDocuments({
		program: program._id,
		status: "confirmed",
	});

	return (
		<>
			<section className="px-6 sm:px-10 max-w-6xl mx-auto mt-5">
				<Link
					href="/programs"
					className="group inline-flex items-center gap-2 rounded-full border border-base-300/70 bg-base-200/80 px-4 py-2 text-sm font-medium text-neutral/80 shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:bg-base-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
					<LuArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
					Back to all events
				</Link>
				<div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mt-6 shadow-lg">
					<Image
						fill
						src={`${program.cover_image}`}
						alt={program.title}
						className="object-cover"
						sizes="(min-width: 1024px) 1024px, calc(100vw - 48px)"
						priority
					/>
					<div className="absolute inset-0 bg-linear-to-t from-neutral/70 via-neutral/20 to-transparent" />
					<div className="absolute bottom-6 left-6 right-6 text-base-100">
						<h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-md">
							{program.title}
						</h1>
					</div>
				</div>

				<div className="mt-8 gap-8">
					<div className="space-y-6 mb-10">
						<p className="text-lg text-neutral/80 leading-relaxed">
							{program.desc}
						</p>
						<div className="grid sm:grid-cols-2 gap-3 text-sm">
							<div className="flex items-center gap-3 bg-base-200 rounded-2xl px-4 py-3">
								<span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
									<LuCalendar className="w-4 h-4" />
								</span>
								<div>
									<div className="text-xs text-neutral/60">
										When
									</div>
									<div className="font-semibold">
										{DateTime.fromJSDate(
											program.start_date,
										).toLocaleString(DateTime.DATE_MED)}
										{program?.end_date ? (
											<>
												{" – "}
												{DateTime.fromJSDate(
													program.end_date,
												).toLocaleString(
													DateTime.DATE_MED,
												)}
											</>
										) : null}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3 bg-base-200 rounded-2xl px-4 py-3">
								<span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
									<LuClock5 className="w-4 h-4" />
								</span>
								<div>
									<div className="text-xs text-neutral/60">
										Time
									</div>
									<div className="font-semibold">
										{convertTo12HourFormat(
											program.start_time,
										)}
										{program?.end_time ? (
											<>
												{" – "}
												{convertTo12HourFormat(
													program.end_time,
												)}
											</>
										) : null}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3 bg-base-200 rounded-2xl px-4 py-3">
								<span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
									<LuMapPin className="w-4 h-4" />
								</span>
								<div>
									<div className="text-xs text-neutral/60">
										Where
									</div>
									<div className="font-semibold">
										{program.location}
									</div>
								</div>
							</div>
							{program.designation ? (
								<div className="flex items-center gap-3 bg-base-200 rounded-2xl px-4 py-3">
									<span className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
										<LuTag className="w-4 h-4" />
									</span>
									<div>
										<div className="text-xs text-neutral/60">
											Linked cause
										</div>
										<Link
											href="/support"
											className="font-semibold text-primary hover:underline">
											{program.designation}
										</Link>
									</div>
								</div>
							) : null}
						</div>

						{program.attendee_limit ? (
							<div className="flex items-center gap-3 bg-base-100 border border-base-300/60 rounded-2xl px-4 py-3 text-sm">
								<LuUsers className="w-5 h-5 text-primary" />
								<span>
									<strong>{confirmedCount}</strong> of{" "}
									<strong>{program.attendee_limit}</strong>{" "}
									places filled
								</span>
							</div>
						) : null}
					</div>
					<div>
						<RegisterEventForm
							programId={String(program._id)}
							programTitle={program.title}
							registrationsOpen={
								program.registrations_open !== false
							}
							attendeeLimit={program.attendee_limit ?? null}
							confirmedCount={confirmedCount}
						/>
					</div>
				</div>
			</section>

			<section className="px-6 sm:px-10 max-w-6xl mx-auto">
				<TimelineDisplay id={program._id} />
				<DisplayArticle id={program._id} />
				<ProgramGallery id={program._id} />
			</section>
		</>
	);
}

export default ProgramsDetailsPage;
