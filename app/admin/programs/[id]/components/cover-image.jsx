"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";

function CoverImage({ url, title, id }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const widgetRef = useRef();
	const widgetHandlerRef = useRef();

	function loadScript() {
		if (typeof window !== "undefined" && !widgetHandlerRef.current) {
			const cloudName = "dktzdjwsg"; // replace with your own cloud name
			const uploadPreset = "foundation_preset"; // replace with your own upload preset

			// Remove the comments from the code below to add
			// additional functionality.
			// Note that these are only a few examples, to see
			// the full list of possible parameters that you
			// can add see:
			//   https://cloudinary.com/documentation/upload_widget_reference

			widgetHandlerRef.current = window.cloudinary;

			widgetRef.current = widgetHandlerRef.current.createUploadWidget(
				{
					cloudName: cloudName,
					uploadPreset: uploadPreset,
					maxFiles: 1,
					cropping: true, //add a cropping step
					// showAdvancedOptions: true,  //add advanced options (public_id and tag)
					// sources: [ "local", "url"], // restrict the upload sources to URL and local files
					// multiple: false,  //restrict upload to a single file
					// folder: "user_images", //upload files to the specified folder
					// tags: ["users", "profile"], //add the given tags to the uploaded files
					// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
					clientAllowedFormats: ["png", "jpg", "jpeg", "svg"], //restrict uploading to image files only
					// maxImageFileSize: 2000000,  //restrict file size to less than 2MB
					// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
					// theme: "purple", //change to a purple theme
				},
				// @ts-ignore
				(error, result) => {
					if (!error && result && result.event === "success") {
						updateProgramCover({
							id,
							image: result.info.public_id,
						});
					}
				}
			);
		}
	}

	async function updateProgramCover({ id, image }) {
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("updating cover image...");
		try {
			const response = await axios.put(`/api/admin/programs/${id}/cover`, {
				image,
			});

			if (response.data.status) {
				toast.success("Cover updated", { id: toastId });
				router.refresh();
			} else {
				throw new Error(response.data.message);
			}
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
			<div className="relative h-44 w-full rounded-xl overflow-hidden mb-5">
				<Image
					fill
					src={`${url}`}
					alt={title}
					className="object-cover"
					sizes="(min-width: 1040px) calc(100vw - 440px), (min-width: 640px) calc(100vw - 120px), (min-width: 400px) calc(100vw - 80px), 81.25vw"
				/>
				<button
					onClick={handleWidget}
					disabled={isLoading}
					className="btn btn-sm sm:btn-md btn-circle btn-primary absolute bottom-5 right-5">
					<LuUpload />
				</button>
			</div>
			<Script
				src="https://widget.cloudinary.com/v2.0/global/all.js"
				type="text/javascript"
				onLoad={loadScript}
				// onReady={loadScript}
			/>
		</>
	);
}

export default CoverImage;
