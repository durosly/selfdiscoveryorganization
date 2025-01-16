/** @type {import('next').NextConfig} */
const path = require("path");
const { NormalModuleReplacementPlugin } = require("webpack");

const nextConfig = {
	images: {
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
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.plugins = config.plugins || [];
		config.plugins.push(
			new NormalModuleReplacementPlugin(
				/email\/render/,
				path.resolve(__dirname, "./renderEmailFix.js")
			)
		);
		// Important: return the modified config
		return config;
	},
};

module.exports = nextConfig;
