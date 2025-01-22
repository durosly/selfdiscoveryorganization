"use client";
import dynamic from "next/dynamic"; // Dynamically import client-side libraries
import { handleError } from "@/lib/handleError";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

// Dynamically import SimpleMDE (only in the browser)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

function ArticleSummary({ initialData, program_id }) {
	const router = useRouter();
	const [showEditor, setShowEditor] = useState(false);
	const toastRef = useRef(null);
	const [value, setValue] = useState("");

	const onChange = useCallback((value) => {
		setValue(value);
	}, []);

	useEffect(() => {
		if (initialData) {
			setValue(initialData.body);
		}
	}, [initialData]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(
				`/api/admin/programs/${program_id}/article`,
				data
			);
			return response.data;
		},
		onMutate: () => {
			toastRef.current = toast.loading("Saving...");
		},
		onSuccess: () => {
			router.refresh();
			toast.success("Saved successfully", { id: toastRef.current });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
			console.error(error);
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		mutate({ program_id, body: value });
	}

	return (
		<div>
			<div className="mb-5">
				{showEditor ? (
					<form onSubmit={handleSubmit}>
						<SimpleMDE value={value} onChange={onChange} />
						<button
							className="btn btn-primary btn-sm"
							type="submit"
							disabled={isPending}>
							Save
						</button>
					</form>
				) : !!initialData ? (
					<div className="prose bg-base-200 p-2 rounded-lg line-clamp-4 max-w-none">
						<Markdown>{initialData.body}</Markdown>
					</div>
				) : (
					<p className="my-2">
						Program ID: No short article written yet.
					</p>
				)}
			</div>

			<button
				onClick={() => setShowEditor((prev) => !prev)}
				className="btn btn-sm btn-neutral btn-outline">
				{showEditor ? "Close editor" : "Write short article"}
			</button>
		</div>
	);
}

export default ArticleSummary;
