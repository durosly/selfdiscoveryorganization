"use client";

import { authClient } from "@/lib/auth-client";
import { handleError } from "@/lib/handleError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuCircleAlert, LuKeyRound, LuLock } from "react-icons/lu";
import { z } from "zod";

const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Enter your current password"),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Confirm your new password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "New passwords do not match",
		path: ["confirmPassword"],
	})
	.refine((data) => data.newPassword !== data.currentPassword, {
		message: "New password must be different from your current password",
		path: ["newPassword"],
	});

function FieldError({ message }) {
	if (!message) return null;
	return (
		<span className="label text-error text-xs gap-1 pt-1">
			<LuCircleAlert className="w-3.5 h-3.5 shrink-0" aria-hidden />
			{message}
		</span>
	);
}

export default function ChangePasswordForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(changePasswordSchema),
		mode: "onTouched",
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data) {
		const toastId = toast.loading("Updating password…");
		try {
			const res = await authClient.changePassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
				revokeOtherSessions: true,
			});
			if (res?.error) {
				throw new Error(res.error.message || "Could not update password");
			}
			toast.success("Password updated.", { id: toastId });
			reset();
		} catch (err) {
			toast.error(handleError(err), { id: toastId });
		}
	}

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md">
			<fieldset className="fieldset bg-base-200/40 border border-base-300/60 rounded-2xl p-5 sm:p-6 shadow-sm">
				<legend className="fieldset-legend px-3 py-1 bg-base-100 border border-base-300/60 rounded-full text-sm font-semibold text-neutral inline-flex items-center gap-2 shadow-sm">
					<span className="w-5 h-5 rounded-full bg-primary text-primary-content inline-flex items-center justify-center">
						<LuLock className="w-3 h-3" aria-hidden />
					</span>
					Change password
				</legend>

				<p className="label text-sm text-neutral/70 pb-2">
					Use at least 8 characters. Other devices will be signed out after a
					successful change.
				</p>

				<div className="space-y-4">
					<div>
						<label htmlFor="settings-current-password" className="label">
							<span className="label-text font-semibold text-neutral">
								Current password
							</span>
						</label>
						<label
							className={cn(
								"input w-full",
								errors.currentPassword && "input-error",
							)}>
							<LuLock className="h-[1em] w-[1em] shrink-0 opacity-50" aria-hidden />
							<input
								id="settings-current-password"
								type="password"
								className="grow min-w-0"
								placeholder="Current password"
								autoComplete="current-password"
								aria-invalid={!!errors.currentPassword}
								{...register("currentPassword")}
							/>
						</label>
						<FieldError message={errors.currentPassword?.message} />
					</div>

					<div>
						<label htmlFor="settings-new-password" className="label">
							<span className="label-text font-semibold text-neutral">
								New password
							</span>
						</label>
						<label
							className={cn(
								"input w-full",
								errors.newPassword && "input-error",
							)}>
							<LuKeyRound className="h-[1em] w-[1em] shrink-0 opacity-50" aria-hidden />
							<input
								id="settings-new-password"
								type="password"
								className="grow min-w-0"
								placeholder="New password"
								autoComplete="new-password"
								aria-invalid={!!errors.newPassword}
								{...register("newPassword")}
							/>
						</label>
						<FieldError message={errors.newPassword?.message} />
					</div>

					<div>
						<label htmlFor="settings-confirm-password" className="label">
							<span className="label-text font-semibold text-neutral">
								Confirm new password
							</span>
						</label>
						<label
							className={cn(
								"input w-full",
								errors.confirmPassword && "input-error",
							)}>
							<LuKeyRound className="h-[1em] w-[1em] shrink-0 opacity-50" aria-hidden />
							<input
								id="settings-confirm-password"
								type="password"
								className="grow min-w-0"
								placeholder="Confirm new password"
								autoComplete="new-password"
								aria-invalid={!!errors.confirmPassword}
								{...register("confirmPassword")}
							/>
						</label>
						<FieldError message={errors.confirmPassword?.message} />
					</div>
				</div>

				<div className="mt-6">
					<button
						type="submit"
						className="btn btn-primary btn-wide w-full sm:w-auto"
						disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<span className="loading loading-spinner" />
								Saving…
							</>
						) : (
							"Update password"
						)}
					</button>
				</div>
			</fieldset>
		</form>
	);
}
