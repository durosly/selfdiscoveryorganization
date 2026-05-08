import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

function CoverImage({ title, image = "/images/fapi.jpg", subtitle, breadcrumbs }) {
	const crumbs = breadcrumbs ?? [
		{ label: "Home", href: "/" },
		{ label: title },
	];
	return (
		<section
			className="px-6 sm:px-12 h-72 sm:h-80 relative bg-center bg-no-repeat bg-cover flex items-end overflow-hidden"
			style={{
				backgroundImage: `linear-gradient(to right, rgba(31, 41, 51, 0.75), rgba(31, 41, 51, 0.35)), url(${image})`,
			}}>
			<div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

			<div className="relative w-full max-w-7xl mx-auto pb-10 text-base-100">
				<h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold capitalize drop-shadow-md">
					{title}
				</h1>
				{subtitle ? (
					<p className="mt-3 max-w-2xl text-base sm:text-lg opacity-90">
						{subtitle}
					</p>
				) : null}
				<nav
					aria-label="Breadcrumb"
					className="mt-4 flex flex-wrap items-center gap-1 text-sm text-base-100/80">
					{crumbs.map((crumb, idx) => (
						<span
							key={`${crumb.label}-${idx}`}
							className="inline-flex items-center gap-1">
							{crumb.href ? (
								<Link
									href={crumb.href}
									className="hover:text-primary transition-colors">
									{crumb.label}
								</Link>
							) : (
								<span className="text-primary capitalize font-medium">
									{crumb.label}
								</span>
							)}
							{idx < crumbs.length - 1 ? (
								<LuChevronRight className="w-3 h-3" />
							) : null}
						</span>
					))}
				</nav>
			</div>
		</section>
	);
}

export default CoverImage;
