"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const DESIGNATION_OPTIONS = [
	"",
	"Families and Prisoners Initiative",
	"Self Discovery Conference",
	"Menstrual Hygiene Day",
	"Debate and Quiz Competition",
	"International Day of the Boy Child",
	"Send a Child to School Scheme",
	"General Fund",
];

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
		attendee_limit: "",
		registrations_open: true,
		designation: "",
	});

	const [step, setStep] = useState(1);

	async function createProgram(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Creating...");
		try {
			const payload = {
				...data,
				attendee_limit: data.attendee_limit
					? Number(data.attendee_limit)
					: null,
				designation: data.designation || null,
			};
			const response = await axios.post("/api/admin/programs", payload);

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
					attendee_limit: "",
					registrations_open: true,
					designation: "",
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
						<label htmlFor="title" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="desc" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="location" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="mt-3">
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setStep((prev) => prev + 1)}>
							Next
						</button>
					</div>
				</>
			)}
			{step === 2 && (
				<>
					<div className="form-control">
						<label htmlFor="start-date" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="end-date" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
						<label
							htmlFor="end-date"
							className="label-text-alt">
							Leave empty for single day activities
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="start-time" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="end-time" className="label">
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
									[e.target.name]:
										e.target.value,
								})
							}
						/>
					</div>
					<div className="my-5 space-x-5">
						<button
							type="button"
							className="btn btn-neutral"
							onClick={() => setStep((prev) => prev - 1)}>
							Prev
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setStep((prev) => prev + 1)}>
							Next
						</button>
					</div>
				</>
			)}
			{step === 3 && (
				<>
					<div className="form-control">
						<label htmlFor="attendee_limit" className="label">
							Attendee limit
						</label>
						<input
							className="input input-bordered"
							type="number"
							min="0"
							placeholder="Leave empty for unlimited"
							name="attendee_limit"
							id="attendee_limit"
							value={data.attendee_limit}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
						<span className="label-text-alt">
							Sets the maximum confirmed attendees. Extra
							registrations are added to a waitlist.
						</span>
					</div>
					<div className="form-control">
						<label htmlFor="designation" className="label">
							Linked donation cause (optional)
						</label>
						<select
							className="select select-bordered"
							id="designation"
							name="designation"
							value={data.designation}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}>
							{DESIGNATION_OPTIONS.map((opt) => (
								<option key={opt} value={opt}>
									{opt || "— None —"}
								</option>
							))}
						</select>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer justify-start gap-3">
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={data.registrations_open}
								onChange={(e) =>
									setData({
										...data,
										registrations_open: e.target.checked,
									})
								}
							/>
							<span className="label-text">
								Registrations open
							</span>
						</label>
					</div>
					<div className="my-5 space-x-5">
						<button
							type="button"
							className="btn btn-neutral"
							onClick={() => setStep((prev) => prev - 1)}>
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
