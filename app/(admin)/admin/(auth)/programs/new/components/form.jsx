"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function NewProgramForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "",
		desc: "",
		location: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
	});

	const [step, setStep] = useState(1);

	async function createProgram(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Creating...");
		try {
			const response = await axios.post("/api/admin/programs", data);

			if (response.data.status) {
				toast.success("Program created", { id: toastId });
				setData({
					title: "",
					desc: "",
					location: "",
					start_date: "",
					end_date: "",
					start_time: "",
					end_time: "",
				});
				setStep(1);
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
		<form onSubmit={createProgram}>
			{step === 1 && (
				<>
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
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="desc"
							className="label"
						>
							Description
						</label>
						<input
							type="text"
							name="desc"
							id="desc"
							className="input input-bordered"
							value={data.desc}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="location"
							className="label"
						>
							Location
						</label>
						<input
							type="text"
							name="location"
							id="location"
							className="input input-bordered"
							value={data.location}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="mt-3">
						<button
							className="btn btn-primary"
							onClick={() => setStep((prev) => prev + 1)}
						>
							Next
						</button>
					</div>
				</>
			)}
			{step === 2 && (
				<>
					<div className="form-control">
						<label
							htmlFor="start-date"
							className="label"
						>
							Start Date
						</label>
						<input
							className="input input-bordered"
							type="date"
							name="start_date"
							id="start-date"
							value={data.start_date}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="end-date"
							className="label"
						>
							End Date
						</label>
						<input
							className="input input-bordered"
							type="date"
							name="end_date"
							id="end-date"
							value={data.end_date}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
						<label
							htmlFor="end-date"
							className="label-text-alt"
						>
							Leave empty for single day activities
						</label>
					</div>
					<div className="form-control">
						<label
							htmlFor="start-time"
							className="label"
						>
							Start Time
						</label>
						<input
							className="input input-bordered"
							type="time"
							name="start_time"
							id="start-time"
							value={data.start_time}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="end-time"
							className="label"
						>
							End Time
						</label>
						<input
							className="input input-bordered"
							type="time"
							name="end_time"
							id="end-time"
							value={data.end_time}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="my-5 space-x-5">
						<button
							className="btn btn-neutral"
							onClick={() => setStep((prev) => prev - 1)}
						>
							Prev
						</button>
						<button className="btn btn-primary">
							{isLoading ? (
								<>
									<span className="loading loading-spinner"></span>
									Loading...
								</>
							) : (
								"Done"
							)}
						</button>
					</div>
				</>
			)}
		</form>
	);
}

export default NewProgramForm;
