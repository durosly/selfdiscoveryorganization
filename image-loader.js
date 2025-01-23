"use client";

export default function myImageLoader({ src, width, quality }) {
	if (src.startsWith("http") || src.includes("/_next") || src.startsWith("/images")) {
		return `${src}?w=${width}&q=${quality || 75}`;
	}

	const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
	return `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${params.join("/")}/${src}`;
}
