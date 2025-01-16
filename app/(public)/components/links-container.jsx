import Link from "next/link";

function LinksWrapper() {
	return (
		<>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/programs">Programs</Link>
			</li>
			<li>
				<Link href="/about-us">About Us</Link>
			</li>
			<li>
				<Link href="/contact-us">Contact</Link>
			</li>
			<li>
				<Link href="/support">Sponsorship</Link>
			</li>
		</>
	);
}

export default LinksWrapper;
