import { cn } from "@/lib/utils";

function SectionHeading({
	eyebrow,
	title,
	subtitle,
	align = "center",
	className,
	titleClassName,
	subtitleClassName,
	eyebrowIcon: EyebrowIcon,
}) {
	const alignment = {
		center: "text-center mx-auto items-center",
		left: "text-left items-start",
		right: "text-right items-end ml-auto",
	}[align];

	return (
		<div
			className={cn(
				"flex flex-col gap-3 max-w-3xl",
				alignment,
				className,
			)}>
			{eyebrow ? (
				<span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-secondary">
					{EyebrowIcon ? (
						<EyebrowIcon className="w-4 h-4" />
					) : (
						<span className="inline-block h-px w-8 bg-secondary" />
					)}
					{eyebrow}
				</span>
			) : null}
			{title ? (
				<h2
					className={cn(
						"font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral leading-tight",
						titleClassName,
					)}>
					{title}
				</h2>
			) : null}
			{subtitle ? (
				<p
					className={cn(
						"text-base sm:text-lg text-neutral/70",
						subtitleClassName,
					)}>
					{subtitle}
				</p>
			) : null}
		</div>
	);
}

export default SectionHeading;
