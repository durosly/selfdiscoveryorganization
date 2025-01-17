"use client";

import CascadeAnimation from "@/app/components/animations/cascade-animation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function ContactForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [entry, setEntry] = useState({
		name: "",
		email: "",
		address: "",
		message: "",
	});

	async function sendMessage(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Sending...");
		try {
			const response = await axios.post("/api/message", entry);

			if (response.data.status) {
				toast.success("Message sent", { id: toastId });
				setEntry({
					name: "",
					email: "",
					address: "",
					message: "",
				});
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error("Message failed", { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form action="/nice" onSubmit={sendMessage} className="flex-1">
			<CascadeAnimation>
				<div className="flex flex-col sm:flex-row sm:gap-10">
					<div className="form-control flex-1">
						<label
							className="label justify-start"
							htmlFor="name">
							Your Name{" "}
							<span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							name="name"
							id="name"
							className="input input-bordered"
							value={entry.name}
							onChange={(e) =>
								setEntry({
									...entry,
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control flex-1">
						<label
							className="label justify-start"
							htmlFor="email">
							Your Email{" "}
							<span className="text-red-600">*</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="input input-bordered"
							value={entry.email}
							onChange={(e) =>
								setEntry({
									...entry,
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
				</div>
				<div className="form-control">
					<label className="label justify-start" htmlFor="address">
						Address
					</label>
					<input
						type="text"
						name="address"
						id="address"
						className="input input-bordered"
						value={entry.address}
						onChange={(e) =>
							setEntry({
								...entry,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="message" className="label justify-start">
						Message <span className="text-red-600">*</span>
					</label>
					<textarea
						name="message"
						id="message"
						cols="30"
						rows="5"
						className="textarea textarea-bordered"
						value={entry.message}
						onChange={(e) =>
							setEntry({
								...entry,
								[e.target.name]: e.target.value,
							})
						}></textarea>
				</div>
				<div className="form-control mt-5">
					<button
						disabled={isLoading}
						className="btn btn-primary btn-block">
						Send message
					</button>
				</div>
			</CascadeAnimation>
		</form>
	);
}

export default ContactForm;
