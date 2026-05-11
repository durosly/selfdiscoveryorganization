"use client";

import CascadeAnimation from "@/app/components/animations/cascade-animation";
import convertTo12HourFormat from "@/lib/formatTime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
	LuArrowLeft,
	LuArrowRight,
	LuCalendar,
	LuClock5,
	LuMapPin,
	LuSearch,
	LuUsers,
} from "react-icons/lu";

function ExistingPrograms({ initialData }) {
	const ref = useRef(null);
	const [status] = useState("all");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const fetchPrograms = async () => {
		const response = await axios(
			`/api/programs?page=${page}&status=${status}&q=${search}`,
		);

		if (response.data.status) {
			if (ref.current) {
				ref.current.scrollIntoView({ behavior: "smooth" });
			}
			return response.data.data;
		}
		throw new Error(response.data.message);
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["programs", { page, status, search }],
		queryFn: fetchPrograms,
		initialData,
		staleTime: 60_000,
	});

	// Avoid SSR/client branch on isPending when initialData is present; keeps grid HTML in sync for hydration.
	const displayData = data ?? initialData;
	const showLoadingGrid = isPending && !displayData?.docs?.length;

	function loadNew(newPage) {
		setPage(newPage);
	}

	function queryNewData(e) {
		e.preventDefault();
		setPage(1);
	}

	useEffect(() => {
		if (isError) {
			toast.error(error.message);
		}
	}, [isError, error]);

	return (
		<>
			<form
				ref={ref}
				className="my-6 max-w-xl mx-auto"
				onSubmit={queryNewData}>
				<div className="join w-full">
					<div className="join-item flex-1 input input-bordered flex items-center gap-2">
						<LuSearch className="w-4 h-4 text-neutral/50" />
						<input
							type="search"
							className="grow"
							placeholder="Search events…"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<button
						disabled={isPending}
						className="btn btn-primary join-item rounded-r-full">
						Search
					</button>
				</div>
			</form>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{showLoadingGrid
					? new Array(3).fill(0).map((_, i) => (
							<CascadeAnimation
								animationDirection="down"
								key={i}
								parentClassName="rounded-3xl border border-base-300/60 overflow-hidden bg-base-100">
								<div className="h-52 bg-base-200 animate-pulse" />
								<div className="p-6 space-y-3">
									<div className="h-5 bg-base-200 rounded animate-pulse w-3/4" />
									<div className="h-4 bg-base-200 rounded animate-pulse w-full" />
								</div>
							</CascadeAnimation>
						))
					: displayData && displayData?.docs?.length
						? displayData.docs.map((d) => (
								<Link
									href={`/programs/${d.slug}`}
									key={d._id}
									className="group rounded-3xl overflow-hidden bg-base-100 border border-base-300/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
									<div className="h-52 relative overflow-hidden">
										<Image
											fill
											src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${d.cover_image}`}
											alt={d.title}
											sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-content text-xs font-semibold rounded-full px-3 py-1 shadow">
											<LuCalendar className="w-3.5 h-3.5" />
											{DateTime.fromISO(d.start_date)
												.setLocale("en-GB")
												.toFormat("dd LLL yyyy")}
										</span>
										{d.attendee_limit ? (
											<span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-secondary text-secondary-content text-xs font-semibold rounded-full px-2 py-1 shadow">
												<LuUsers className="w-3 h-3" />
												{d.attendee_limit}
											</span>
										) : null}
									</div>
									<div className="p-6 flex-1 flex flex-col gap-3">
										<h3 className="font-bold text-xl text-neutral group-hover:text-primary transition-colors leading-snug">
											{d.title}
										</h3>
										<p className="text-sm text-neutral/70 line-clamp-3">
											{d.desc}
										</p>
										<div className="text-xs text-neutral/60 space-y-1 mt-2">
											<p className="inline-flex items-center gap-1">
												<LuClock5 className="w-3.5 h-3.5" />
												{convertTo12HourFormat(d.start_time)}
												{d?.end_time ? (
													<>
														{" – "}
														{convertTo12HourFormat(
															d.end_time,
														)}
													</>
												) : null}
											</p>
											<p className="inline-flex items-center gap-1">
												<LuMapPin className="w-3.5 h-3.5" />
												{d.location}
											</p>
										</div>
										<span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
											View event{" "}
											<LuArrowRight className="w-4 h-4" />
										</span>
									</div>
								</Link>
							))
						: null}
			</div>

			{!isPending && !displayData?.docs?.length ? (
				<div className="text-center text-neutral/60 py-10">
					No events to show right now. Please check back soon.
				</div>
			) : null}

			{displayData?.totalPages > 1 ? (
				<div className="flex flex-col items-center gap-3 mt-10">
					<div className="join">
						<button
							disabled={!displayData.hasPrevPage}
							onClick={() => loadNew(page - 1)}
							className="btn btn-sm btn-primary btn-outline join-item">
							<LuArrowLeft />
						</button>
						<button
							disabled={!displayData.hasNextPage}
							onClick={() => loadNew(page + 1)}
							className="btn btn-sm btn-primary btn-outline join-item">
							<LuArrowRight />
						</button>
					</div>
					<div className="text-sm text-neutral/60">
						Page {displayData.page} of {displayData.totalPages}
					</div>
				</div>
			) : null}
		</>
	);
}

export default ExistingPrograms;
