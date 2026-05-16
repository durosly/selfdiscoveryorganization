"use client";

import CascadeAnimation from "@/app/components/animations/cascade-animation";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
	LuArrowRight,
	LuHeart,
	LuHouse,
	LuRepeat2,
	LuShieldCheck,
} from "react-icons/lu";

function fireConfetti() {
	import("canvas-confetti").then(({ default: confetti }) => {
		const duration = 2800;
		const end = Date.now() + duration;

		const frame = () => {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0.65 },
				colors: ["#e85d4c", "#f4a261", "#2a9d8f", "#264653"],
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0.65 },
				colors: ["#e85d4c", "#f4a261", "#2a9d8f", "#264653"],
			});
			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};

		confetti({
			particleCount: 120,
			spread: 80,
			origin: { y: 0.55 },
			colors: ["#e85d4c", "#f4a261", "#2a9d8f", "#264653", "#ffffff"],
		});
		frame();
	});
}

function ThankYouCelebration({ sessionId }) {
	const iconRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [donation, setDonation] = useState(null);

	useEffect(() => {
		if (!sessionId) {
			setError("No donation session found.");
			setLoading(false);
			return;
		}

		let cancelled = false;

		async function load() {
			try {
				const res = await fetch(
					`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`,
				);
				const json = await res.json();
				if (!res.ok || !json.status) {
					throw new Error(json.message || "Could not verify payment.");
				}
				if (!cancelled) {
					setDonation(json.data);
					fireConfetti();
				}
			} catch (err) {
				if (!cancelled) {
					setError(err.message || "Something went wrong.");
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		load();
		return () => {
			cancelled = true;
		};
	}, [sessionId]);

	useEffect(() => {
		if (!donation || !iconRef.current) return;
		animate(
			iconRef.current,
			{ scale: [0.5, 1.15, 1], rotate: [0, -8, 0] },
			{ type: "spring", stiffness: 260, damping: 12 },
		);
	}, [donation]);

	if (loading) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
				<span className="loading loading-spinner loading-lg text-primary" />
				<p className="text-neutral/70">Confirming your gift…</p>
			</div>
		);
	}

	if (error || !donation) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center max-w-lg mx-auto">
				<div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
					<LuShieldCheck className="w-8 h-8 text-neutral/50" />
				</div>
				<h1 className="text-2xl font-bold text-neutral">
					We couldn&apos;t verify your payment
				</h1>
				<p className="text-neutral/70">{error}</p>
				<Link href="/support#donation-form" className="btn btn-primary rounded-full">
					Return to donate
				</Link>
			</div>
		);
	}

	const symbol =
		donation.currency === "GBP"
			? "£"
			: `${donation.currency} `;

	return (
		<div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto text-center">
			<CascadeAnimation animationDirection="down" parentClassName="space-y-6">
				<div
					ref={iconRef}
					className="mx-auto w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-xl ring-4 ring-primary/20">
					<LuHeart className="w-12 h-12" />
				</div>

				<span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.18em] rounded-full px-4 py-1.5">
					<LuShieldCheck className="w-3.5 h-3.5" />
					Payment received
				</span>

				<h1 className="text-4xl sm:text-5xl font-extrabold text-neutral leading-tight">
					Thank you
					{donation.donorName ? (
						<>
							,{" "}
							<span className="text-primary">
								{donation.donorName.split(" ")[0]}
							</span>
						</>
					) : null}
					!
				</h1>

				<p className="text-lg text-neutral/70">
					Your{" "}
					{donation.recurring ? (
						<span className="inline-flex items-center gap-1 font-semibold text-primary">
							<LuRepeat2 className="w-4 h-4" />
							monthly
						</span>
					) : (
						"one-time"
					)}{" "}
					gift of{" "}
					<span className="font-extrabold text-neutral text-2xl">
						{symbol}
						{donation.amount.toFixed(2)}
					</span>{" "}
					for{" "}
					<strong className="text-primary">
						{donation.designation}
					</strong>{" "}
					helps us bring hope to those who need it most.
				</p>

				<div
					className={cn(
						"rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-sm text-left space-y-2",
					)}>
					<p className="text-sm text-neutral/60">
						A receipt has been sent to your email from Stripe.
					</p>
					<p className="text-sm text-neutral/70">
						Your generosity fuels education, welfare, and
						community programmes across the UK, Nigeria and
						Zimbabwe.
					</p>
				</div>

				<div className="flex flex-wrap gap-3 justify-center pt-4">
					<Link
						href="/support"
						className="btn btn-primary rounded-full px-7 shadow-lg">
						<LuHouse className="w-4 h-4" />
						Back to support
					</Link>
					<Link
						href="/programs"
						className="btn btn-outline rounded-full px-7">
						Explore programmes
						<LuArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</CascadeAnimation>
		</div>
	);
}

export default ThankYouCelebration;
