import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

function CauseCard({
	title,
	description,
	imageSrc,
	imageAlt = "",
	href,
	tag,
	icon: Icon,
	progress,
	raised,
	goal,
	className,
}) {
	return (
		<article
			className={cn(
				"group flex flex-col rounded-3xl overflow-hidden bg-base-100 border border-base-300/60 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1",
				className,
			)}>
			{imageSrc ? (
				<div className="relative h-52 overflow-hidden">
					<Image
						src={imageSrc}
						alt={imageAlt || title || ""}
						fill
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					{tag ? (
						<span className="absolute top-4 left-4 badge badge-primary rounded-full font-semibold">
							{tag}
						</span>
					) : null}
					{Icon ? (
						<div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg">
							<Icon className="w-6 h-6" />
						</div>
					) : null}
				</div>
			) : null}

			<div className="flex flex-col gap-3 p-6 grow">
				{title ? (
					<h3 className="text-xl font-bold text-neutral leading-snug group-hover:text-primary transition-colors">
						{title}
					</h3>
				) : null}
				{description ? (
					<p className="text-sm text-neutral/70 line-clamp-3">
						{description}
					</p>
				) : null}

				{typeof progress === "number" ? (
					<div className="mt-2 space-y-1">
						<progress
							className="progress progress-primary w-full"
							value={progress}
							max={100}
						/>
						<div className="flex justify-between text-xs text-neutral/70">
							<span>
								Raised: <strong>{raised}</strong>
							</span>
							<span>
								Goal: <strong>{goal}</strong>
							</span>
						</div>
					</div>
				) : null}

				{href ? (
					<Link
						href={href}
						className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
						Learn more <LuArrowRight className="w-4 h-4" />
					</Link>
				) : null}
			</div>
		</article>
	);
}

export default CauseCard;
