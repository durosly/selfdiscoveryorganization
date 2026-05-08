"use client";

import { handleError } from "@/lib/handleError";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuDownload } from "react-icons/lu";

function toCsv(rows, programTitle) {
	const header = ["Name", "Email", "Phone", "Status", "Notes", "Registered at"];
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
			r.name,
			r.email,
			r.phone || "",
			r.status,
			r.notes || "",
			DateTime.fromISO(r.createdAt).toISO(),
		]
			.map(escape)
			.join(","),
	);
	return [`# ${programTitle}`, header.join(","), ...lines].join("\n");
}

function AttendeesTable({ programId, programTitle, attendeeLimit }) {
	const [statusFilter, setStatusFilter] = useState("");
	const [page, setPage] = useState(1);

	const url = `/api/programs/${programId}/registrations?page=${page}${statusFilter ? `&status=${statusFilter}` : ""}`;

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["registrations", programId, statusFilter, page],
		queryFn: async () => {
			const res = await axios(url);
			if (!res.data?.status) throw new Error(res.data?.message);
			return res.data;
		},
	});

	useEffect(() => {
		if (isError) toast.error(handleError(error));
	}, [isError, error]);

	function downloadCsv() {
		if (!data?.data?.docs?.length) {
			toast.error("Nothing to export.");
			return;
		}
		const csv = toCsv(data.data.docs, programTitle);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = `${programTitle.replace(/\s+/g, "-").toLowerCase()}-attendees.csv`;
		a.click();
		URL.revokeObjectURL(a.href);
	}

	const summary = data?.summary || { confirmed: 0, waitlisted: 0, cancelled: 0 };

	return (
		<div className="space-y-5">
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<div className="rounded-2xl bg-base-200 p-5">
					<div className="text-xs uppercase text-neutral/60">
						Confirmed
					</div>
					<div className="text-2xl font-extrabold">
						{summary.confirmed}
						{attendeeLimit ? (
							<span className="text-sm font-normal text-neutral/60">
								{" "}
								/ {attendeeLimit}
							</span>
						) : null}
					</div>
				</div>
				<div className="rounded-2xl bg-base-200 p-5">
					<div className="text-xs uppercase text-neutral/60">
						Waitlisted
					</div>
					<div className="text-2xl font-extrabold">
						{summary.waitlisted}
					</div>
				</div>
				<div className="rounded-2xl bg-base-200 p-5">
					<div className="text-xs uppercase text-neutral/60">
						Cancelled
					</div>
					<div className="text-2xl font-extrabold">
						{summary.cancelled}
					</div>
				</div>
				<div className="rounded-2xl bg-base-200 p-5 flex items-center justify-between">
					<div className="text-sm">Export</div>
					<button
						type="button"
						onClick={downloadCsv}
						className="btn btn-sm btn-primary">
						<LuDownload className="w-4 h-4" /> CSV
					</button>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<select
					className="select select-bordered select-sm"
					value={statusFilter}
					onChange={(e) => {
						setPage(1);
						setStatusFilter(e.target.value);
					}}>
					<option value="">All statuses</option>
					<option value="confirmed">Confirmed</option>
					<option value="waitlisted">Waitlisted</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div>

			<div className="overflow-x-auto rounded-2xl border border-base-300/60">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Status</th>
							<th>Notes</th>
							<th>Registered</th>
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
							data.data.docs.map((r) => (
								<tr key={r._id}>
									<td className="font-semibold">{r.name}</td>
									<td className="text-xs">{r.email}</td>
									<td className="text-xs">
										{r.phone || "—"}
									</td>
									<td>
										<span
											className={`badge ${
												r.status === "confirmed"
													? "badge-success"
													: r.status === "waitlisted"
														? "badge-warning"
														: "badge-error"
											}`}>
											{r.status}
										</span>
									</td>
									<td className="text-xs max-w-xs truncate">
										{r.notes || "—"}
									</td>
									<td className="text-xs">
										{DateTime.fromISO(r.createdAt).toFormat(
											"dd LLL yyyy, HH:mm",
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="text-center py-10">
									No attendees yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AttendeesTable;
