import React from "react";
import GalleryUploadButton from "./gallery-upload-button";
import Link from "next/link";
import Image from "next/image";
import GalleryLinkCopyBtn from "./gallery-link-copy-btn";
import GalleryDeleteBtn from "./gallery-delete-btn";

function ProgramGallery({ program_id, initialData }) {
	return (
		<div>
			<ul className="space-y-4 mb-5">
				{initialData?.images?.map((image) => (
					<li
						key={image}
						className="flex gap-2 items-center flex-wrap">
						<Link
							href={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${image}`}
							className="relative h-10 w-10 rounded-xl overflow-hidden">
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${image}`}
								fill
								alt="gallery image"
							/>
						</Link>
						<div className="space-x-1">
							<GalleryLinkCopyBtn
								link={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${image}`}
							/>
							<GalleryDeleteBtn
								image={image}
								id={program_id}
							/>
						</div>
					</li>
				))}
			</ul>
			<GalleryUploadButton id={program_id} />
		</div>
	);
}

export default ProgramGallery;
