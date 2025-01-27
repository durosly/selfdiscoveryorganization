import CascadeAnimation from "@/app/components/animations/cascade-animation";
import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";
import Image from "next/image";
import Link from "next/link";
import { LuCalendarDays, LuMoveRight, LuNewspaper } from "react-icons/lu";
import { DateTime } from "luxon";

async function ProgramListSummary() {
	await connectMongo();
	const programs = await ProgramModel.find(
		{ status: "publish" },
		"_id desc title cover_image slug start_date"
	)
		.sort({ createdAt: -1 })
		.limit(6);

	if (!programs || programs.length === 0) {
		return null;
	}

	return (
		<div className="px-10">
			<CascadeAnimation animationDirection="up">
				<h2 className="text-xl">
					<LuNewspaper className="inline-block stroke-indigo-700" />{" "}
					Latest Blog
				</h2>
				<p className="text-4xl font-bold">
					Latest news, articles and events
				</p>
			</CascadeAnimation>

			<CascadeAnimation
				animationDirection="down"
				animationDelay={0.5}
				threshold={0.1}
				parentClassName="flex flex-col sm:flex-row gap-5 flex-wrap mt-10">
				<>
					{programs.map((program) => (
						<Link
							key={program._id}
							href={`/programs/${program.slug}`}
							className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
							<div className="h-32 relative rounded-xl overflow-hidden">
								<Image
									fill
									src={program.cover_image}
									alt={program.title}
									className="object-cover brightness-90"
									sizes="(min-width: 820px) calc(33.35vw - 64px), (min-width: 640px) calc(6.88vw + 148px), calc(100vw - 104px)"
								/>
							</div>
							<div className=" space-y-2 mt-5">
								<p className="text-slate-500 flex gap-2 items-center">
									<LuCalendarDays className="inline-block stroke-current" />{" "}
									{DateTime.fromJSDate(
										program.start_date
									).toFormat("dd/LLL/yyyy")}
								</p>
								<h2 className="font-semibold text-2xl">
									{program.title}
								</h2>
								<p className="clamp-3">
									{program.desc}
								</p>
							</div>
						</Link>
					))}
				</>
			</CascadeAnimation>

			<div className="text-right mt-5">
				<Link href="/programs" className="link link-hover">
					Read more <LuMoveRight className="inline stroke-primary" />
				</Link>
			</div>
		</div>
	);
}

export default ProgramListSummary;
