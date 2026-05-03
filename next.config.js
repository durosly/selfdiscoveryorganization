/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./image-loader.js",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "**",
			},
		],
		deviceSizes: [640, 750, 828, 1080, 1200],
	},
};

module.exports = nextConfig;
