"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";

function GalleryUploadButton({ id }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const widgetRef = useRef();
	const widgetHandlerRef = useRef();
	const uploadQueue = useRef([]);
	const isProcessingQueue = useRef(false);

	useEffect(() => {
		if (uploadQueue.current.length > 0 && !isProcessingQueue.current) {
			processQueue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploadQueue.current]);

	function loadScript() {
		if (typeof window !== "undefined" && !widgetHandlerRef.current) {
			const cloudName = "dktzdjwsg"; // replace with your own cloud name
			const uploadPreset = "foundation_preset"; // replace with your own upload preset

			widgetHandlerRef.current = window.cloudinary;

			widgetRef.current = widgetHandlerRef.current.createUploadWidget(
				{
					cloudName: cloudName,
					uploadPreset: uploadPreset,
					clientAllowedFormats: ["png", "jpg", "jpeg", "svg"], //restrict uploading to image files only
				},
				// @ts-ignore
				(error, result) => {
					if (!error && result && result.event === "success") {
						uploadQueue.current.push(result.info.public_id);
						processQueue();
					}
				}
			);
		}
	}

	async function processQueue() {
		if (isProcessingQueue.current || uploadQueue.current.length === 0) return;

		isProcessingQueue.current = true;
		while (uploadQueue.current.length > 0) {
			const image = uploadQueue.current.shift();
			await addImagesToGallery({ image });
		}
		isProcessingQueue.current = false;
	}

	async function addImagesToGallery({ image }) {
		setIsLoading(true);
		const toastId = toast.loading("uploading program images...");
		try {
			const response = await axios.post(`/api/admin/programs/${id}/gallery`, {
				id,
				image,
			});

			if (response.status !== 200) {
				throw new Error(response.data.message);
			}

			toast.success("Program images uploaded", { id: toastId });
			router.refresh();
		} catch (error) {
			let message = handleError(error);
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	function handleWidget() {
		// @ts-ignore
		widgetRef.current.open();
	}

	return (
		<>
			<button
				onClick={handleWidget}
				disabled={isLoading}
				className="btn btn-sm sm:btn-md btn-circle btn-primary">
				<LuUpload />
			</button>
			<Script
				src="https://widget.cloudinary.com/v2.0/global/all.js"
				type="text/javascript"
				onLoad={loadScript}
			/>
		</>
	);
}

export default GalleryUploadButton;
