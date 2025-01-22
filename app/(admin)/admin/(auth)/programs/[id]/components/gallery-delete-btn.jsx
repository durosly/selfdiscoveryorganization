"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";

function GalleryDeleteBtn({ image, id }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	async function deleteImageFromGallery() {
		if (!image) return;
		if (isLoading) return;

		setIsLoading(true);
		const toastId = toast.loading("deleting program image...");
		try {
			const response = await axios.delete(`/api/admin/programs/${id}/gallery`, {
				data: {
					id,
					image,
				},
			});

			if (response.status !== 200) {
				throw new Error(response.data.message);
			}

			toast.success("Program image deleted", { id: toastId });
			router.refresh();
		} catch (error) {
			let message = handleError(error);
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<button
			disabled={isLoading}
			onClick={deleteImageFromGallery}
			className="btn btn-square btn-xs btn-outline btn-error">
			<LuTrash />
		</button>
	);
}

export default GalleryDeleteBtn;
