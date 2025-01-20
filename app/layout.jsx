import ClientWrapper from "./components/client-wrapper";
import ToastWrapper from "./components/toastWrapper";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
	themeColor: "#FFD360",
};

export const metadata = {
	title: {
		template: "%s | Self Discovery organization ",
		default: "Helping to make the world a better place", // a default is required when creating a template
	},
	description:
		"At Self Discovery organization, we believe in making a positive impact, one step at a time. Our organization is built on the pillars of compassion, empowerment, and change. With a heartfelt commitment to bettering the world around us, we are dedicated to creating a brighter future for all",
	keywords: ["children", "Poor", "Charity", "Helping"],
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL),

	openGraph: {
		images: "/images/cover.png",
		title: "Self Discovery organization",
		description:
			"At Self Discovery organization, we believe in making a positive impact, one step at a time. Our organization is built on the pillars of compassion, empowerment, and change. With a heartfelt commitment to bettering the world around us, we are dedicated to creating a brighter future for all",
		url: process.env.NEXT_PUBLIC_URL,
		siteName: "Self Discovery organization",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Self Discovery organization",
		description:
			"At Self Discovery organization, we believe in making a positive impact, one step at a time. Our organization is built on the pillars of compassion, empowerment, and change. With a heartfelt commitment to bettering the world around us, we are dedicated to creating a brighter future for all",

		images: ["/images/cover.png"],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientWrapper>
					{children}
					<ToastWrapper />
				</ClientWrapper>
			</body>
		</html>
	);
}
