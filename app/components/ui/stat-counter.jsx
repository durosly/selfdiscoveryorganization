"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

function StatCounter({ value, duration = 1.6 }) {
	const numeric = typeof value === "number" ? value : parseFloat(value);
	const hasNumber = !Number.isNaN(numeric);
	const [display, setDisplay] = useState(hasNumber ? 0 : value);
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
	const animatedRef = useRef(false);

	useEffect(() => {
		if (!hasNumber || !inView || animatedRef.current) return;
		animatedRef.current = true;
		const controls = animate(0, numeric, {
			duration,
			ease: "easeOut",
			onUpdate(latest) {
				setDisplay(
					Number.isInteger(numeric)
						? Math.round(latest)
						: latest.toFixed(1),
				);
			},
		});
		return () => controls.stop?.();
	}, [hasNumber, numeric, inView, duration]);

	return <span ref={ref}>{display}</span>;
}

export default StatCounter;
