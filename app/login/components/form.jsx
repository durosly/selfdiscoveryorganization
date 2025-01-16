"use client";

import { handleError } from "@/lib/handleError";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

function LoginForm() {
	const router = useRouter();
	const [info, setInfo] = useState({ email: "", password: "" });
	// const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function makeLoginRequest(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Loading...");
		try {
			setIsLoading(true);
			const res = await signIn("credentials", {
				redirect: false,
				...info,
			});

			if (res && res.ok && !res?.error) {
				toast.success("Login successful", { id: toastId });
				router.push("/admin/dashboard");
				// setIsLoading(false);
			} else {
				throw new Error(res?.error || "Something went wrong");
			}
		} catch (error) {
			const message = handleError(error);
			toast.error(message, { id: toastId });
			setIsLoading(false);
		}
	}
	return (
		<form
			onSubmit={makeLoginRequest}
			className="card-body"
		>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Email</span>
				</label>
				<input
					type="text"
					placeholder="email"
					name="email"
					className="input input-bordered"
					value={info.email}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="password"
					className="input input-bordered"
					name="password"
					value={info.password}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mt-6">
				<button
					className="btn btn-primary"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<span className="loading loading-spinner"></span>
							loading
						</>
					) : (
						"Login"
					)}
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
