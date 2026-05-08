"use client";

import { handleError } from "@/lib/handleError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	PayPalButtons,
	PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	LuBanknote,
	LuCircleAlert,
	LuHeart,
	LuLock,
	LuMail,
	LuMessageSquare,
	LuPenLine,
	LuRepeat2,
	LuShieldCheck,
	LuTarget,
	LuUser,
} from "react-icons/lu";
import { z } from "zod";

const PRESET_TIERS = [
	{ amount: 10, label: "£10", note: "Essential support materials" },
	{ amount: 25, label: "£25", note: "Outreach to vulnerable people" },
	{ amount: 50, label: "£50", note: "Education & welfare assistance" },
	{
		amount: 100,
		label: "£100",
		note: "Family or community intervention",
	},
];

export const DESIGNATION_OPTIONS = [
	"Families and Prisoners Initiative",
	"Self Discovery Conference",
	"Menstrual Hygiene Day",
	"Debate and Quiz Competition",
	"International Day of the Boy Child",
	"Send a Child to School Scheme",
	"General Fund",
];

const PLAN_IDS = {
	10: process.env.NEXT_PUBLIC_PAYPAL_PLAN_10 || "",
	25: process.env.NEXT_PUBLIC_PAYPAL_PLAN_25 || "",
	50: process.env.NEXT_PUBLIC_PAYPAL_PLAN_50 || "",
	100: process.env.NEXT_PUBLIC_PAYPAL_PLAN_100 || "",
};

const MESSAGE_MAX = 500;

const donationSchema = z
	.object({
		selectedTier: z.union([
			z.literal(10),
			z.literal(25),
			z.literal(50),
			z.literal(100),
			z.literal("custom"),
		]),
		customAmount: z.string().optional().or(z.literal("")),
		recurring: z.boolean(),
		designation: z
			.string()
			.min(1, "Please choose a focus area for your gift"),
		donorName: z
			.string()
			.trim()
			.min(2, "Please enter your full name (at least 2 characters)")
			.max(80, "Name is too long"),
		donorEmail: z
			.string()
			.trim()
			.min(1, "An email address is required")
			.email("Please enter a valid email address"),
		message: z
			.string()
			.max(MESSAGE_MAX, `Keep it under ${MESSAGE_MAX} characters`)
			.optional()
			.or(z.literal("")),
	})
	.superRefine((data, ctx) => {
		if (data.selectedTier === "custom") {
			const n = parseFloat(data.customAmount || "");
			if (!Number.isFinite(n) || n < 1) {
				ctx.addIssue({
					path: ["customAmount"],
					code: z.ZodIssueCode.custom,
					message: "Enter an amount of at least £1",
				});
			}
		}
	});

function getPlanIdForAmount(amount) {
	if (!amount) return null;
	return PLAN_IDS[Math.round(amount)] || null;
}

function FieldError({ message }) {
	if (!message) return null;
	return (
		<span className="label text-error text-xs gap-1 pt-1">
			<LuCircleAlert className="w-3.5 h-3.5 shrink-0" />
			{message}
		</span>
	);
}

function DonationForm() {
	const formTopRef = useRef(null);
	const [success, setSuccess] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const {
		register,
		watch,
		setValue,
		getValues,
		reset,
		trigger,
		formState: { errors, isValid },
	} = useForm({
		resolver: zodResolver(donationSchema),
		mode: "onTouched",
		defaultValues: {
			selectedTier: 25,
			customAmount: "",
			recurring: false,
			designation: DESIGNATION_OPTIONS[0],
			donorName: "",
			donorEmail: "",
			message: "",
		},
	});

	const selectedTier = watch("selectedTier");
	const customAmount = watch("customAmount");
	const recurring = watch("recurring");
	const designation = watch("designation");
	const message = watch("message") || "";

	const isCustom = selectedTier === "custom";
	const amount = useMemo(() => {
		if (isCustom) {
			const n = parseFloat(customAmount);
			return Number.isFinite(n) && n > 0 ? n : 0;
		}
		return Number(selectedTier) || 0;
	}, [selectedTier, customAmount, isCustom]);

	const planId = recurring ? getPlanIdForAmount(amount) : null;
	const subscriptionsUnavailable = recurring && !planId;
	const ready = isValid && amount >= 1 && !subscriptionsUnavailable;

	const clientId =
		process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";
	const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "GBP";

	const scriptOptions = useMemo(
		() => ({
			clientId,
			currency,
			intent: recurring ? "subscription" : "capture",
			vault: recurring ? true : undefined,
			components: "buttons",
		}),
		[clientId, currency, recurring],
	);

	function selectTier(tier) {
		setValue("selectedTier", tier, {
			shouldValidate: true,
			shouldDirty: true,
		});
		if (tier !== "custom") {
			setValue("customAmount", "", { shouldValidate: true });
		}
	}

	async function confirmDonation(payload) {
		setSubmitting(true);
		const toastId = toast.loading("Confirming your donation…");
		try {
			const res = await axios.post(
				"/api/donations/confirm",
				payload,
			);
			if (!res.data?.status) {
				throw new Error(
					res.data?.message || "Could not confirm donation",
				);
			}
			toast.success(res.data.message || "Thank you for your gift!", {
				id: toastId,
			});
			setSuccess({
				amount: payload.amount,
				currency: payload.currency,
				recurring: payload.recurring,
				designation: payload.designation,
				donorName: payload.donorName,
			});
			reset({
				selectedTier: 25,
				customAmount: "",
				recurring: false,
				designation: DESIGNATION_OPTIONS[0],
				donorName: "",
				donorEmail: "",
				message: "",
			});
			formTopRef.current?.scrollIntoView({ behavior: "smooth" });
		} catch (error) {
			toast.error(handleError(error), { id: toastId });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div
			ref={formTopRef}
			id="donation-form"
			className="bg-base-100 rounded-3xl shadow-xl border border-base-300/60 p-6 sm:p-10 grid lg:grid-cols-[1.2fr_1fr] gap-8">
			<form
				noValidate
				onSubmit={(e) => e.preventDefault()}
				className="min-w-0">
				<div className="flex items-center gap-3 mb-6">
					<span className="w-12 h-12 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow">
						<LuHeart className="w-6 h-6" />
					</span>
					<div>
						<h3 className="text-2xl font-bold text-neutral">
							Choose an amount
						</h3>
						<p className="text-sm text-neutral/70">
							Pick a tier or set a custom amount.
						</p>
					</div>
				</div>

				<fieldset
					className="grid grid-cols-2 sm:grid-cols-3 gap-3"
					aria-label="Donation amount">
					{PRESET_TIERS.map((tier) => (
						<button
							key={tier.amount}
							type="button"
							aria-pressed={selectedTier === tier.amount}
							onClick={() => selectTier(tier.amount)}
							className={cn(
								"rounded-2xl border-2 p-4 text-left transition-all",
								selectedTier === tier.amount
									? "border-primary bg-primary/10 shadow-md"
									: "border-base-300 hover:border-primary/60 hover:bg-base-200",
							)}>
							<div className="text-xl font-extrabold text-neutral">
								{tier.label}
							</div>
							<div className="text-xs text-neutral/70 mt-1">
								{tier.note}
							</div>
						</button>
					))}
					<button
						type="button"
						aria-pressed={isCustom}
						onClick={() => selectTier("custom")}
						className={cn(
							"rounded-2xl border-2 p-4 text-left transition-all",
							isCustom
								? "border-primary bg-primary/10 shadow-md"
								: "border-base-300 hover:border-primary/60 hover:bg-base-200",
						)}>
						<div className="text-xl font-extrabold text-neutral">
							Custom
						</div>
						<div className="text-xs text-neutral/70 mt-1">
							Give any amount
						</div>
					</button>
				</fieldset>

				{isCustom ? (
					<fieldset className="fieldset mt-4">
						<legend className="fieldset-legend text-neutral font-semibold">
							Custom amount
						</legend>
						<label
							className={cn(
								"input w-full",
								errors.customAmount && "input-error",
							)}>
							<span className="font-bold text-neutral/70">
								£
							</span>
							<input
								type="number"
								inputMode="decimal"
								min="1"
								step="0.01"
								placeholder="Enter amount (min £1)"
								{...register("customAmount", {
									onBlur: () => trigger("customAmount"),
								})}
							/>
						</label>
						<FieldError
							message={errors.customAmount?.message}
						/>
					</fieldset>
				) : null}

				<label className="mt-6 cursor-pointer flex items-start gap-3 p-4 rounded-2xl bg-base-200 hover:bg-base-300/60 transition-colors">
					<input
						type="checkbox"
						className="toggle toggle-primary mt-1"
						{...register("recurring")}
					/>
					<div>
						<span className="flex items-center gap-2 font-semibold text-neutral">
							<LuRepeat2 className="w-4 h-4 text-primary" />
							Make this a monthly donation
						</span>
						<span className="text-xs text-neutral/70">
							Recurring gifts help us plan ahead and reach
							more people every month.
						</span>
					</div>
				</label>

				{subscriptionsUnavailable ? (
					<div className="alert alert-warning mt-4 text-sm">
						<LuCircleAlert className="w-5 h-5" />
						<span>
							Monthly giving for £{amount} is being set up.
							Please choose a different amount, or give a
							one-time gift.
						</span>
					</div>
				) : null}

				<fieldset className="fieldset mt-8 bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6">
					<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
						<span className="w-5 h-5 rounded-full bg-primary text-primary-content inline-flex items-center justify-center">
							<LuUser className="w-3 h-3" />
						</span>
						Your details
					</legend>

					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="donorName"
								className="label">
								<span className="label-text font-semibold text-neutral">
									Full name
								</span>
								<span
									className="text-error"
									aria-hidden="true">
									*
								</span>
							</label>
							<label
								className={cn(
									"input w-full",
									errors.donorName && "input-error",
								)}>
								<LuUser className="w-4 h-4 opacity-60" />
								<input
									id="donorName"
									type="text"
									placeholder="Jane Doe"
									autoComplete="name"
									aria-invalid={!!errors.donorName}
									{...register("donorName")}
								/>
							</label>
							<FieldError
								message={errors.donorName?.message}
							/>
						</div>

						<div>
							<label
								htmlFor="donorEmail"
								className="label">
								<span className="label-text font-semibold text-neutral">
									Email address
								</span>
								<span
									className="text-error"
									aria-hidden="true">
									*
								</span>
							</label>
							<label
								className={cn(
									"input w-full",
									errors.donorEmail && "input-error",
								)}>
								<LuMail className="w-4 h-4 opacity-60" />
								<input
									id="donorEmail"
									type="email"
									placeholder="you@example.com"
									autoComplete="email"
									aria-invalid={!!errors.donorEmail}
									{...register("donorEmail")}
								/>
							</label>
							<FieldError
								message={errors.donorEmail?.message}
							/>
						</div>
					</div>

					<div className="mt-2">
						<label
							htmlFor="designation"
							className="label">
							<span className="label-text font-semibold text-neutral">
								What are you giving towards?
							</span>
							<span
								className="text-error"
								aria-hidden="true">
								*
							</span>
						</label>
						<label
							className={cn(
								"select w-full",
								errors.designation && "select-error",
							)}>
							<LuTarget className="w-4 h-4 opacity-60" />
							<select
								id="designation"
								aria-invalid={!!errors.designation}
								{...register("designation")}>
								{DESIGNATION_OPTIONS.map((opt) => (
									<option key={opt} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</label>
						<FieldError
							message={errors.designation?.message}
						/>
					</div>
				</fieldset>

				<fieldset className="fieldset mt-4 bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6">
					<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
						<span className="w-5 h-5 rounded-full bg-secondary text-secondary-content inline-flex items-center justify-center">
							<LuPenLine className="w-3 h-3" />
						</span>
						A note from you
						<span className="text-neutral/40 font-normal">
							(optional)
						</span>
					</legend>

					{/* Icon + textarea as siblings (same pattern as daisyUI label.input), not stacked — otherwise the textarea paints over the icon on focus */}
					<label
						htmlFor="message"
						className={cn(
							"flex w-full items-start gap-3 rounded-2xl border bg-base-100 px-3 py-3 min-h-[110px] transition-[border-color,box-shadow]",
							errors.message
								? "border-error"
								: "border-base-300 focus-within:border-primary focus-within:shadow-sm",
						)}>
						<LuMessageSquare
							className="mt-1 h-[1em] w-[1em] shrink-0 opacity-50"
							aria-hidden
						/>
						<textarea
							id="message"
							className={cn(
								"grow min-h-[88px] w-full resize-y bg-transparent text-base leading-relaxed outline-none placeholder:text-neutral/50 disabled:cursor-not-allowed disabled:opacity-50",
								errors.message &&
									"placeholder:text-error/60",
							)}
							rows={3}
							maxLength={MESSAGE_MAX}
							placeholder="Tell us why you're giving today…"
							aria-invalid={!!errors.message}
							{...register("message")}
						/>
					</label>
					<div className="flex justify-between items-center pt-1">
						<FieldError message={errors.message?.message} />
						<span
							className={cn(
								"label text-xs ml-auto",
								message.length >= MESSAGE_MAX - 50
									? "text-warning"
									: "text-neutral/50",
							)}>
							{message.length}/{MESSAGE_MAX}
						</span>
					</div>
				</fieldset>
			</form>

			<aside className="rounded-3xl bg-linear-to-br from-primary/15 via-base-200 to-secondary/10 p-6 sm:p-7 border border-base-300/60 flex flex-col">
				<div className="flex items-center gap-2 text-sm text-neutral/70">
					<LuLock className="w-4 h-4 text-secondary" />
					Secure checkout via PayPal
				</div>
				<div className="mt-3">
					<div className="text-sm text-neutral/70">
						Your contribution
					</div>
					<div className="text-4xl font-extrabold text-neutral">
						£{amount.toFixed(2)}{" "}
						<span className="text-sm font-medium text-neutral/60">
							{recurring ? "/ month" : "one-time"}
						</span>
					</div>
					<div className="mt-1 text-xs text-neutral/70">
						Going to{" "}
						<span className="font-semibold text-primary">
							{designation}
						</span>
					</div>
				</div>

				<div className="mt-5">
					{success ? (
						<div className="alert alert-success text-sm">
							<LuShieldCheck className="w-5 h-5" />
							<div>
								<div className="font-bold">
									Thank you,{" "}
									{success.donorName || "friend"}!
								</div>
								<div>
									Your{" "}
									{success.recurring
										? "monthly"
										: "one-time"}{" "}
									gift of {success.currency}{" "}
									{success.amount.toFixed(2)} for{" "}
									<strong>
										{success.designation}
									</strong>{" "}
									has been received.
								</div>
							</div>
						</div>
					) : null}

					{!ready ? (
						<div className="rounded-2xl border-2 border-dashed border-base-300 p-5 text-center text-sm text-neutral/60">
							{subscriptionsUnavailable
								? "Monthly giving for this amount is unavailable right now."
								: "Fill in your name, a valid email and pick an amount to enable secure PayPal checkout."}
						</div>
					) : (
						<PayPalScriptProvider options={scriptOptions}>
							<PayPalButtons
								key={`${recurring ? "sub" : "one"}-${amount}-${currency}`}
								disabled={submitting}
								style={{
									layout: "vertical",
									shape: "pill",
									label: "donate",
									color: "gold",
								}}
								createOrder={
									recurring
										? undefined
										: (data, actions) =>
											actions.order.create({
												purchase_units: [
													{
														description: `Donation — ${designation}`,
														custom_id: designation,
														amount: {
															value: amount.toFixed(2),
															currency_code: currency,
														},
													},
												],
												application_context: {
													shipping_preference: "NO_SHIPPING",
												},
											})
								}
								createSubscription={
									recurring
										? (data, actions) => {
											const v = getValues();
											return actions.subscription.create({
												plan_id: planId,
												custom_id: designation,
												subscriber: {
													name: { given_name: v.donorName },
													email_address: v.donorEmail,
												},
											});
										}
										: undefined
								}
								onApprove={async (data, actions) => {
									const v = getValues();
									if (recurring) {
										await confirmDonation({
											provider: "paypal",
											mode: "subscription",
											subscriptionId: data.subscriptionID,
											amount,
											currency,
											designation: v.designation,
											recurring: true,
											donorName: v.donorName,
											donorEmail: v.donorEmail,
											message: v.message || undefined,
										});
									} else {
										if (actions?.order?.capture) {
											try {
												await actions.order.capture();
											} catch (e) {
												/* server confirm will still verify */
											}
										}
										await confirmDonation({
											provider: "paypal",
											mode: "one-time",
											orderId: data.orderID,
											amount,
											currency,
											designation: v.designation,
											recurring: false,
											donorName: v.donorName,
											donorEmail: v.donorEmail,
											message: v.message || undefined,
										});
									}
								}}
								onError={(err) => {
									toast.error(
										"PayPal payment could not be completed.",
									);
									console.error("PayPal error", err);
								}}
							/>
						</PayPalScriptProvider>
					)}
				</div>

				<div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-neutral/70">
					<div className="p-2 bg-base-100 rounded-xl">
						<LuShieldCheck className="w-5 h-5 mx-auto text-secondary" />
						SSL secure
					</div>
					<div className="p-2 bg-base-100 rounded-xl">
						<LuBanknote className="w-5 h-5 mx-auto text-secondary" />
						No hidden fees
					</div>
					<div className="p-2 bg-base-100 rounded-xl">
						<LuHeart className="w-5 h-5 mx-auto text-secondary" />
						100% to mission
					</div>
				</div>
			</aside>
		</div>
	);
}

export default DonationForm;
