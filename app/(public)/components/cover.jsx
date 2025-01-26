import React from "react";
import { LuGrip } from "react-icons/lu";

function CoverImage({ title }) {
	return (
		<div
			className="px-10 h-52 relative bg-bottom bg-fixed bg-no-repeat bg-cover"
			style={{
				backgroundImage:
					"linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(/images/fapi.jpg)",
			}}>
			<div className="inline-block text-right absolute bottom-4 left-10">
				<h1 className="text-2xl sm:text-6xl text-left text-white">
					{title}
				</h1>
			</div>
			<LuGrip className="stroke-white w-8 h-8 sm:w-14 sm:h-14 inline-block absolute bottom-4 right-4" />
		</div>
	);
}

export default CoverImage;
