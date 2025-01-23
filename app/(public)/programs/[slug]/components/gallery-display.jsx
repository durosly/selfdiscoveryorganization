"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { LuX } from "react-icons/lu";

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
	const [currentImage, setCurrentImage] = useState(null);

	const handleViewChange = (newView) => {
		setView(newView);
	};

	function handleClickedImage({ image }) {
		setCurrentImage(image);
		document.getElementById("image-modal").showModal();
	}

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
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{images.map((image, index) => (
						<div
							key={index}
							className="relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer"
							onClick={() =>
								handleClickedImage({ image })
							}>
							<Image
								src={`${image}`}
								alt={`Gallery Image ${index + 1}`}
								fill
								className="object-cover"
								sizes="(min-width: 780px) calc(33.33vw - 37px), (min-width: 640px) calc(50vw - 48px), calc(100vw - 40px)"
							/>
						</div>
					))}
				</div>
			) : (
				<Slider {...settings}>
					{images.map((image, index) => (
						<div
							key={index}
							className="relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer"
							onClick={() =>
								handleClickedImage({ image })
							}>
							<Image
								src={`${image}`}
								alt={`Gallery Image ${index + 1}`}
								fill
								className="object-cover"
								sizes="(min-width: 780px) calc(33.33vw - 37px), (min-width: 640px) calc(50vw - 48px), calc(100vw - 40px)"
							/>
						</div>
					))}
				</Slider>
			)}

			{/* Open the modal using document.getElementById('ID').showModal() method */}
			{/* <button className="btn" onClick={()=>document.getElementById('image-modal').showModal()}>open modal</button> */}
			<dialog id="image-modal" className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							<LuX />
						</button>
					</form>
					{currentImage && (
						<div className="relative w-full h-96 rounded-2xl overflow-hidden">
							<Image
								src={`${currentImage}`}
								alt="Gallery Image"
								fill
								className="object-contain"
							/>
						</div>
					)}
					<p className="py-4">
						Press ESC key or click outside to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ProgramGalleryDisplay;
