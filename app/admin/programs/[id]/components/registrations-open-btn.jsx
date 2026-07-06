"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function RegistrationsOpenBtn({ id, registrationsOpen }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function updateRegistrationsOpen(nextValue) {
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading(
			nextValue ? "opening registrations..." : "closing registrations...",
		);
		try {
			const response = await axios.put(
				`/api/admin/programs/${id}/registrations-open`,
				{ registrations_open: nextValue },
			);

			if (response.data?.status === true) {
				toast.success(
					nextValue
						? "registrations are now open"
						: "registrations are now closed",
					{ id: toastId },
				);
				router.refresh();
			} else {
				throw new Error(response.data?.message);
			}
		} catch (error) {
			toast.error(handleError(error), { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<button
			type="button"
			className={`btn ${registrationsOpen ? "btn-warning" : "btn-success"}`}
			disabled={isLoading}
			onClick={() => updateRegistrationsOpen(!registrationsOpen)}>
			{registrationsOpen ? "close registrations" : "open registrations"}
		</button>
	);
}

export default RegistrationsOpenBtn;
