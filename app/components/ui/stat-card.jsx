import { cn } from "@/lib/utils";
import StatCounter from "./stat-counter";

function StatCard({
	value,
	suffix = "",
	prefix = "",
	label,
	icon: Icon,
	iconClassName,
	className,
	duration,
}) {
	return (
		<div
			className={cn(
				"flex items-center gap-4 p-6 rounded-2xl bg-base-100 border border-base-300/60 shadow-sm hover:shadow-lg transition-shadow",
				className,
			)}>
			{Icon ? (
				<div
					className={cn(
						"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0",
						iconClassName,
					)}>
					<Icon className="w-7 h-7" />
				</div>
			) : null}
			<div className="flex flex-col">
				<span className="text-3xl sm:text-4xl font-extrabold text-current">
					{prefix}
					<StatCounter value={value} duration={duration} />
					{suffix}
				</span>
				<span className="text-sm opacity-70 mt-1">{label}</span>
			</div>
		</div>
	);
}

export default StatCard;
