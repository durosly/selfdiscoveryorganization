"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function DeleteBtn({ id }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function deleteProgram() {
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("deleting program...");
		try {
			const response = await axios.delete(`/api/admin/programs/${id}`);

			if (response.data.status === true) {
				toast.success("program deleted", { id: toastId });

				router.push("/admin/programs");
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
			className="btn btn-error btn-block mt-5"
			disabled={isLoading}
			onClick={deleteProgram}
		>
			Destroy
		</button>
	);
}

export default DeleteBtn;
