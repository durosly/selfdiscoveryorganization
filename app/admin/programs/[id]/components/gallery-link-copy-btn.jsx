"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LuCopy } from "react-icons/lu";

function GalleryLinkCopyBtn({ link }) {
	const { copy } = useCopyToClipboard();

	return (
		<button onClick={() => copy(link)} className="btn btn-square btn-xs btn-outline">
			<LuCopy />
		</button>
	);
}

export default GalleryLinkCopyBtn;
