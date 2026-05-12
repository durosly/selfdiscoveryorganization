"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function StatusBtn({ status, id }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function updateStatus(newStatus) {
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("updating program status...");
		try {
			const response = await axios.put(
				`/api/admin/programs/${id}/status`,
				{ status: newStatus }
			);

			if (response.data.status === true) {
				toast.success("program status updated", { id: toastId });

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
		<button
			className={`btn ${
				status === "publish" ? "btn-secondary" : "btn-success"
			} `}
			disabled={isLoading}
			onClick={() =>
				updateStatus(status === "publish" ? "unpublish" : "publish")
			}
		>
			{status === "publish" ? "unpublish" : "publish"}
		</button>
	);
}

export default StatusBtn;
