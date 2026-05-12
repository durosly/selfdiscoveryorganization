"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LuCheck, LuCopy } from "react-icons/lu";

export default function CopyProgramLinkBtn({ url }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		if (!url) return;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Registration link copied");
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy link");
		}
	}

	return (
		<button
			type="button"
			className="btn btn-sm btn-outline"
			disabled={!url}
			onClick={copy}
		>
			{copied ? (
				<LuCheck className="w-4 h-4" />
			) : (
				<LuCopy className="w-4 h-4" />
			)}{" "}
			{copied ? "Copied" : "Copy registration link"}
		</button>
	);
}
