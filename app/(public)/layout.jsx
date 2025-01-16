import NavBar from "@/app/(public)/components/nav";
import Image from "next/image";
import LinksWrapper from "./components/links-container";
import Footer from "@/app/(public)/components/footer";
import logo from "@/public/images/logo.png";
import { NavigationEvents } from "./components/navigation-event";
import { Suspense } from "react";
import CascadeAnimation from "../components/animations/cascade-animation";

export default function PublicLayout({ children }) {
	return (
		<div className="drawer">
			<Suspense>
				<NavigationEvents />
			</Suspense>
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<NavBar />

				{/* Page content here */}
				<main className="space-y-20">{children}</main>
				<Footer />
			</div>
			<div className="drawer-side z-[9999]">
				<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
				<div className="p-4 w-80 min-h-full bg-base-200">
					<div className="flex items-center px-2 mx-2 gap-2">
						<div className="relative h-10 aspect-square">
							<Image
								src={logo}
								alt="Self Discovery organization"
								placeholder="blur"
								fill
								priority
								sizes="40px"
							/>
						</div>
						<div className="flex flex-col text-xs">
							<span className="font-bold">
								Self Discovery
							</span>
							<span>Organization</span>
						</div>
					</div>
					<CascadeAnimation
						parentElement="ul"
						parentClassName="menu"
						animationDirection="right"
						triggerOnce={false}>
						{/* Sidebar content here */}
						<LinksWrapper />
					</CascadeAnimation>
					{/* <ul className="menu ">
					</ul> */}
				</div>
			</div>
		</div>
	);
}
