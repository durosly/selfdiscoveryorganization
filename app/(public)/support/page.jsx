import CascadeAnimation from "@/app/components/animations/cascade-animation";
import CauseCard from "@/app/components/ui/cause-card";
import ImageCollage from "@/app/components/ui/image-collage";
import { ImagesSlider } from "@/app/components/ui/images-slider";
import SectionHeading from "@/app/components/ui/section-heading";
import StatCard from "@/app/components/ui/stat-card";
import Link from "next/link";
import { BsBank2, BsCreditCard2Front, BsPaypal } from "react-icons/bs";
import {
	LuArrowRight,
	LuCheck,
	LuGraduationCap,
	LuHandHeart,
	LuHeart,
	LuLightbulb,
	LuShieldCheck,
	LuSoup,
	LuSparkles,
	LuTarget,
	LuUsers,
} from "react-icons/lu";
import DonationForm from "./components/donation-form";

export const revalidate = 60;

export const metadata = {
	title: "Donate — Give Today. Change a Life.",
	description:
		"Support Self Discovery Organization's humanitarian work. Choose an amount, give once or monthly, and help fund education, welfare and community initiatives across the UK, Nigeria and Zimbabwe.",
	openGraph: {
		title: "Give Today. Change a Life. — Self Discovery Organization",
		description:
			"Your gift helps us reach vulnerable families, support children's education and restore hope.",
		type: "website",
	},
};

const supportCards = [
	{
		title: "Send a Child to School Scheme",
		description:
			"Helping disadvantaged children with tuition, learning materials, uniforms and educational support.",
		icon: LuGraduationCap,
		image: "/images/child-to-school.jpg",
		tag: "Education",
	},
	{
		title: "Families and Prisoners Initiative",
		description:
			"Welfare support for indigent families plus dignity items, encouragement and care for prisoners.",
		icon: LuHandHeart,
		image: "/images/fapi.jpg",
		tag: "Social Justice",
	},
	{
		title: "Menstrual Hygiene & Youth Empowerment",
		description:
			"Supporting girls and young people with dignity materials, education and practical empowerment.",
		icon: LuSparkles,
		image: "/images/pad.jpg",
		tag: "Health",
	},
	{
		title: "Community Support & Leadership",
		description:
			"Building purpose-driven communities through mentorship, conferences, outreach and support programmes.",
		icon: LuUsers,
		image: "/images/podcast.jpg",
		tag: "Leadership",
	},
];

const impactStatements = [
	"Supported children with school fees and educational needs",
	"Reached families in need with food and welfare items",
	"Extended hope and practical care to prisoners",
	"Empowered young people through purpose-driven programmes",
	"Launched humanitarian initiatives across the UK, Nigeria and Zimbabwe",
];

function DonatePage() {
	return (
		<>
			<ImagesSlider
				images={[
					"/images/slide/1.jpg",
					"/images/slide/3.jpg",
					"/images/slide/5.jpg",
					"/images/slide/7.jpg",
				]}
				className={"h-[calc(100dvh-4rem)] min-h-[560px]"}
				direction="down">
				<div className="relative z-50 text-base-100 px-6 max-w-4xl">
					<span className="inline-flex items-center gap-2 bg-primary/95 text-primary-content text-xs font-bold uppercase tracking-[0.18em] rounded-full px-4 py-1.5 mb-6">
						<LuHeart className="w-3.5 h-3.5" />
						Be the reason someone smiles today
					</span>
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-md">
						Give Today.{" "}
						<span className="text-primary">Change a Life.</span>
					</h1>
					<p className="mt-6 max-w-2xl text-base sm:text-lg opacity-90 backdrop-blur-sm bg-neutral/25 p-4 rounded-2xl">
						Your support helps us reach vulnerable families,
						support children&apos;s education, empower young
						people and restore hope through the work of Self
						Discovery Organization.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="#donation-form"
							className="btn btn-primary rounded-full px-7 shadow-lg">
							<LuHeart className="w-4 h-4" /> Donate Now
						</a>
						<a
							href="#impact"
							className="btn btn-outline rounded-full px-7 text-base-100 border-base-100 hover:bg-base-100 hover:text-neutral">
							See Our Impact
						</a>
					</div>
				</div>
			</ImagesSlider>

			<section
				aria-labelledby="mission"
				className="px-6 sm:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
				<ImageCollage
					primarySrc="/images/global-happiness-1.jpg"
					secondarySrc="/images/global-happiness-2.jpg"
					primaryAlt="Self Discovery beneficiaries"
					secondaryAlt="Hope through purpose"
				/>
				<CascadeAnimation
					animationDirection="right"
					parentClassName="space-y-5">
					<SectionHeading
						eyebrow="Why Your Giving Matters"
						title="From struggle to hope — together."
						align="left"
						eyebrowIcon={LuLightbulb}
					/>
					<p className="text-neutral/70 leading-relaxed">
						Self Discovery Organization is a UK-registered
						charity committed to healing the world of its
						challenges by uniting people with a sense of
						purpose. Through education, humanitarian outreach,
						leadership development and community support, we
						are helping individuals and families move from
						struggle to hope.
					</p>
					<ul className="grid sm:grid-cols-2 gap-3 text-sm">
						{[
							"Children empowered with education",
							"Families supported with food & welfare",
							"Communities mobilised with purpose",
							"Prisoners reached with dignity",
						].map((item) => (
							<li
								key={item}
								className="flex items-center gap-2 bg-base-200 px-4 py-3 rounded-xl">
								<span className="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center shrink-0">
									<LuCheck className="w-4 h-4" />
								</span>
								<span className="font-semibold">{item}</span>
							</li>
						))}
					</ul>
				</CascadeAnimation>
			</section>

			<section
				id="donate"
				aria-labelledby="donate-form"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<SectionHeading
					eyebrow="Choose an Amount"
					title="Make a gift in under a minute."
					subtitle="Pick a tier, choose a focus area, and check out securely with PayPal."
					eyebrowIcon={LuTarget}
				/>
				<div className="mt-12">
					<DonationForm />
				</div>
			</section>

			<section
				aria-labelledby="cards"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<SectionHeading
					eyebrow="Your Gift, Real Impact"
					title="Your gift makes real impact possible."
					subtitle="Every contribution is allocated transparently to one of our flagship programmes."
					eyebrowIcon={LuHeart}
				/>
				<CascadeAnimation
					animationDirection="down"
					parentClassName="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{supportCards.map((card) => (
						<CauseCard key={card.title} {...card} />
					))}
				</CascadeAnimation>
			</section>

			<section
				id="impact"
				aria-labelledby="impact-heading"
				className="bg-neutral text-neutral-content py-16 px-6 sm:px-10">
				<div className="max-w-7xl mx-auto">
					<SectionHeading
						eyebrow="Your Generosity at Work"
						title="Every gift becomes meaningful change."
						subtitle="A snapshot of what your support has already made possible."
						eyebrowIcon={LuSparkles}
						className="text-base-100"
						titleClassName="text-base-100"
						subtitleClassName="text-base-100/70"
					/>

					<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
						<StatCard
							value={37}
							suffix="+"
							label="Children supported in one intervention"
							icon={LuGraduationCap}
							className="bg-base-100/5 border-base-100/10 text-neutral-content"
						/>
						<StatCard
							value={25}
							label="Families reached with food support"
							icon={LuSoup}
							className="bg-base-100/5 border-base-100/10 text-neutral-content"
						/>
						<StatCard
							value={400}
							suffix="+"
							label="Hundreds fed through outreach"
							icon={LuUsers}
							className="bg-base-100/5 border-base-100/10 text-neutral-content"
						/>
					</div>

					<ul className="mt-10 grid md:grid-cols-2 gap-3 text-sm">
						{impactStatements.map((statement) => (
							<li
								key={statement}
								className="flex items-start gap-3 bg-base-100/5 border border-base-100/10 rounded-2xl px-5 py-4">
								<span className="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center shrink-0">
									<LuCheck className="w-4 h-4" />
								</span>
								<span>{statement}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section
				aria-labelledby="trust"
				className="px-6 sm:px-10 max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
				<SectionHeading
					eyebrow="Give with Confidence"
					title="Integrity, compassion, stewardship."
					align="left"
					subtitle="Self Discovery Organization is a UK-registered charity. We are committed to using every gift responsibly."
					eyebrowIcon={LuShieldCheck}
				/>
				<div className="grid sm:grid-cols-3 gap-5">
					{[
						{
							title: "UK-Registered Charity",
							desc: "A registered Charitable Incorporated Organisation (CIO).",
							icon: LuShieldCheck,
						},
						{
							title: "Secure Payment Processing",
							desc: "Donations processed through PayPal's enterprise-grade security.",
							icon: LuCheck,
						},
						{
							title: "Transparent Use of Funds",
							desc: "Funds tracked by designation and reported to our community.",
							icon: LuHeart,
						},
					].map((badge) => (
						<div
							key={badge.title}
							className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm">
							<div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-4">
								<badge.icon className="w-6 h-6" />
							</div>
							<h3 className="font-bold text-lg text-neutral">
								{badge.title}
							</h3>
							<p className="text-sm text-neutral/70 mt-1">
								{badge.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			<section
				aria-labelledby="payment-options"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<SectionHeading
					eyebrow="Ways to Give"
					title="Pick what works for you."
					subtitle="More payment methods are coming soon."
					eyebrowIcon={LuHeart}
				/>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
					<div className="rounded-3xl bg-base-100 border-2 border-primary/40 p-6 shadow-sm flex flex-col">
						<div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-3">
							<BsPaypal className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-lg text-neutral">
							PayPal
						</h3>
						<p className="text-sm text-neutral/70 mt-1 grow">
							Donate securely with your PayPal account, debit
							or credit card. One-time and monthly giving
							supported.
						</p>
						<a
							href="#donation-form"
							className="btn btn-primary rounded-full mt-4">
							Give with PayPal
						</a>
					</div>

					<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm flex flex-col opacity-90">
						<div className="w-12 h-12 rounded-2xl bg-base-200 text-neutral/60 flex items-center justify-center mb-3">
							<BsCreditCard2Front className="w-6 h-6" />
						</div>
						<div className="flex items-center gap-2">
							<h3 className="font-bold text-lg text-neutral">
								Card / Stripe
							</h3>
							<span className="badge badge-ghost text-xs">
								Coming soon
							</span>
						</div>
						<p className="text-sm text-neutral/70 mt-1 grow">
							Direct card checkout via Stripe will launch
							soon to give you another secure way to support
							our work.
						</p>
						<button
							type="button"
							disabled
							className="btn rounded-full mt-4 btn-disabled">
							Coming soon
						</button>
					</div>

					<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm flex flex-col">
						<div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-3">
							<BsBank2 className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-lg text-neutral">
							Bank Transfer
						</h3>
						<dl className="text-sm text-neutral/80 mt-2 space-y-1 grow">
							<div className="flex justify-between gap-2">
								<dt className="text-neutral/60">Bank</dt>
								<dd className="font-medium">Virgin Money</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt className="text-neutral/60">Account</dt>
								<dd className="font-medium">
									Self Discovery Organization
								</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt className="text-neutral/60">
									Sort code
								</dt>
								<dd className="font-mono">82-12-08</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt className="text-neutral/60">
									Account #
								</dt>
								<dd className="font-mono">00079508</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt className="text-neutral/60">IBAN</dt>
								<dd className="font-mono">
									GB19CLYD82120800079508
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>

			<section
				aria-labelledby="final-cta"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(31,41,51,0.92), rgba(31,41,51,0.55)), url(/images/collab-2.jpg)",
				}}
				className="text-center py-20 px-6 sm:px-10 space-y-6 bg-no-repeat bg-cover bg-center text-neutral-content overflow-hidden">
				<CascadeAnimation animationDirection="left">
					<span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-bold">
						Final Word
					</span>
					<h2
						id="final-cta"
						className="text-4xl sm:text-5xl font-extrabold mt-3 max-w-3xl mx-auto">
						Be the reason someone finds hope today.
					</h2>
				</CascadeAnimation>
				<CascadeAnimation animationDirection="right" animationDelay={0.3}>
					<p className="max-w-2xl mx-auto opacity-90">
						Every donation, whether big or small, helps us
						bring relief, restore dignity and inspire purpose.
						Partner with us today and become part of a vision
						that is transforming lives.
					</p>
				</CascadeAnimation>
				<CascadeAnimation
					animationDirection="down"
					animationDelay={0.6}
					duration={2}>
					<a
						href="#donation-form"
						className="btn btn-primary rounded-full px-8 shadow-xl">
						<LuHeart className="w-4 h-4" /> Donate now
					</a>
					<Link
						href="/programs"
						className="btn btn-outline rounded-full px-7 ml-3 text-base-100 border-base-100 hover:bg-base-100 hover:text-neutral">
						Explore our programmes{" "}
						<LuArrowRight className="w-4 h-4" />
					</Link>
				</CascadeAnimation>
			</section>
		</>
	);
}

export default DonatePage;
