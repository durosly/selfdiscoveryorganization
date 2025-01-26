import CascadeAnimation from "@/app/components/animations/cascade-animation";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

function Footer() {
	return (
		<>
			<footer className="footer p-10 bg-base-200 text-base-content mt-20">
				<CascadeAnimation parentElement="nav">
					<header className="footer-title">Programmes</header>
					<a className="link link-hover">
						Families and Prisoners Initiative (FAPI)
					</a>
					<a className="link link-hover">Menstrual Hygiene Day</a>
					<a className="link link-hover">
						Debate and Quiz Competition
					</a>
					<a className="link link-hover">
						Send a Child to School Scheme (SACTS)
					</a>
					<a className="link link-hover">
						Monthly Podcast: My Self-Discovery Story
					</a>
					<a className="link link-hover">And more...</a>
				</CascadeAnimation>
				<CascadeAnimation parentElement="nav" animationDelay={0.5}>
					<header className="footer-title">Company</header>
					<Link href="/about-us" className="link link-hover">
						About us
					</Link>
					<Link href="/programs" className="link link-hover">
						Programs / events
					</Link>
					<Link href="/support" className="link link-hover">
						Become a sponsor
					</Link>
					<Link href="/legal" className="link link-hover">
						Legal
					</Link>
				</CascadeAnimation>
				<CascadeAnimation parentElement="nav" animationDelay={1}>
					<header className="footer-title">Contact Us</header>
					<a
						href="tel:+447301046564"
						className="link link-hover inline-flex gap-2 items-center">
						<LuPhone className=" stroke-current" />{" "}
						+447301046564
					</a>
					<a
						href="mailto:selfdisoveryorganiztion@gmail.com"
						className="link link-hover inline-flex gap-2 items-center">
						<LuMail className="stroke-current" />
						selfdisoveryorganiztion@gmail.com
					</a>
					<a className=" inline-flex gap-2 items-center">
						<LuMapPin className="stroke-current" />
						40 saint Austell avenue Macclesfield,
						<br /> SK10 3nn England,
						<br /> United Kingdom
					</a>
				</CascadeAnimation>
			</footer>
			<footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
				<aside className="items-center grid-flow-col">
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
					<p>
						Self Discovery organization <br />
						Healing the world of it&apos;s infirmities by
						uniting people with a sense of purpose.
					</p>
				</aside>
				<nav className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						<a
							href="https://tiktok.com/@selfdiscoveryorg"
							target="_blank">
							<FaTiktok className="w-6 h-6 fill-current" />
						</a>
						<a
							href="https://instagram.com/selfdiscoveryorganization"
							target="_blank">
							<FaInstagram className="w-6 h-6 fill-current" />
						</a>

						<a
							href="https://x.com/selfdiscoveryog"
							target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								className="fill-current w-6 h-6">
								{/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
								<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
							</svg>
						</a>
						<a
							href="https://threads.net/selfdiscoveryorganization"
							target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="fill-current w-6 h-6">
								{/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
								<path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
							</svg>
						</a>
					</div>
				</nav>
			</footer>
		</>
	);
}

export default Footer;
