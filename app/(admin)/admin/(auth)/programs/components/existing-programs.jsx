"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

function ExistingPrograms({ initialData }) {
	const [status, setStatus] = useState("all");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const fetchPrograms = async () => {
		const response = await axios(
			`/api/admin/programs?page=${page}&status=${status}&q=${search}`
		);

		if (response.data.status) {
			return response.data.data;
		} else {
			throw new Error(response.data.message);
		}
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["programs", { page, status, search }],
		queryFn: fetchPrograms,
		initialData,
	});

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
			<form action="/find-event" className="my-5" onSubmit={queryNewData}>
				<div className="join join-vertical sm:join-horizontal">
					<select
						className="select select-bordered join-item flex-1"
						name="status"
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}>
						<option value="all">All</option>
						<option value="publish">Published</option>
						<option value="unpublished">Unpublished</option>
					</select>
					<input
						type="search"
						className="input input-bordered join-item rounded-l-md"
						placeholder="search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						disabled={isPending}
						className="btn join-item rounded-r-md">
						Search
					</button>
				</div>
			</form>

			<div className="flex flex-col gap-5">
				{isPending ? (
					new Array(3).fill(4).map((_, i) => (
						<div
							key={i}
							className=" flex flex-col sm:flex-row gap-3 border p-3 sm:p-5 rounded-2xl">
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
							className=" flex flex-col sm:flex-row gap-3 border p-3 sm:p-5 rounded-2xl">
							<div className="relative h-32 aspect-video sm:aspect-square rounded-xl overflow-hidden">
								<Image
									fill
									src={`${d.cover_image}`}
									alt={d.title}
									sizes="(min-width: 640px) 171px, calc(100vw - 66px)"
									className="object-cover"
								/>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl font-bold">
									{d.title}
								</h2>
								<p className="line-clamp">
									{d.desc}
								</p>
								<span
									className={`badge ${
										d.status ===
										"publish"
											? "badge-success"
											: d.status ===
											  "unpublished"
											? "badge-warning"
											: "badge-error"
									}`}>
									{d.status}
								</span>

								<div className="text-right">
									<Link
										href={`/admin/programs/${d._id}`}
										className="btn btn-sm btn-primary">
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
			{isPending ? null : (
				<>
					<div className="flex gap-2 my-4">
						<button
							disabled={!data.hasPrevPage}
							onClick={() => loadNew(page - 1)}
							className="btn btn-sm btn-primary btn-outline">
							<LuArrowLeft />
						</button>
						<button
							disabled={!data.hasNextPage}
							onClick={() => loadNew(page + 1)}
							className="btn btn-sm btn-primary btn-outline">
							<LuArrowRight />
						</button>
					</div>
					<div className="flex justify-center ">
						Page {data.page} of {data.totalPages}
					</div>
				</>
			)}
		</>
	);
}

export default ExistingPrograms;
