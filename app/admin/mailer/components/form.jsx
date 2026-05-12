"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

function MailerForm() {
	const searchParams = useSearchParams();
	const user = searchParams.get("user");
	const email = searchParams.get("email");
	const [data, setData] = useState({
		email: email || "",
		message: "",
		username: user || "",
		title: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function sendMessage(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Sending email...");
		try {
			const response = await axios.post(`/api/admin/mailer`, data);

			if (response.data.status === true) {
				toast.success("Email sent", { id: toastId });
				setData({ email: "", message: "", username: "", title: "" });
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			const message = handleError(error);
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form
			onSubmit={sendMessage}
			action="/message"
		>
			<div className="form-control">
				<label
					htmlFor="username"
					className="label"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					className="input input-bordered"
					value={data.username}
					disabled={isLoading}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="email"
					className="label"
				>
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="input input-bordered"
					value={data.email}
					disabled={isLoading}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="title"
					className="label"
				>
					Title
				</label>
				<input
					type="text"
					name="title"
					id="title"
					className="input input-bordered"
					value={data.title}
					disabled={isLoading}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="message"
					className="label"
				>
					Message
				</label>
				<textarea
					name="message"
					id="message"
					rows={5}
					className="textarea textarea-bordered"
					value={data.message}
					disabled={isLoading}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				></textarea>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-sm btn-primary btn-block"
			>
				Send
			</button>
		</form>
	);
}

export default MailerForm;
