"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AcceptInviteForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [busy, setBusy] = useState(false);

	async function submit(e) {
		e.preventDefault();
		if (!token) {
			toast.error("Missing invitation token.");
			return;
		}
		if (password !== password2) {
			toast.error("Passwords do not match.");
			return;
		}
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters.");
			return;
		}
		setBusy(true);
		const toastId = toast.loading("Creating your account…");
		try {
			const res = await axios.post("/api/invites/accept", {
				token,
				password,
				name: name.trim() || undefined,
			});
			if (!res.data?.status) throw new Error(res.data?.message);
			toast.success(res.data.message || "Success", { id: toastId });
			router.push("/login");
		} catch (err) {
			toast.error(handleError(err), { id: toastId });
		} finally {
			setBusy(false);
		}
	}

	if (!token) {
		return (
			<div className="rounded-2xl border border-error/40 bg-base-200 p-6 text-center max-w-md mx-auto">
				<p className="text-sm">
					This link is invalid or incomplete. Open the invitation link from your email.
				</p>
				<Link href="/" className="btn btn-sm btn-ghost mt-4">
					Home
				</Link>
			</div>
		);
	}

	return (
		<form
			onSubmit={submit}
			className="max-w-md mx-auto space-y-4 rounded-2xl border border-base-300/60 bg-base-100 p-8 shadow-sm">
			<h1 className="text-xl font-bold text-center">Accept invitation</h1>
			<p className="text-sm text-neutral/70 text-center">
				Choose your name and password for the admin site.
			</p>
			<label className="form-control w-full">
				<span className="label-text text-sm">Your name</span>
				<input
					className="input input-bordered w-full"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoComplete="name"
					placeholder="Optional"
				/>
			</label>
			<label className="form-control w-full">
				<span className="label-text text-sm">Password</span>
				<input
					type="password"
					className="input input-bordered w-full"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="new-password"
					required
					minLength={8}
				/>
			</label>
			<label className="form-control w-full">
				<span className="label-text text-sm">Confirm password</span>
				<input
					type="password"
					className="input input-bordered w-full"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
					autoComplete="new-password"
					required
					minLength={8}
				/>
			</label>
			<button type="submit" className="btn btn-primary w-full" disabled={busy}>
				{busy ? "Please wait…" : "Activate account"}
			</button>
			<p className="text-xs text-center text-neutral/60">
				Already have an account?{" "}
				<Link href="/login" className="link">
					Sign in
				</Link>
			</p>
		</form>
	);
}
