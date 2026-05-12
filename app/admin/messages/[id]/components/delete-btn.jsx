"use client";

import toast from "react-hot-toast";
import deleteMessage from "../../components/delete-request";
import { useState } from "react";
import { useRouter } from "next/navigation";

function DeleteBtn({ id }) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	async function deleteItem() {
		if (isDeleting) return;
		setIsDeleting(true);
		const toastId = toast.loading("Deleting");
		try {
			const res = await deleteMessage([id]);
			if (res.status) {
				toast.success("Done", { id: toastId });
				router.push("/admin/messages");
			} else {
				throw new Error(res.message);
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsDeleting(false);
		}
	}
	return (
		<button
			onClick={deleteItem}
			className="btn btn-error btn-sm btn-block"
			disabled={isDeleting}
		>
			Delete
		</button>
	);
}

export default DeleteBtn;
