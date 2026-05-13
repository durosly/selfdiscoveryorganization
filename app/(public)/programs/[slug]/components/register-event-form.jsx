"use client";

import { handleError } from "@/lib/handleError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	LuCalendarCheck,
	LuCircleAlert,
	LuLoader,
	LuMail,
	LuMessageSquare,
	LuPhone,
	LuShieldCheck,
	LuUser,
	LuUserPlus,
} from "react-icons/lu";
import { phone as parsePhone } from "phone";
import { z } from "zod";

/** Mirrors `EventRegistrationSchema` in `@/models/event-registration` */
const NOTES_MAX = 1000;

/** Mobile numbers validated with `phone` (E.164); optional field may be left blank. */
const optionalInternationalPhone = z
	.string()
	.trim()
	.superRefine((val, ctx) => {
		if (val === "") return;
		const result = parsePhone(val, { country: null });
		if (!result.isValid) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"Enter a valid mobile number with country code — start with + (e.g. +44 7911 123456).",
			});
		}
	})
	.transform((val) => {
		if (val === "") return "";
		const result = parsePhone(val, { country: null });
		return result.isValid ? result.phoneNumber : "";
	});

const registerEventSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Please enter your name (at least 2 characters)")
		.max(120, "Name is too long"),
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.max(120, "Email is too long"),
	phone: optionalInternationalPhone,
	notes: z
		.string()
		.trim()
		.max(NOTES_MAX, `Keep it under ${NOTES_MAX} characters`),
});

function FieldError({ message }) {
	if (!message) return null;
	return (
		<span className="label text-error text-xs gap-1 pt-1">
			<LuCircleAlert className="w-3.5 h-3.5 shrink-0" />
			{message}
		</span>
	);
}

function RegisterEventForm({
	programId,
	programSlug,
	programTitle,
	registrationsOpen = true,
	attendeeLimit = null,
	confirmedCount = 0,
}) {
	const [success, setSuccess] = useState(null);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(registerEventSchema),
		mode: "onTouched",
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			notes: "",
		},
	});

	const notesLen = (watch("notes") || "").length;

	const remaining =
		attendeeLimit && attendeeLimit > 0
			? Math.max(attendeeLimit - confirmedCount, 0)
			: null;
	const isFull = remaining === 0;
	const closed = registrationsOpen === false;

	async function onSubmit(data) {
		const toastId = toast.loading("Sending your registration…");
		const routeSegment = programSlug || programId;
		try {
			const res = await axios.post(`/api/programs/${routeSegment}/register`, {
				name: data.name.trim(),
				email: data.email.trim(),
				phone: data.phone || undefined,
				notes: data.notes.trim() || undefined,
			});
			if (!res.data?.status) {
				throw new Error(res.data?.message || "Registration failed");
			}
			toast.success(res.data.message, { id: toastId });
			setSuccess({ status: res.data.data?.status });
			reset();
		} catch (error) {
			toast.error(handleError(error), { id: toastId });
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

			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6">
				<fieldset className="fieldset bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6">
					<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
						<span className="w-5 h-5 rounded-full bg-primary text-primary-content inline-flex items-center justify-center">
							<LuUser className="w-3 h-3" />
						</span>
						Your details
					</legend>

					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label htmlFor="register-name" className="label">
								<span className="label-text font-semibold text-neutral">
									Full name
								</span>
								<span className="text-error" aria-hidden="true">
									*
								</span>
							</label>
							<label
								className={cn(
									"input w-full",
									errors.name && "input-error",
								)}>
								<LuUser className="w-4 h-4 opacity-50" />
								<input
									id="register-name"
									type="text"
									placeholder="Full name"
									autoComplete="name"
									aria-invalid={!!errors.name}
									{...register("name")}
								/>
							</label>
							<FieldError message={errors.name?.message} />
						</div>

						<div>
							<label htmlFor="register-email" className="label">
								<span className="label-text font-semibold text-neutral">
									Email
								</span>
								<span className="text-error" aria-hidden="true">
									*
								</span>
							</label>
							<label
								className={cn(
									"input w-full",
									errors.email && "input-error",
								)}>
								<LuMail className="w-4 h-4 opacity-50" />
								<input
									id="register-email"
									type="email"
									placeholder="you@example.com"
									autoComplete="email"
									aria-invalid={!!errors.email}
									{...register("email")}
								/>
							</label>
							<FieldError message={errors.email?.message} />
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="register-phone" className="label">
								<span className="label-text font-semibold text-neutral">
									Phone
								</span>
								<span className="label-text-alt text-neutral/60 text-xs font-normal text-right max-w-[14rem] leading-snug">
									Optional · include country code with + (international
									format)
								</span>
							</label>
							<p
								id="register-phone-hint"
								className="text-xs text-neutral/60 mb-2">
								Use your full international mobile number so we can reach
								you — add the country calling code and start with{" "}
								<span className="font-medium text-neutral/80">+</span>{" "}
								(e.g.{" "}
								<span className="whitespace-nowrap">+234 801 234 5678</span>
								). Numbers without{" "}
								<span className="font-medium text-neutral/80">+</span> may
								not validate correctly outside the US/Canada.
							</p>
							<label
								className={cn(
									"input w-full",
									errors.phone && "input-error",
								)}>
								<LuPhone className="w-4 h-4 opacity-50" />
								<input
									id="register-phone"
									type="tel"
									placeholder="+44 7911 123456"
									autoComplete="tel"
									inputMode="tel"
									aria-describedby="register-phone-hint"
									aria-invalid={!!errors.phone}
									{...register("phone")}
								/>
							</label>
							<FieldError message={errors.phone?.message} />
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="register-notes" className="label">
								<span className="label-text font-semibold text-neutral">
									Anything we should know?
								</span>
								<span className="text-neutral/50 text-xs font-normal">
									{" "}
									(optional)
								</span>
							</label>
							<label
								htmlFor="register-notes"
								className={cn(
									"flex w-full items-start gap-3 rounded-2xl border bg-base-100 px-3 py-3 min-h-[100px] transition-[border-color,box-shadow]",
									errors.notes
										? "border-error"
										: "border-base-300 focus-within:border-primary focus-within:shadow-sm",
								)}>
								<LuMessageSquare
									className="mt-1 h-[1em] w-[1em] shrink-0 opacity-50"
									aria-hidden
								/>
								<textarea
									id="register-notes"
									className={cn(
										"grow min-h-[72px] w-full resize-y bg-transparent text-base leading-relaxed outline-none placeholder:text-neutral/50 disabled:cursor-not-allowed disabled:opacity-50",
										errors.notes &&
											"placeholder:text-error/60",
									)}
									rows={3}
									maxLength={NOTES_MAX}
									placeholder="Dietary needs, accessibility, questions…"
									aria-invalid={!!errors.notes}
									{...register("notes")}
								/>
							</label>
							<div className="flex justify-between items-center pt-1">
								<FieldError message={errors.notes?.message} />
								<span
									className={cn(
										"label text-xs ml-auto",
										notesLen >= NOTES_MAX - 120
											? "text-warning"
											: "text-neutral/50",
									)}>
									{notesLen}/{NOTES_MAX}
								</span>
							</div>
						</div>
					</div>
				</fieldset>

				<div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-0 sm:pt-1">
					<span className="text-xs text-neutral/60">
						By registering you agree to receive event-related emails
						from us.
					</span>
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn btn-primary rounded-full px-6 shrink-0">
						{isSubmitting ? (
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
