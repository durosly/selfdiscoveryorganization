"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Html5QrcodeScanner } from "html5-qrcode";
import { LuScanLine, LuSearch } from "react-icons/lu";

function parseScanText(text) {
	const trimmed = text.trim();
	try {
		const u = new URL(trimmed);
		const code = u.searchParams.get("code");
		const sig = u.searchParams.get("sig") || "";
		if (code) return { code: code.toUpperCase(), sig };
	} catch {
		/* plain code */
	}
	return { code: trimmed.toUpperCase(), sig: "" };
}

export default function CheckInPanel({ programId }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [q, setQ] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [scannerOn, setScannerOn] = useState(false);
	const autoHandled = useRef(false);
	const searchAbort = useRef(0);

	const runSearch = useCallback(async () => {
		const query = q.trim();
		const myId = ++searchAbort.current;
		if (!query) {
			setResults([]);
			return;
		}
		setLoading(true);
		try {
			const res = await axios.get(
				`/api/admin/programs/${programId}/check-in?q=${encodeURIComponent(query)}`,
			);
			if (myId !== searchAbort.current) return;
			if (!res.data?.status) throw new Error(res.data?.message);
			setResults(res.data.data || []);
		} catch (e) {
			if (myId === searchAbort.current) {
				toast.error(handleError(e));
				setResults([]);
			}
		} finally {
			if (myId === searchAbort.current) setLoading(false);
		}
	}, [q, programId]);

	useEffect(() => {
		const t = setTimeout(runSearch, 320);
		return () => clearTimeout(t);
	}, [runSearch]);

	const postCheckIn = useCallback(
		async ({ registrationId, ticketCode, sig = "" }) => {
			const toastId = toast.loading("Checking in…");
			try {
				const res = await axios.post(
					`/api/admin/programs/${programId}/check-in`,
					{
						...(registrationId
							? { registrationId: String(registrationId) }
							: {}),
						...(ticketCode ? { ticketCode, sig } : {}),
					},
				);
				if (!res.data?.status) throw new Error(res.data?.message);
				toast.success(res.data.message || "Checked in", { id: toastId });
				await runSearch();
				router.refresh();
			} catch (e) {
				const msg = handleError(e);
				if (e.response?.status === 409) {
					toast(msg, { id: toastId, icon: "ℹ️" });
				} else {
					toast.error(msg, { id: toastId });
				}
			}
		},
		[programId, router, runSearch],
	);

	useEffect(() => {
		const code = searchParams.get("code");
		const sig = searchParams.get("sig") || "";
		if (!code || autoHandled.current) return;
		autoHandled.current = true;
		const run = async () => {
			const toastId = toast.loading("Checking in…");
			try {
				const res = await axios.post(
					`/api/admin/programs/${programId}/check-in`,
					{
						ticketCode: code.toUpperCase(),
						sig,
					},
				);
				if (!res.data?.status) throw new Error(res.data?.message);
				toast.success(res.data.message || "Checked in", { id: toastId });
				await runSearch();
				router.refresh();
			} catch (e) {
				const msg = handleError(e);
				if (e.response?.status === 409) {
					toast(msg, { id: toastId, icon: "ℹ️" });
				} else {
					toast.error(msg, { id: toastId });
				}
			}
		};
		void run();
		// eslint-disable-next-line react-hooks/exhaustive-deps -- run once per deep-link
	}, [searchParams, programId]);

	useEffect(() => {
		if (!scannerOn) return;

		const scanner = new Html5QrcodeScanner(
			`qr-reader-${programId}`,
			{ fps: 8, qrbox: { width: 240, height: 240 } },
			false,
		);

		scanner.render(
			(decoded) => {
				const parsed = parseScanText(decoded);
				void postCheckIn({
					ticketCode: parsed.code,
					sig: parsed.sig,
				});
			},
			() => {},
		);

		return () => {
			scanner.clear().catch(() => {});
		};
	}, [scannerOn, programId, postCheckIn]);

	return (
		<div className="space-y-6 max-w-lg mx-auto">
			<div className="flex gap-2">
				<label className="input input-bordered flex-1 flex items-center gap-2">
					<LuSearch className="opacity-50 w-4 h-4" />
					<input
						type="search"
						className="grow"
						placeholder="Name, email, or ticket code"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						autoComplete="off"
					/>
				</label>
			</div>

			<div>
				<button
					type="button"
					className="btn btn-outline btn-sm gap-2"
					onClick={() => setScannerOn((v) => !v)}>
					<LuScanLine className="w-4 h-4" />
					{scannerOn ? "Stop camera" : "Scan QR code"}
				</button>
				{scannerOn ? (
					<div
						id={`qr-reader-${programId}`}
						className="mt-3 rounded-xl overflow-hidden border border-base-300"
					/>
				) : null}
			</div>

			<div className="rounded-2xl border border-base-300/60 divide-y">
				{loading ? (
					<p className="p-4 text-sm text-neutral/60">Searching…</p>
				) : results.length === 0 && q.trim() ? (
					<p className="p-4 text-sm text-neutral/60">No matches.</p>
				) : results.length === 0 ? (
					<p className="p-4 text-sm text-neutral/60">
						Type to search attendees, or use the camera to scan a ticket QR.
					</p>
				) : (
					results.map((r) => (
						<div
							key={r._id}
							className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<div className="font-semibold">{r.name}</div>
								<div className="text-xs text-neutral/70">{r.email}</div>
								<div className="text-xs font-mono mt-1">
									{r.ticketCode}
								</div>
								{r.checkedInAt ? (
									<div className="badge badge-success badge-sm mt-2">
										Checked in
									</div>
								) : (
									<div className="badge badge-ghost badge-sm mt-2">
										{r.status}
									</div>
								)}
							</div>
							<div className="flex gap-2">
								{r.checkedInAt ? (
									<span className="text-xs text-neutral/60 self-center">
										{new Date(r.checkedInAt).toLocaleString()}
									</span>
								) : (
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() =>
											void postCheckIn({
												registrationId: r._id,
												ticketCode: r.ticketCode,
											})
										}>
										Check in
									</button>
								)}
							</div>
						</div>
					))
				)}
			</div>

			<p className="text-xs text-neutral/60 text-center">
				Only <strong>confirmed</strong> registrations can be checked in.{" "}
				<Link href={`/admin/programs/${programId}/attendees`} className="link">
					Full attendee list
				</Link>
			</p>
		</div>
	);
}
