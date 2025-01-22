const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	daisyui: {
		themes: [
			{
				bumblebee: {
					...require("daisyui/src/theming/themes")["bumblebee"],
					primary: "#FFD360",
					secondary: "#FF6600",
				},
			},
		],
	},
};
export default config;
