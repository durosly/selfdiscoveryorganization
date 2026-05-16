"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LuCircleAlert } from "react-icons/lu";

export default function DonationCanceledBanner() {
	const searchParams = useSearchParams();
	const canceled = searchParams.get("canceled") === "1";

	useEffect(() => {
		if (canceled) {
			toast("Checkout was cancelled. You can try again when you're ready.", {
				icon: "ℹ️",
			});
		}
	}, [canceled]);

	if (!canceled) return null;

	return (
		<div className="alert alert-info mb-8 max-w-7xl mx-auto">
			<LuCircleAlert className="w-5 h-5 shrink-0" />
			<span>
				Your checkout was cancelled. Your card has not been charged —
				you can complete your gift below whenever you&apos;re ready.
			</span>
		</div>
	);
}
