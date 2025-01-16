"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";

function DeleteButton({ id, program_id }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function removeTimeline() {
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("removing from timeline...");
		try {
			const response = await axios.delete(
				`/api/admin/programs/${program_id}/timeline/${id}`
			);

			if (response.data.status === true) {
				toast.success("Timeline removed", { id: toastId });

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
			onClick={removeTimeline}
			className="btn btn-sm btn-square btn-error"
			disabled={isLoading}
		>
			<LuTrash />
		</button>
	);
}

export default DeleteButton;
