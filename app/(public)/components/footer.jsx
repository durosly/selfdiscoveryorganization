import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

function Footer() {
	return (
		<>
			<footer className="footer p-10 bg-base-200 text-base-content mt-20">
				<nav>
					<header className="footer-title">Services</header>
					<a className="link link-hover">Health</a>
					<a className="link link-hover">Education</a>
					<a className="link link-hover">Housing</a>
					<a className="link link-hover">And more...</a>
				</nav>
				<nav>
					<header className="footer-title">Company</header>
					<Link href="/about-us" className="link link-hover">
						About us
					</Link>
					<Link href="/programs" className="link link-hover">
						Programs / events
					</Link>

					{/* <a className="link link-hover">Contact</a> */}
					{/* <a className="link link-hover">Volunter</a> */}
					<Link href="/support" className="link link-hover">
						Become a sponsor
					</Link>
					<Link href="/legal" className="link link-hover">
						Legal
					</Link>
				</nav>
				<nav>
					<header className="footer-title">Contact Us</header>
					<a
						href="tel:+2348111461988"
						className="link link-hover inline-flex gap-2 items-center">
						<LuPhone className=" stroke-current" />{" "}
						+2348111461988
					</a>
					<a
						href="mailto: team@chiomaorganization.com"
						className="link link-hover inline-flex gap-2 items-center">
						<LuMail className="stroke-current" />
						team@chiomaorganization.com
					</a>
					<a className=" inline-flex gap-2 items-center">
						<LuMapPin className="stroke-current" />
						20, digbori street
					</a>
					{/* <a className="link link-hover">Privacy policy</a>
					<a className="link link-hover">Cookie policy</a> */}
				</nav>
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
						Helping to make the world a better place
					</p>
				</aside>
				<nav className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						<a
							href="https://www.tiktok.com/@ch.onwenonyeorganization?_t=8fnEGYHEibR&_r=1"
							target="_blank">
							<FaTiktok className="w-6 h-6 fill-current" />
						</a>
						<a
							href="https://instagram.com/chiomaonwenonyeorganization?igshid=MzMyNGUyNmU2YQ=="
							target="_blank">
							<FaInstagram className="w-6 h-6 fill-current" />
						</a>
						<a
							href="https://www.youtube.com/watch?v=Pe7ottLgVf0"
							target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current">
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
							</svg>
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=100095272405672&mibextid=D4KYlr"
							target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current">
								<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
							</svg>
						</a>
					</div>
				</nav>
			</footer>
		</>
	);
}

export default Footer;
