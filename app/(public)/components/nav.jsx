import LinksWrapper from "@/app/(public)/components/links-container";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuHeart, LuMail, LuMapPin, LuMenu, LuPhone } from "react-icons/lu";

function NavBar() {
	return (
		<>
			<div className="hidden md:flex bg-neutral text-neutral-content text-sm py-2.5 px-6 items-center justify-between gap-6">
				<div className="flex items-center gap-5">
					<a
						href="mailto:selfdiscoveryorganization@gmail.com"
						className="inline-flex items-center gap-2 hover:text-primary transition-colors">
						<LuMail className="w-4 h-4" />
						selfdiscoveryorganization@gmail.com
					</a>
					<span className="inline-flex items-center gap-2 opacity-80">
						<LuMapPin className="w-4 h-4" /> Macclesfield, UK
					</span>
				</div>
				<div className="flex items-center gap-4">
					<a
						href="tel:+447301046564"
						className="inline-flex items-center gap-2 hover:text-primary transition-colors">
						<LuPhone className="w-4 h-4" />
						+44 7301 046564
					</a>
					<span className="opacity-30">|</span>
					<div className="flex items-center gap-3">
						<a
							href="https://instagram.com/selfdiscoveryorganization"
							target="_blank"
							aria-label="Instagram"
							className="hover:text-primary transition-colors">
							<FaInstagram className="w-4 h-4" />
						</a>
						<a
							href="https://tiktok.com/@selfdiscoveryorg"
							target="_blank"
							aria-label="TikTok"
							className="hover:text-primary transition-colors">
							<FaTiktok className="w-4 h-4" />
						</a>
					</div>
				</div>
			</div>

			<div className="w-full sticky bg-base-100/90 backdrop-blur top-0 z-9999 border-b border-base-300/60 shadow-sm">
				<div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex-none lg:hidden">
						<label
							htmlFor="my-drawer-3"
							aria-label="Open menu"
							className="btn btn-square btn-ghost">
							<LuMenu className="inline-block w-6 h-6 stroke-current" />
						</label>
					</div>
					<div className="flex-1 px-2 mx-2 gap-3">
						<Link
							href="/"
							className="flex items-center gap-3">
							<div className="relative h-11 aspect-square">
								<Image
									src={logo}
									alt="Self Discovery organization"
									placeholder="blur"
									fill
									priority
									sizes="44px"
								/>
							</div>
							<div className="flex flex-col leading-tight">
								<span className="font-extrabold text-lg text-neutral">
									Self Discovery
								</span>
								<span className="text-xs uppercase tracking-[0.18em] text-neutral/60">
									Organization
								</span>
							</div>
						</Link>
					</div>
					<div className="flex-none hidden lg:block">
						<ul className="menu menu-horizontal gap-1 text-base font-medium">
							<LinksWrapper />
						</ul>
					</div>
					<div className="flex-none ml-2">
						<Link
							href="/support"
							className="btn btn-primary rounded-full px-5 shadow-md hover:shadow-lg">
							<LuHeart className="w-4 h-4" />
							<span className="hidden sm:inline">
								Donate Now
							</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default NavBar;
