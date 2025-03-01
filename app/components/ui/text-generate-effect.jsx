"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({ words, className, filter = true, duration = 0.5 }) => {
	const [scope, animate] = useAnimate();
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
	let wordsArray = words.split(" ");

	useEffect(() => {
		if (inView) {
			animate(
				"span",
				{
					opacity: 1,
					filter: filter ? "blur(0px)" : "none",
				},
				{
					duration: duration ? duration : 1,
					delay: stagger(0.2),
				}
			);
		}
	}, [inView, animate, duration, filter]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx}
							className="dark:text-white text-black opacity-0"
							style={{
								filter: filter
									? "blur(10px)"
									: "none",
							}}>
							{word}{" "}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div className={cn("font-bold", className)} ref={ref}>
			<div>
				<div className="text-black text-2xl leading-snug tracking-wide">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
