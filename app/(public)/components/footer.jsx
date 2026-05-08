import CascadeAnimation from "@/app/components/animations/cascade-animation";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import {
	LuArrowRight,
	LuHeart,
	LuMail,
	LuMapPin,
	LuPhone,
} from "react-icons/lu";

function Footer() {
	return (
		<footer className="bg-neutral text-neutral-content mt-20">
			<div className="bg-primary/95 text-primary-content">
				<div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
					<div>
						<h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
							Be the reason someone finds hope today.
						</h3>
						<p className="mt-2 opacity-80 text-sm sm:text-base">
							Every gift, no matter the size, restores
							dignity and inspires purpose.
						</p>
					</div>
					<div className="flex md:justify-end">
						<Link
							href="/support"
							className="btn btn-neutral rounded-full px-6 shadow-lg">
							<LuHeart className="w-4 h-4" />
							Donate Now
						</Link>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 pt-14 pb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
				<CascadeAnimation parentClassName="space-y-4">
					<div className="flex items-center gap-3">
						<div className="relative h-12 aspect-square">
							<Image
								src={logo}
								alt="Self Discovery organization"
								placeholder="blur"
								fill
								sizes="48px"
							/>
						</div>
						<div className="flex flex-col leading-tight">
							<span className="font-extrabold text-lg">
								Self Discovery
							</span>
							<span className="text-xs uppercase tracking-[0.18em] opacity-70">
								Organization
							</span>
						</div>
					</div>
					<p className="text-sm opacity-80">
						A UK-registered charity healing the world of its
						challenges by uniting people with a sense of
						purpose.
					</p>
					<div className="flex items-center gap-3">
						<a
							href="https://instagram.com/selfdiscoveryorganization"
							target="_blank"
							aria-label="Instagram"
							className="w-9 h-9 rounded-full bg-base-100/10 hover:bg-primary hover:text-primary-content flex items-center justify-center transition-colors">
							<FaInstagram className="w-4 h-4" />
						</a>
						<a
							href="https://tiktok.com/@selfdiscoveryorg"
							target="_blank"
							aria-label="TikTok"
							className="w-9 h-9 rounded-full bg-base-100/10 hover:bg-primary hover:text-primary-content flex items-center justify-center transition-colors">
							<FaTiktok className="w-4 h-4" />
						</a>
						<a
							href="https://x.com/selfdiscoveryog"
							target="_blank"
							aria-label="X / Twitter"
							className="w-9 h-9 rounded-full bg-base-100/10 hover:bg-primary hover:text-primary-content flex items-center justify-center transition-colors">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								className="fill-current w-3.5 h-3.5">
								<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
							</svg>
						</a>
					</div>
				</CascadeAnimation>

				<CascadeAnimation parentClassName="space-y-3" animationDelay={0.2}>
					<header className="text-base font-bold uppercase tracking-[0.18em] text-primary">
						Programmes
					</header>
					<ul className="space-y-2 text-sm opacity-90">
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Families &amp; Prisoners Initiative
							</Link>
						</li>
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Menstrual Hygiene Day
							</Link>
						</li>
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Debate &amp; Quiz Competition
							</Link>
						</li>
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Send a Child to School Scheme
							</Link>
						</li>
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Self-Discovery Podcast
							</Link>
						</li>
					</ul>
				</CascadeAnimation>

				<CascadeAnimation parentClassName="space-y-3" animationDelay={0.4}>
					<header className="text-base font-bold uppercase tracking-[0.18em] text-primary">
						Company
					</header>
					<ul className="space-y-2 text-sm opacity-90">
						<li>
							<Link
								href="/about-us"
								className="hover:text-primary transition-colors">
								About Us
							</Link>
						</li>
						<li>
							<Link
								href="/programs"
								className="hover:text-primary transition-colors">
								Programs / Events
							</Link>
						</li>
						<li>
							<Link
								href="/support"
								className="hover:text-primary transition-colors">
								Donate
							</Link>
						</li>
						<li>
							<Link
								href="/contact-us"
								className="hover:text-primary transition-colors">
								Contact
							</Link>
						</li>
						<li>
							<Link
								href="/legal"
								className="hover:text-primary transition-colors">
								Legal
							</Link>
						</li>
					</ul>
				</CascadeAnimation>

				<CascadeAnimation parentClassName="space-y-3" animationDelay={0.6}>
					<header className="text-base font-bold uppercase tracking-[0.18em] text-primary">
						Stay In Touch
					</header>
					<ul className="space-y-2 text-sm opacity-90">
						<li className="inline-flex items-center gap-2">
							<LuPhone className="w-4 h-4 text-primary" />
							<a
								href="tel:+447301046564"
								className="hover:text-primary transition-colors">
								+44 7301 046564
							</a>
						</li>
						<li className="inline-flex items-center gap-2">
							<LuMail className="w-4 h-4 text-primary" />
							<a
								href="mailto:selfdiscoveryorganization@gmail.com"
								className="hover:text-primary transition-colors break-all">
								selfdiscoveryorganization@gmail.com
							</a>
						</li>
						<li className="inline-flex items-start gap-2">
							<LuMapPin className="w-4 h-4 text-primary mt-1" />
							<span>
								40 Saint Austell Avenue, Macclesfield,
								<br /> SK10 3NN, England, UK
							</span>
						</li>
					</ul>
					<form className="mt-3 flex items-center gap-0">
						<input
							type="email"
							placeholder="Your email address"
							className="input input-sm input-bordered bg-base-100/10 border-base-100/20 text-neutral-content placeholder:text-neutral-content/60 rounded-l-full rounded-r-none flex-1"
							aria-label="Email for newsletter"
						/>
						<button
							type="button"
							aria-label="Subscribe"
							className="btn btn-sm btn-primary rounded-r-full rounded-l-none">
							<LuArrowRight className="w-4 h-4" />
						</button>
					</form>
				</CascadeAnimation>
			</div>

			<div className="border-t border-base-100/10">
				<div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-sm opacity-80">
					<p>
						© {new Date().getFullYear()} Self Discovery
						Organization. All rights reserved.
					</p>
					<p>UK-Registered Charitable Incorporated Organisation.</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
