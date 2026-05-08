"use client";

import { handleError } from "@/lib/handleError";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
	LuArrowLeft,
	LuArrowRight,
	LuDownload,
	LuRepeat2,
} from "react-icons/lu";

const DESIGNATIONS = [
	"Families and Prisoners Initiative",
	"Self Discovery Conference",
	"Menstrual Hygiene Day",
	"Debate and Quiz Competition",
	"International Day of the Boy Child",
	"Send a Child to School Scheme",
	"General Fund",
];

function toCsv(rows) {
	const header = [
		"Date",
		"Donor",
		"Email",
		"Amount",
		"Currency",
		"Designation",
		"Recurring",
		"Status",
		"Provider",
		"Order/Subscription ID",
	];
	const escape = (val) => {
		if (val === null || val === undefined) return "";
		const s = String(val);
		if (s.includes(",") || s.includes('"') || s.includes("\n")) {
			return `"${s.replace(/"/g, '""')}"`;
		}
		return s;
	};
	const lines = rows.map((r) =>
		[
			DateTime.fromISO(r.createdAt).toISO(),
			r.donorName ?? "",
			r.donorEmail ?? "",
			r.amount,
			r.currency,
			r.designation,
			r.recurring ? "yes" : "no",
			r.status,
			r.provider,
			r.providerOrderId ?? r.providerSubscriptionId ?? "",
		]
			.map(escape)
			.join(","),
	);
	return [header.join(","), ...lines].join("\n");
}

function DonationsTable() {
	const [page, setPage] = useState(1);
	const [designation, setDesignation] = useState("");
	const [recurring, setRecurring] = useState("");
	const [status, setStatus] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");

	const params = useMemo(() => {
		const usp = new URLSearchParams();
		usp.set("page", String(page));
		if (designation) usp.set("designation", designation);
		if (recurring) usp.set("recurring", recurring);
		if (status) usp.set("status", status);
		if (from) usp.set("from", from);
		if (to) usp.set("to", to);
		return usp.toString();
	}, [page, designation, recurring, status, from, to]);

	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ["donations", params],
		queryFn: async () => {
			const res = await axios(`/api/donations?${params}`);
			if (!res.data?.status) throw new Error(res.data?.message);
			return res.data;
		},
	});

	useEffect(() => {
		if (isError) toast.error(handleError(error));
	}, [isError, error]);

	function downloadCsv() {
		if (!data?.data?.docs?.length) {
			toast.error("Nothing to export on the current page.");
			return;
		}
		const csv = toCsv(data.data.docs);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `donations-${DateTime.now().toFormat("yyyy-LL-dd-HHmm")}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	}

	const totals = data?.totals;

	return (
		<div className="space-y-5">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="rounded-2xl bg-base-200 p-5">
					<div className="text-xs uppercase text-neutral/60">
						Filtered total
					</div>
					<div className="text-3xl font-extrabold">
						£{(totals?.total ?? 0).toFixed(2)}
					</div>
				</div>
				<div className="rounded-2xl bg-base-200 p-5">
					<div className="text-xs uppercase text-neutral/60">
						Donations
					</div>
					<div className="text-3xl font-extrabold">
						{totals?.count ?? 0}
					</div>
				</div>
				<div className="rounded-2xl bg-base-200 p-5 flex items-center justify-between">
					<div>
						<div className="text-xs uppercase text-neutral/60">
							Export
						</div>
						<div className="text-sm">
							Download current page as CSV
						</div>
					</div>
					<button
						type="button"
						onClick={downloadCsv}
						className="btn btn-sm btn-primary">
						<LuDownload className="w-4 h-4" /> CSV
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-5 gap-3">
				<select
					className="select select-bordered select-sm"
					value={designation}
					onChange={(e) => {
						setPage(1);
						setDesignation(e.target.value);
					}}>
					<option value="">All designations</option>
					{DESIGNATIONS.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
				<select
					className="select select-bordered select-sm"
					value={recurring}
					onChange={(e) => {
						setPage(1);
						setRecurring(e.target.value);
					}}>
					<option value="">One-time + recurring</option>
					<option value="false">One-time only</option>
					<option value="true">Recurring only</option>
				</select>
				<select
					className="select select-bordered select-sm"
					value={status}
					onChange={(e) => {
						setPage(1);
						setStatus(e.target.value);
					}}>
					<option value="">Any status</option>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
					<option value="failed">Failed</option>
					<option value="refunded">Refunded</option>
				</select>
				<input
					type="date"
					className="input input-bordered input-sm"
					value={from}
					aria-label="From date"
					onChange={(e) => {
						setPage(1);
						setFrom(e.target.value);
					}}
				/>
				<input
					type="date"
					className="input input-bordered input-sm"
					value={to}
					aria-label="To date"
					onChange={(e) => {
						setPage(1);
						setTo(e.target.value);
					}}
				/>
			</div>

			<div className="overflow-x-auto rounded-2xl border border-base-300/60">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Date</th>
							<th>Donor</th>
							<th>Amount</th>
							<th>Designation</th>
							<th>Type</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{isPending ? (
							<tr>
								<td colSpan={6} className="text-center py-10">
									Loading…
								</td>
							</tr>
						) : data?.data?.docs?.length ? (
							data.data.docs.map((d) => (
								<tr key={d._id}>
									<td className="text-xs">
										{DateTime.fromISO(d.createdAt).toFormat(
											"dd LLL yyyy, HH:mm",
										)}
									</td>
									<td>
										<div className="font-semibold">
											{d.donorName || "Anonymous"}
										</div>
										<div className="text-xs text-neutral/60">
											{d.donorEmail}
										</div>
									</td>
									<td className="font-mono">
										{d.currency} {d.amount.toFixed(2)}
									</td>
									<td>{d.designation}</td>
									<td>
										{d.recurring ? (
											<span className="badge badge-secondary gap-1">
												<LuRepeat2 className="w-3 h-3" />
												Monthly
											</span>
										) : (
											<span className="badge badge-ghost">
												One-time
											</span>
										)}
									</td>
									<td>
										<span
											className={`badge ${
												d.status === "completed"
													? "badge-success"
													: d.status === "pending"
														? "badge-warning"
														: d.status === "refunded"
															? "badge-info"
															: "badge-error"
											}`}>
											{d.status}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="text-center py-10">
									No donations match these filters yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{data?.data ? (
				<div className="flex items-center justify-between">
					<div className="text-sm">
						Page {data.data.page} of {data.data.totalPages}{" "}
						<span className="text-neutral/60">
							({data.data.totalDocs} total)
						</span>
					</div>
					<div className="join">
						<button
							className="btn btn-sm btn-outline join-item"
							disabled={!data.data.hasPrevPage}
							onClick={() => setPage((p) => Math.max(1, p - 1))}>
							<LuArrowLeft className="w-4 h-4" />
						</button>
						<button
							className="btn btn-sm btn-outline join-item"
							disabled={!data.data.hasNextPage}
							onClick={() => setPage((p) => p + 1)}>
							<LuArrowRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default DonationsTable;
