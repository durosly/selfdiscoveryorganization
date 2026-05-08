"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
	LuCalendarCheck,
	LuLoader,
	LuShieldCheck,
	LuUserPlus,
} from "react-icons/lu";

function RegisterEventForm({
	programId,
	programTitle,
	registrationsOpen = true,
	attendeeLimit = null,
	confirmedCount = 0,
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [notes, setNotes] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(null);

	const remaining =
		attendeeLimit && attendeeLimit > 0
			? Math.max(attendeeLimit - confirmedCount, 0)
			: null;
	const isFull = remaining === 0;
	const closed = registrationsOpen === false;

	async function submit(e) {
		e.preventDefault();
		if (submitting) return;
		setSubmitting(true);
		const toastId = toast.loading("Sending your registration…");
		try {
			const res = await axios.post(
				`/api/programs/${programId}/register`,
				{
					name: name.trim(),
					email: email.trim(),
					phone: phone.trim() || undefined,
					notes: notes.trim() || undefined,
				},
			);
			if (!res.data?.status) {
				throw new Error(res.data?.message || "Registration failed");
			}
			toast.success(res.data.message, { id: toastId });
			setSuccess({ status: res.data.data?.status });
			setName("");
			setEmail("");
			setPhone("");
			setNotes("");
		} catch (error) {
			toast.error(handleError(error), { id: toastId });
		} finally {
			setSubmitting(false);
		}
	}

	if (closed) {
		return (
			<div className="rounded-3xl border border-base-300/60 bg-base-200 p-6 text-center">
				<LuCalendarCheck className="w-8 h-8 mx-auto text-neutral/60" />
				<h3 className="mt-3 font-bold text-lg">
					Registrations are closed
				</h3>
				<p className="text-sm text-neutral/70">
					Stay tuned — we&apos;ll announce the next opportunity to
					join us soon.
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-3xl bg-base-100 border border-base-300/60 shadow-sm p-6 sm:p-8">
			<div className="flex items-center gap-3 mb-5">
				<span className="w-12 h-12 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow">
					<LuUserPlus className="w-6 h-6" />
				</span>
				<div>
					<h3 className="text-xl font-bold text-neutral">
						Register for {programTitle}
					</h3>
					<p className="text-sm text-neutral/70">
						{remaining === null
							? "Open registration — we'd love to have you."
							: isFull
								? "This event is fully booked — register to join the waitlist."
								: `${remaining} place${remaining === 1 ? "" : "s"} remaining.`}
					</p>
				</div>
			</div>

			{success ? (
				<div className="alert alert-success text-sm mb-4">
					<LuShieldCheck className="w-5 h-5" />
					<span>
						{success.status === "waitlisted"
							? "You're on the waitlist — we'll be in touch."
							: "You're registered! Check your email for confirmation."}
					</span>
				</div>
			) : null}

			<form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
				<label className="form-control">
					<span className="label-text font-semibold mb-1">
						Full name
					</span>
					<input
						className="input input-bordered"
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className="form-control">
					<span className="label-text font-semibold mb-1">
						Email
					</span>
					<input
						className="input input-bordered"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className="form-control">
					<span className="label-text font-semibold mb-1">
						Phone (optional)
					</span>
					<input
						className="input input-bordered"
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</label>
				<label className="form-control">
					<span className="label-text font-semibold mb-1">
						Anything we should know? (optional)
					</span>
					<input
						className="input input-bordered"
						type="text"
						maxLength={500}
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
				</label>

				<div className="sm:col-span-2 flex items-center justify-between gap-3 pt-2">
					<span className="text-xs text-neutral/60">
						By registering you agree to receive event-related
						emails from us.
					</span>
					<button
						type="submit"
						disabled={submitting}
						className="btn btn-primary rounded-full px-6">
						{submitting ? (
							<>
								<LuLoader className="w-4 h-4 animate-spin" />
								Saving…
							</>
						) : isFull ? (
							"Join the waitlist"
						) : (
							"Confirm registration"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default RegisterEventForm;
