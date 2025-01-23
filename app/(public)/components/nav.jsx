import Image from "next/image";
import Link from "next/link";
import { LuPhone, LuMail, LuDroplet, LuMenu } from "react-icons/lu";
import logo from "@/public/images/logo.png";
import LinksWrapper from "@/app/(public)/components/links-container";

function NavBar() {
	return (
		<>
			<div className="bg-black text-white py-2 px-5 flex items-center justify-end gap-5">
				<div className="flex items-center gap-1">
					<LuPhone className="w-5 h-5 stroke-white" />
					<a
						href="tel:+2348111461988"
						className="text-xs sm:text-base">
						+2348111461988
					</a>
				</div>
				<a href="mailto: team@chiomaorganization.com">
					<LuMail className="w-5 h-5 stroke-white" />
				</a>
				<Link
					href="/support"
					className="flex items-center gap-1 btn btn-xs sm:btn-sm btn-primary">
					<LuDroplet className="w-5 h-5 stroke-white" />
					<span>Donate</span>
				</Link>
			</div>
			<div className="w-full sticky bg-white top-0 z-[9999]">
				<div className="navbar">
					<div className="flex-none lg:hidden">
						<label
							htmlFor="my-drawer-3"
							className="btn btn-square btn-ghost">
							<LuMenu className="inline-block w-6 h-6 stroke-current" />
						</label>
					</div>
					<div className="flex-1 px-2 mx-2 space-x-2">
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
					<div className="flex-none hidden lg:block">
						<ul className="menu menu-horizontal">
							{/* Navbar menu content here */}
							<LinksWrapper />
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default NavBar;
