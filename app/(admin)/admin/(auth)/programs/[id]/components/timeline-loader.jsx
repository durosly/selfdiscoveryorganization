function TimelineLoading() {
	return (
		<div className="-my-6">
			{new Array(3).fill(4).map((_, i) => (
				<div
					key={i}
					className="relative pl-8 sm:pl-32 py-6 group"
				>
					{/* Purple label */}
					<div className="font-caveat font-medium text-xl text-primary mb-1 sm:mb-0 bg-slate-500 animate-pulse">
						&nbsp;
					</div>
					{/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
					<div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
						<time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 bg-slate-500 animate-pulse rounded-full">
							&nbsp;
						</time>
						<div className="text-md mt-3 bg-slate-500 animate-pulse">
							&nbsp;
						</div>
					</div>
					{/* Content */}
					<div className="bg-slate-500 animate-pulse h-20 text-sm">
						&nbsp;
					</div>
				</div>
			))}
		</div>
	);
}

export default TimelineLoading;
