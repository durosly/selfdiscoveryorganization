import CascadeAnimation from "@/app/components/animations/cascade-animation";
import SectionHeading from "@/app/components/ui/section-heading";
import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import {
	LuArrowRight,
	LuCalendarDays,
	LuMapPin,
	LuNewspaper,
} from "react-icons/lu";

async function ProgramListSummary() {
	await connectMongo();
	const programs = await ProgramModel.find(
		{ status: "publish" },
		"_id desc title cover_image slug start_date location",
	)
		.sort({ createdAt: -1 })
		.limit(6);

	if (!programs || programs.length === 0) {
		return null;
	}

	return (
		<section
			aria-labelledby="latest-events"
			className="px-6 sm:px-10 max-w-7xl mx-auto">
			<SectionHeading
				eyebrow="Latest News & Events"
				title="Join our upcoming events"
				subtitle="Explore programmes you can attend, support, or volunteer with."
				eyebrowIcon={LuNewspaper}
			/>

			<CascadeAnimation
				animationDirection="down"
				animationDelay={0.4}
				threshold={0.1}
				parentClassName="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{programs.map((program) => (
					<Link
						key={program._id}
						href={`/programs/${program.slug}`}
						className="group rounded-3xl overflow-hidden bg-base-100 border border-base-300/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
						<div className="h-52 relative overflow-hidden">
							<Image
								fill
								src={program.cover_image}
								alt={program.title}
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							/>
							<span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-content text-xs font-semibold rounded-full px-3 py-1 shadow">
								<LuCalendarDays className="w-3.5 h-3.5" />
								{DateTime.fromJSDate(
									program.start_date,
								).toFormat("dd LLL yyyy")}
							</span>
						</div>
						<div className="p-6 flex-1 flex flex-col gap-3">
							{program.location ? (
								<p className="text-xs uppercase tracking-wider text-neutral/60 inline-flex items-center gap-1">
									<LuMapPin className="w-3.5 h-3.5" />
									{program.location}
								</p>
							) : null}
							<h3 className="font-bold text-xl text-neutral group-hover:text-primary transition-colors leading-snug">
								{program.title}
							</h3>
							<p className="text-sm text-neutral/70 line-clamp-3">
								{program.desc}
							</p>
							<span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
								Read more <LuArrowRight className="w-4 h-4" />
							</span>
						</div>
					</Link>
				))}
			</CascadeAnimation>

			<div className="text-center mt-10">
				<Link
					href="/programs"
					className="btn btn-outline btn-primary rounded-full px-6">
					View all events <LuArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</section>
	);
}

export default ProgramListSummary;
