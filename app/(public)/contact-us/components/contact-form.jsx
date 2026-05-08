"use client";

import CascadeAnimation from "@/app/components/animations/cascade-animation";
import { handleError } from "@/lib/handleError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	LuCircleAlert,
	LuMail,
	LuMapPin,
	LuMessageSquare,
	LuPenLine,
	LuSend,
	LuUser,
} from "react-icons/lu";
import { z } from "zod";

/** Mirrors `MessageValidationSchema` in `@/models/message` so the client matches the API */
const CONTACT_MESSAGE_MAX = 4000;

const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(
			3,
			"Please enter your name (at least 3 characters)",
		)
		.max(80, "Name is too long"),
	email: z
		.string()
		.trim()
		.min(5, "Please enter your email address")
		.email("Please enter a valid email address")
		.max(120, "Email is too long"),
	address: z.string().trim().max(200, "Keep the address shorter"),
	message: z
		.string()
		.trim()
		.min(
			2,
			"Please enter a message (at least 2 characters)",
		)
		.max(CONTACT_MESSAGE_MAX, `Keep it under ${CONTACT_MESSAGE_MAX} characters`),
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

function ContactForm() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(contactSchema),
		mode: "onTouched",
		defaultValues: {
			name: "",
			email: "",
			address: "",
			message: "",
		},
	});

	const message = watch("message") || "";

	async function onSubmit(data) {
		const toastId = toast.loading("Sending…");
		try {
			const response = await axios.post("/api/message", {
				name: data.name,
				email: data.email,
				address: data.address.trim(),
				message: data.message,
			});

			if (response.data.status) {
				toast.success(
					response.data.message || "Message sent",
					{ id: toastId },
				);
				reset();
			} else {
				throw new Error(
					response.data?.message || "Could not send message",
				);
			}
		} catch (error) {
			toast.error(handleError(error), { id: toastId });
		}
	}

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className="flex-1 min-w-0">
			<CascadeAnimation>
				<fieldset className="fieldset bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6">
					<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
						<span className="w-5 h-5 rounded-full bg-primary text-primary-content inline-flex items-center justify-center">
							<LuUser className="w-3 h-3" />
						</span>
						Your details
					</legend>

					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label htmlFor="contact-name" className="label">
								<span className="label-text font-semibold text-neutral">
									Your name
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
									id="contact-name"
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
							<label htmlFor="contact-email" className="label">
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
									id="contact-email"
									type="email"
									placeholder="you@example.com"
									autoComplete="email"
									aria-invalid={!!errors.email}
									{...register("email")}
								/>
							</label>
							<FieldError message={errors.email?.message} />
						</div>
					</div>

					<div className="mt-2">
						<label htmlFor="contact-address" className="label">
							<span className="label-text font-semibold text-neutral">
								Address
							</span>
							<span className="text-neutral/50 text-xs font-normal">
								{" "}
								(optional)
							</span>
						</label>
						<label
							className={cn(
								"input w-full",
								errors.address && "input-error",
							)}>
							<LuMapPin className="w-4 h-4 opacity-50" />
							<input
								id="contact-address"
								type="text"
								placeholder="City or full address"
								autoComplete="street-address"
								aria-invalid={!!errors.address}
								{...register("address")}
							/>
						</label>
						<FieldError message={errors.address?.message} />
					</div>
				</fieldset>

				<fieldset className="fieldset mt-6 bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6">
					<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
						<span className="w-5 h-5 rounded-full bg-secondary text-secondary-content inline-flex items-center justify-center">
							<LuPenLine className="w-3 h-3" />
						</span>
						Your message
						<span className="text-error" aria-hidden="true">
							*
						</span>
					</legend>

					{/* Same pattern as donation form: icon + textarea as siblings, not layered */}
					<label
						htmlFor="contact-message"
						className={cn(
							"flex w-full items-start gap-3 rounded-2xl border bg-base-100 px-3 py-3 min-h-[132px] transition-[border-color,box-shadow]",
							errors.message
								? "border-error"
								: "border-base-300 focus-within:border-primary focus-within:shadow-sm",
						)}>
						<LuMessageSquare
							className="mt-1 h-[1em] w-[1em] shrink-0 opacity-50"
							aria-hidden
						/>
						<textarea
							id="contact-message"
							className={cn(
								"grow min-h-[100px] w-full resize-y bg-transparent text-base leading-relaxed outline-none placeholder:text-neutral/50 disabled:cursor-not-allowed disabled:opacity-50",
								errors.message &&
									"placeholder:text-error/60",
							)}
							rows={5}
							maxLength={CONTACT_MESSAGE_MAX}
							placeholder="How can we help?"
							aria-invalid={!!errors.message}
							{...register("message")}
						/>
					</label>

					<div className="flex justify-between items-center pt-1">
						<FieldError message={errors.message?.message} />
						<span
							className={cn(
								"label text-xs ml-auto",
								message.length >= CONTACT_MESSAGE_MAX - 120
									? "text-warning"
									: "text-neutral/50",
							)}>
							{message.length}/{CONTACT_MESSAGE_MAX}
						</span>
					</div>
				</fieldset>

				<div className="form-control mt-6">
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn btn-primary btn-block rounded-2xl">
						{isSubmitting ? (
							<>
								<span className="loading loading-spinner loading-sm" />
								Sending…
							</>
						) : (
							<>
								<LuSend className="w-4 h-4" />
								Send message
							</>
						)}
					</button>
				</div>
			</CascadeAnimation>
		</form>
	);
}

export default ContactForm;
