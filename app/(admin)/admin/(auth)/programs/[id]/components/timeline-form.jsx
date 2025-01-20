"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function TimelineForm({ id }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [timeline, setTimeline] = useState({
		title: "",
		sub_title: "",
		summary: "",
		date: "",
	});

	async function addToTimeline(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Adding to timeline...");
		try {
			const response = await axios.post(
				`/api/admin/programs/${id}/timeline`,
				timeline
			);

			if (response.data.status === true) {
				toast.success("Timeline added", { id: toastId });
				setTimeline({
					title: "",
					sub_title: "",
					summary: "",
					date: "",
				});
				router.refresh();
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
		<form onSubmit={addToTimeline}>
			<div className="form-control">
				<label htmlFor="title" className="label">
					Title
				</label>
				<input
					type="text"
					name="title"
					id="title"
					className="input input-bordered"
					value={timeline.title}
					onChange={(e) =>
						setTimeline({
							...timeline,
							[e.target.name]: e.target.value,
						})
					}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="sub-title" className="label">
					Sub Title
				</label>
				<input
					type="text"
					name="sub_title"
					id="sub-title"
					className="input input-bordered"
					value={timeline.sub_title}
					onChange={(e) =>
						setTimeline({
							...timeline,
							[e.target.name]: e.target.value,
						})
					}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="summary" className="label">
					Summary
				</label>
				<textarea
					name="summary"
					id="summary"
					cols="30"
					rows="3"
					className="textarea textarea-bordered"
					value={timeline.summary}
					onChange={(e) =>
						setTimeline({
							...timeline,
							[e.target.name]: e.target.value,
						})
					}></textarea>
			</div>
			<div className="form-control">
				<label htmlFor="date" className="label">
					Date
				</label>
				<input
					type="date"
					name="date"
					id="date"
					className="input input-bordered"
					value={timeline.date}
					onChange={(e) =>
						setTimeline({
							...timeline,
							[e.target.name]: e.target.value,
						})
					}
				/>
			</div>
			<div className="form-control mt-5">
				<button disabled={isLoading} className="btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	);
}

export default TimelineForm;
