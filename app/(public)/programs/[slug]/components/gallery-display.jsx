"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

function ProgramGalleryDisplay({ images }) {
	const [view, setView] = useState("grid");

	const handleViewChange = (newView) => {
		setView(newView);
	};

	return (
		<>
			<div className="flex gap-2 justify-center mb-5">
				<button
					className={`btn btn-sm ${
						view === "grid" ? "btn-primary" : ""
					}`}
					onClick={() => handleViewChange("grid")}>
					Grid View
				</button>
				<button
					className={`btn btn-sm ${
						view === "slider" ? "btn-primary" : ""
					}`}
					onClick={() => handleViewChange("slider")}>
					Slider View
				</button>
			</div>
			{view === "grid" ? (
				<div className="grid grid-cols-3 gap-4">
					{images.map((image, index) => (
						<div
							key={index}
							className="relative w-full h-64 rounded-2xl overflow-hidden">
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${image}`}
								alt={`Gallery Image ${index + 1}`}
								fill
								className="object-cover"
							/>
						</div>
					))}
				</div>
			) : (
				<Slider {...settings}>
					{images.map((image, index) => (
						<div
							key={index}
							className="relative w-full h-64 rounded-2xl overflow-hidden">
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${image}`}
								alt={`Gallery Image ${index + 1}`}
								fill
								className="object-cover"
							/>
						</div>
					))}
				</Slider>
			)}
		</>
	);
}

export default ProgramGalleryDisplay;
