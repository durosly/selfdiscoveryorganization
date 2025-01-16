"use client";

import convertTo12HourFormat from "@/lib/formatTime";
import axios from "axios";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	LuArrowLeft,
	LuArrowRight,
	LuCalendar,
	LuClock5,
	LuMapPin,
} from "react-icons/lu";

function ExistingPrograms() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");

	async function loadData(current) {
		setIsLoading(true);
		try {
			const response = await axios(
				`/api/programs?page=${current}&q=${search}`
			);

			if (response.data.status) {
				const { data: programData } = response.data;
				setData(programData);
				setPage(current);
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	function loadNew(newPage) {
		loadData(newPage);
	}

	function queryNewData(e) {
		e.preventDefault();

		loadNew(page);
	}

	useEffect(() => {
		loadData(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<form
				action="/find-event"
				className="my-5"
				onSubmit={queryNewData}
			>
				<div className="join join-vertical sm:join-horizontal">
					<input
						type="search"
						className="input input-bordered join-item rounded-l-md"
						placeholder="search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						disabled={isLoading}
						className="btn join-item rounded-r-md"
					>
						Search
					</button>
				</div>
			</form>

			<div className="flex flex-col md:flex-row flex-wrap gap-5">
				{isLoading ? (
					new Array(3).fill(4).map((_, i) => (
						<div
							key={i}
							className="sm:w-[calc(50%-1.25rem)] flex flex-col sm:flex-row gap-3 border p-3 sm:p-5 rounded-2xl"
						>
							<div className="relative h-32 aspect-video sm:aspect-square rounded-xl overflow-hidden animate-pulse bg-slate-400"></div>
							<div className="flex-1">
								<h2 className="text-xl font-bold bg-slate-400 rounded-md animate-pulse">
									&nbsp;
								</h2>
								<p className="bg-slate-400 text-sm animate-pulse rounded-md mt-5">
									&nbsp;
								</p>

								<div className="text-right mt-5">
									<button className="btn btn-sm w-[150px] bg-slate-400 animate-pulse">
										&nbsp;
									</button>
								</div>
							</div>
						</div>
					))
				) : data && data?.docs?.length && data.docs.length > 0 ? (
					data.docs.map((d) => (
						<div
							key={d._id}
							className="md:w-[calc(50%-1.25rem)] flex flex-col sm:flex-row gap-3 border p-3 sm:p-5 rounded-2xl"
						>
							<div className="relative h-32 aspect-video sm:aspect-square rounded-xl overflow-hidden">
								<Image
									fill
									src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${d.cover_image}`}
									alt={d.title}
									sizes="100vw"
									className="object-cover"
								/>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl font-bold">
									{d.title}
								</h2>
								<p className="line-clamp">{d.desc}</p>
								<div className="mt-5 text-sm">
									<div>
										<p className="flex items-center gap-2 ">
											<LuCalendar className="inline-block" />{" "}
											{DateTime.fromISO(
												d.start_date
											).toLocaleString(
												DateTime.DATE_MED
											)}{" "}
											{!!d?.end_date && (
												<>
													-{" "}
													{DateTime.fromISO(
														d.end_date
													).toLocaleString(
														DateTime.DATE_MED
													)}
												</>
											)}
										</p>
									</div>
									<div>
										<p className="flex items-center gap-2 ">
											<LuClock5 className="inline-block" />{" "}
											{convertTo12HourFormat(
												d.start_time
											)}{" "}
											{!!d?.end_time && (
												<>
													-{" "}
													{convertTo12HourFormat(
														d.end_time
													)}
												</>
											)}
										</p>
									</div>
									<div>
										<p className="flex items-center gap-2 ">
											<LuMapPin className="inline-block" />{" "}
											{d.location}
										</p>
									</div>
								</div>

								<div className="text-right">
									<Link
										href={`/programs/${d.slug}`}
										className="btn btn-sm btn-primary"
									>
										View Event
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					<div>Nothing to see here </div>
				)}
			</div>

			<div className="flex gap-2 my-4">
				<button
					disabled={!data.hasPrevPage}
					onClick={() => loadNew(page - 1)}
					className="btn btn-sm btn-primary btn-outline"
				>
					<LuArrowLeft />
				</button>
				<button
					disabled={!data.hasNextPage}
					onClick={() => loadNew(page + 1)}
					className="btn btn-sm btn-primary btn-outline"
				>
					<LuArrowRight />
				</button>
			</div>
			<div className="flex justify-center ">
				Page {data.page} of {data.totalPages}
			</div>
		</>
	);
}

export default ExistingPrograms;
