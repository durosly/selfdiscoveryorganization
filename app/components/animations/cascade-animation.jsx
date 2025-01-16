"use client";

import { useEffect, useRef, createElement } from "react";
import { animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CascadeAnimation = ({
	children,
	triggerOnce = true,
	animationDirection = "up",
	delayIncrement = 0.2,
	duration = 0.5,
	initialOpacity = 0,
	initialPosition = 50,
	stiffness = 100,
	damping = 8,
	parentClassName = "",
	parentElement = "div",
	animationDelay = 0, // New prop for delay before animation trigger
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce,
		threshold: 0.4,
	});

	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current) {
			const elements = containerRef.current.children;

			// Set initial styles before animation
			Array.from(elements).forEach((element) => {
				element.style.opacity = initialOpacity;
				if (animationDirection === "up" || animationDirection === "down") {
					element.style.transform = `translateY(${
						animationDirection === "up"
							? initialPosition
							: -initialPosition
					}px)`;
				} else if (
					animationDirection === "left" ||
					animationDirection === "right"
				) {
					element.style.transform = `translateX(${
						animationDirection === "left"
							? initialPosition
							: -initialPosition
					}px)`;
				}
			});
		}

		if (inView && containerRef.current) {
			const elements = containerRef.current.children;

			setTimeout(() => {
				Array.from(elements).forEach((element, index) => {
					const animationProps =
						animationDirection === "up"
							? { y: [-initialPosition, 0] }
							: animationDirection === "down"
							? { y: [initialPosition, 0] }
							: animationDirection === "left"
							? { x: [initialPosition, 0] }
							: { x: [-initialPosition, 0] };

					animate(
						element,
						{ ...animationProps, opacity: [initialOpacity, 1] },
						{
							type: "spring",
							stiffness,
							damping,
							delay: index * delayIncrement,
						}
					);
				});
			}, animationDelay * 1000); // Apply the animation delay
		}
	}, [
		inView,
		animationDirection,
		delayIncrement,
		duration,
		initialOpacity,
		initialPosition,
		stiffness,
		damping,
		animationDelay,
	]);

	return createElement(
		parentElement,
		{
			ref: (node) => {
				ref(node);
				containerRef.current = node;
			},
			className: parentClassName,
			...restProps,
		},
		children
	);
};

export default CascadeAnimation;
