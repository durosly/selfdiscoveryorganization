import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
	FcBiotech,
	FcConferenceCall,
	FcGlobe,
	FcGraduationCap,
	FcHome,
	FcLike,
	FcPlanner,
} from "react-icons/fc";
import {
	LuArrowRight,
	LuAward,
	LuCheck,
	LuDroplets,
	LuGraduationCap,
	LuHandHeart,
	LuHeart,
	LuHexagon,
	LuMicVocal,
	LuNetwork,
	LuPersonStanding,
	LuShield,
	LuShrub,
	LuSoup,
	LuSparkles,
	LuSyringe,
	LuUsers,
} from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import { TbSchool } from "react-icons/tb";
import CascadeAnimation from "../components/animations/cascade-animation";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import CauseCard from "../components/ui/cause-card";
import ImageCollage from "../components/ui/image-collage";
import { ImagesSlider } from "../components/ui/images-slider";
import SectionHeading from "../components/ui/section-heading";
import StatCard from "../components/ui/stat-card";
import StatCounter from "../components/ui/stat-counter";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import ProgramListSummary from "./components/program-list";
import Teams from "./components/teams";

export const revalidate = 60;

const focusAreas = [
	{
		title: "Education",
		description:
			"By supporting us, you contribute towards providing quality education and empowering children with knowledge for a better tomorrow.",
		icon: TbSchool,
		color: "bg-rose-500/10 text-rose-600",
	},
	{
		title: "Food & Welfare",
		description:
			"Ensuring nutritious meals reach those who need them the most. Join us in fighting hunger and malnutrition.",
		icon: LuSoup,
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		title: "Medical Care",
		description:
			"Access to healthcare is a basic human right. Your donations bring quality healthcare closer to disadvantaged communities.",
		icon: LuSyringe,
		color: "bg-sky-500/10 text-sky-600",
	},
	{
		title: "Clean Water",
		description:
			"Providing safe drinking water sources and sanitation facilities to communities without access. Together, we can quench their thirst.",
		icon: LuDroplets,
		color: "bg-amber-500/10 text-amber-600",
	},
];

const causes = [
	{
		title: "Families & Prisoners Initiative (FAPI)",
		description:
			"Extending love to families in need and bringing hope to incarcerated individuals through tangible support and compassionate care.",
		imageSrc: "/images/fapi.jpg",
		tag: "Social Justice",
		icon: LuHandHeart,
		href: "/programs",
		progress: 72,
		raised: "£7,200",
		goal: "£10,000",
	},
	{
		title: "Menstrual Hygiene Day",
		description:
			"Empowering women and girls through awareness and access to dignity products. Together we break the stigma and promote healthier lives.",
		imageSrc: "/images/pad.jpg",
		tag: "Health & Equality",
		icon: LuSyringe,
		href: "/programs",
		progress: 58,
		raised: "£2,900",
		goal: "£5,000",
	},
	{
		title: "Send a Child to School Scheme",
		description:
			"Building brighter futures through access to education. SACTS ensures underprivileged children can pursue their dreams with the right support.",
		imageSrc: "/images/child-to-school.jpg",
		tag: "Education",
		icon: LuGraduationCap,
		href: "/programs",
		progress: 84,
		raised: "£8,400",
		goal: "£10,000",
	},
	{
		title: "Debate & Quiz Competition",
		description:
			"Inspiring young minds to think critically and creatively, shaping tomorrow's leaders through intellectual engagement.",
		imageSrc: "/images/debate.jpg",
		tag: "Education",
		icon: LuNetwork,
		href: "/programs",
		progress: 45,
		raised: "£1,800",
		goal: "£4,000",
	},
	{
		title: "Self-Discovery Podcast",
		description:
			"Sharing transformative journeys of purpose and growth so listeners can embrace their true potential and live meaningfully.",
		imageSrc: "/images/podcast.jpg",
		tag: "Personal Development",
		icon: LuMicVocal,
		href: "/programs",
		progress: 30,
		raised: "£900",
		goal: "£3,000",
	},
];

const galleryImages = [
	"/images/slide/1.jpg",
	"/images/slide/2.jpg",
	"/images/slide/3.jpg",
	"/images/slide/4.jpg",
	"/images/slide/5.jpg",
	"/images/slide/6.jpg",
	"/images/slide/7.jpg",
	"/images/global-happiness-1.jpg",
	"/images/global-happiness-2.jpg",
	"/images/more-people.jpg",
];

function PublicHomePage() {
	return (
		<>
			<ImagesSlider
				images={[
					`/images/slide/1.jpg`,
					`/images/slide/2.jpg`,
					`/images/slide/3.jpg`,
					`/images/slide/4.jpg`,
					`/images/slide/5.jpg`,
					`/images/slide/6.jpg`,
					`/images/slide/7.jpg`,
				]}
				className={"h-[calc(100dvh-4rem)] min-h-[620px]"}
				overlayClassName="bg-linear-to-r from-neutral/85 via-neutral/55 to-neutral/10"
				direction="down">
				<div className="relative z-50 w-full max-w-7xl mx-auto px-6 sm:px-10">
					<div className="max-w-3xl text-base-100">
						<span className="inline-flex items-center gap-2 bg-primary/95 text-primary-content text-xs font-bold uppercase tracking-[0.18em] rounded-full px-4 py-1.5 mb-6 shadow-lg">
							<LuHeart className="w-3.5 h-3.5" />
							Give them a chance
						</span>
						<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] drop-shadow-md">
							Give today.{" "}
							<span className="text-primary">
								Change a life.
							</span>
						</h1>
						<p className="mt-6 max-w-2xl text-base sm:text-lg opacity-90">
							Self Discovery is a UK-registered Charitable
							Incorporated Organisation with operations in
							Nigeria and Zimbabwe. We host impactful
							initiatives to uplift communities while
							inspiring individuals to live purpose-driven
							lives.
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Link
								href="/support"
								className="btn btn-primary rounded-full px-7 shadow-xl hover:shadow-primary/40 transition-shadow">
								<LuHeart className="w-4 h-4" /> Donate
								now
							</Link>
							<Link
								href="/about-us"
								className="btn btn-ghost rounded-full px-7 text-base-100 border border-base-100/40 hover:bg-base-100 hover:text-neutral">
								Learn more <LuArrowRight className="w-4 h-4" />
							</Link>
							<div className="flex items-center gap-3">
								<div className="flex -space-x-3">
									{[
										"/images/team/team-1.jpg",
										"/images/team/team-2.jpg",
										"/images/team/team-3.jpg",
										"/images/team/team-4.jpg",
									].map((src) => (
										<span
											key={src}
											className="relative w-9 h-9 rounded-full ring-2 ring-base-100 overflow-hidden">
											<Image
												src={src}
												alt=""
												fill
												className="object-cover"
												sizes="36px"
											/>
										</span>
									))}
								</div>
								<span className="text-sm opacity-90">
									Joined by{" "}
									<strong>400+</strong> changemakers
								</span>
							</div>
						</div>
					</div>

					<div className="hidden md:flex absolute right-10 bottom-6 items-center gap-6 text-base-100/90">
						<div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-80">
							<LuShield className="w-4 h-4" />
							UK-registered CIO
						</div>
						<div className="h-4 w-px bg-base-100/30" />
						<div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-80">
							<TbWorld className="w-4 h-4" />
							3 countries served
						</div>
					</div>
				</div>
			</ImagesSlider>

			<section
				aria-labelledby="focus-areas"
				className="px-6 sm:px-10 max-w-7xl mx-auto -mt-20 relative z-10">
				<CascadeAnimation
					parentClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
					animationDirection="down">
					{focusAreas.map((area) => (
						<div
							key={area.title}
							className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
							<span className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
							<div
								className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${area.color} mb-4 shadow-sm`}>
								<area.icon className="w-7 h-7" />
							</div>
							<h2 className="relative text-lg font-bold text-neutral">
								{area.title}
							</h2>
							<p className="relative text-sm text-neutral/70 mt-2 line-clamp-3">
								{area.description}
							</p>
							<Link
								href="/programs"
								className="relative mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-2 transition-all">
								Learn more <LuArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					))}
				</CascadeAnimation>
			</section>

			<section
				aria-labelledby="about-us"
				className="px-6 sm:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
				<div className="relative">
					<ImageCollage
						primarySrc="/images/global-happiness-1.jpg"
						secondarySrc="/images/global-happiness-2.jpg"
						primaryAlt="Communities we serve"
						secondaryAlt="Hope through purpose"
					/>
					<div className="absolute -top-2 right-2 sm:right-6 lg:right-0 bg-base-100 border border-base-300/60 rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
						<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
							<LuSparkles className="w-6 h-6" />
						</div>
						<div>
							<div className="text-2xl font-extrabold text-neutral leading-none">
								<StatCounter value={5} />+
							</div>
							<div className="text-xs text-neutral/60 mt-1">
								Years of impact
							</div>
						</div>
					</div>
				</div>
				<CascadeAnimation
					animationDirection="right"
					parentClassName="space-y-5">
					<SectionHeading
						eyebrow="Welcome to Self Discovery"
						title="You're the hope of others."
						align="left"
						eyebrowIcon={LuHexagon}
					/>
					<p className="text-neutral/70 leading-relaxed">
						At Self Discovery Organization, we are driven by a
						profound belief that when people come together to
						help one another, we can create a world filled
						with happiness, dignity and prosperity. We are
						dedicated to making a positive impact on lives
						across the globe.
					</p>
					<ul className="grid sm:grid-cols-2 gap-3 text-sm">
						{["Honesty", "Transparency", "Improvement", "Compassion"].map(
							(item) => (
								<li
									key={item}
									className="flex items-center gap-2 bg-base-200 px-4 py-3 rounded-xl">
									<span className="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center">
										<LuCheck className="w-4 h-4" />
									</span>
									<span className="font-semibold">
										{item}
									</span>
								</li>
							),
						)}
					</ul>
					<div className="flex flex-wrap items-center gap-5 pt-2">
						<Link
							href="/about-us"
							className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-primary/30 transition-shadow">
							Discover more <LuArrowRight className="w-4 h-4" />
						</Link>
						<a
							href="tel:+447301046564"
							className="text-sm flex items-center gap-3">
							<span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
								<LuHeart className="w-5 h-5" />
							</span>
							<span>
								<span className="block text-neutral/60 text-xs uppercase tracking-wider">
									Call us anytime
								</span>
								<span className="font-bold text-primary">
									+44 7301 046564
								</span>
							</span>
						</a>
					</div>
				</CascadeAnimation>
			</section>

			<section
				aria-labelledby="impact-stats"
				className="relative bg-neutral text-neutral-content py-20 px-6 sm:px-10 overflow-hidden">
				<div className="absolute inset-0 bg-dots opacity-20" />
				<span className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
				<span className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
				<div className="relative max-w-7xl mx-auto">
					<div className="text-center mb-10 max-w-2xl mx-auto">
						<span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
							<LuSparkles className="w-4 h-4" /> Our impact so far
						</span>
						<h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
							Real change, in real numbers.
						</h2>
					</div>
					<CascadeAnimation
						animationDirection="down"
						parentClassName="grid grid-cols-2 lg:grid-cols-4 gap-5">
						<StatCard
							value={37}
							suffix="+"
							label="Children supported"
							icon={LuGraduationCap}
							className="bg-base-100/5 border-base-100/10 text-neutral-content backdrop-blur-sm"
							iconClassName="bg-primary/15 text-primary"
						/>
						<StatCard
							value={25}
							label="Families fed"
							icon={LuSoup}
							className="bg-base-100/5 border-base-100/10 text-neutral-content backdrop-blur-sm"
							iconClassName="bg-primary/15 text-primary"
						/>
						<StatCard
							value={400}
							suffix="+"
							label="Lives reached"
							icon={LuUsers}
							className="bg-base-100/5 border-base-100/10 text-neutral-content backdrop-blur-sm"
							iconClassName="bg-primary/15 text-primary"
						/>
						<StatCard
							value={3}
							label="Countries served"
							icon={TbWorld}
							className="bg-base-100/5 border-base-100/10 text-neutral-content backdrop-blur-sm"
							iconClassName="bg-primary/15 text-primary"
						/>
					</CascadeAnimation>
				</div>
			</section>

			<section
				aria-labelledby="causes"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
					<SectionHeading
						eyebrow="Popular Causes"
						title="Find a cause and donate to them"
						subtitle="Your gift fuels the programmes that change lives every day."
						eyebrowIcon={LuHeart}
						align="left"
					/>
					<Link
						href="/programs"
						className="hidden lg:inline-flex btn btn-outline btn-primary rounded-full px-6 shrink-0">
						View all causes <LuArrowRight className="w-4 h-4" />
					</Link>
				</div>

				<CascadeAnimation
					animationDirection="down"
					threshold={0.1}
					parentClassName="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{causes.map((cause) => (
						<CauseCard key={cause.title} {...cause} />
					))}
				</CascadeAnimation>

				<div className="mt-10 text-center lg:hidden">
					<Link
						href="/programs"
						className="btn btn-outline btn-primary rounded-full px-6">
						View all causes <LuArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</section>

			<section
				aria-labelledby="values"
				className="grid lg:grid-cols-2 overflow-hidden">
				<div className="relative min-h-[420px] lg:min-h-full">
					<Image
						fill
						src="/images/more-people.jpg"
						alt="More people, more impact"
						className="object-cover"
						sizes="(min-width: 1024px) 50vw, 100vw"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-neutral/60 via-neutral/20 to-transparent" />
					<div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xs bg-base-100/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-base-300/60">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
								<LuHandHeart className="w-5 h-5" />
							</div>
							<div>
								<div className="text-sm font-bold text-neutral">
									Together we&apos;re stronger
								</div>
								<div className="text-xs text-neutral/60">
									Volunteer-led, community-driven
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-base-200 px-6 sm:px-12 py-14 space-y-8">
					<CascadeAnimation animationDirection="left">
						<SectionHeading
							eyebrow="Our Values"
							title="More people, more impact."
							align="left"
							eyebrowIcon={LuPersonStanding}
						/>
						<p className="text-neutral/70 mt-3">
							At Self Discovery Organization, our mission
							is to make a difference in the world. We
							believe that by coming together, we can
							create a greater impact and bring about
							positive change.
						</p>
					</CascadeAnimation>
					<CascadeAnimation
						animationDirection="down"
						parentClassName="space-y-5"
						animationDelay={0.4}>
						{[
							{
								title: "Transparency",
								desc: "We believe in open and honest communication with our supporters, partners, and beneficiaries.",
								icon: LuShield,
							},
							{
								title: "Strength",
								desc: "Our programmes empower individuals and communities to overcome challenges and reach their full potential.",
								icon: LuShrub,
							},
							{
								title: "Unity",
								desc: "When we come together as a community we can achieve remarkable, lasting things.",
								icon: LuUsers,
							},
						].map((value) => (
							<div
								key={value.title}
								className="group flex gap-5 p-5 bg-base-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
								<div className="w-14 h-14 rounded-2xl bg-primary text-primary-content flex justify-center items-center self-start shrink-0 group-hover:scale-105 transition-transform">
									<value.icon className="w-7 h-7" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors">
										{value.title}
									</h3>
									<p className="text-neutral/70 text-sm mt-1">
										{value.desc}
									</p>
								</div>
							</div>
						))}
					</CascadeAnimation>
				</div>
			</section>

			<section
				aria-labelledby="community-gallery"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<SectionHeading
					eyebrow="Our Community"
					title="The faces behind every story"
					subtitle="From classrooms in Lagos to outreaches in Harare — every smile is a reminder of why we do what we do."
					eyebrowIcon={LuUsers}
				/>
				<CascadeAnimation
					animationDirection="down"
					threshold={0.05}
					delayIncrement={0.08}
					parentClassName="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
					{galleryImages.map((src, idx) => (
						<div
							key={src}
							className={`group relative overflow-hidden rounded-2xl ${
								idx === 0 || idx === 5
									? "row-span-2 aspect-3/4 sm:aspect-auto"
									: "aspect-square"
							}`}>
							<Image
								src={src}
								alt="Self Discovery community"
								fill
								sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
								className="object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-neutral/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<span className="absolute bottom-3 left-3 right-3 text-base-100 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
								<LuHeart className="inline w-3.5 h-3.5 mr-1 text-primary" />
								Lives we&apos;re changing together
							</span>
						</div>
					))}
				</CascadeAnimation>
			</section>

			<Teams />

			<section
				aria-labelledby="donate-banner"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(31,41,51,0.94), rgba(31,41,51,0.55)), url(/images/collab-2.jpg)",
				}}
				className="relative text-center py-24 px-6 sm:px-10 space-y-6 bg-no-repeat bg-cover bg-center text-neutral-content overflow-hidden">
				<span className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
				<span className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
				<div className="relative max-w-4xl mx-auto space-y-6">
					<CascadeAnimation animationDirection="left">
						<span className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/30 text-primary text-xs uppercase tracking-[0.2em] font-bold rounded-full px-4 py-1.5">
							<LuHeart className="w-3.5 h-3.5" /> Be the
							reason
						</span>
						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-5 leading-tight">
							Your donation matters more than you know.
						</h2>
					</CascadeAnimation>
					<CascadeAnimation
						animationDirection="right"
						animationDelay={0.4}>
						<p className="max-w-2xl mx-auto opacity-90 text-base sm:text-lg">
							We rely on generous donations from people
							like you who share our vision. Every
							contribution directly supports families,
							children and communities in greatest need.
						</p>
					</CascadeAnimation>
					<CascadeAnimation
						animationDirection="down"
						animationDelay={0.7}
						duration={2}
						parentClassName="flex flex-wrap items-center justify-center gap-4 pt-4">
						<Link
							href="/support"
							className="btn btn-primary rounded-full px-8 shadow-xl hover:shadow-primary/40 transition-shadow">
							<LuHeart className="w-4 h-4" /> Donate now
						</Link>
						<Link
							href="/programs"
							className="btn btn-ghost rounded-full px-8 text-base-100 border border-base-100/40 hover:bg-base-100 hover:text-neutral">
							See our work <LuArrowRight className="w-4 h-4" />
						</Link>
					</CascadeAnimation>
				</div>
			</section>

			<section className="px-6 sm:px-10 max-w-7xl mx-auto">
				<div className="relative h-full w-full flex items-center justify-center">
					<div className="profileCard_container relative p-10 border-2 border-dashed rounded-full border-base-300">
						<button className="profile_item left-[45px] top-[-4px] absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcGraduationCap className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item right-[45px] top-[-4px] absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcHome className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item -left-4 top-20 absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcLike className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item -right-4 top-20 absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcPlanner className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item bottom-8 left-0 absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcBiotech className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item bottom-8 right-0 absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcConferenceCall className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item right-[40%] -bottom-4 absolute rounded-full bg-cover cursor-pointer border border-base-300 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
							<span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-2 bg-base-100 p-1">
								<FcGlobe className="w-[30px] h-[30px]" />
							</span>
						</button>
						<button className="profile_item w-[200px] h-[200px] p-1 border-2 rounded-full hover:border-base-300 cursor-pointer transition-all duration-500 z-0">
							<div className="w-full bg-base-100 h-full flex items-center justify-center p-2 rounded-full active:scale-95 hover:scale-95 object-cover transition-all duration-500">
								<span className="w-20 h-20 inline-block relative">
									<Image
										src={logo}
										alt="self discovery"
										fill
										sizes="80px"
									/>
								</span>
							</div>
						</button>
					</div>
				</div>

				<div className="py-10 px-5 text-center">
					<TextGenerateEffect
						words={
							"A helping hand can be a ray of sunshine in a cloudy world."
						}
						className="border text-2xl rounded-2xl italic border-dashed inline-block p-5 border-base-300"
					/>
				</div>
			</section>

			<section
				aria-labelledby="testimonials"
				className="px-6 sm:px-10 max-w-7xl mx-auto">
				<SectionHeading
					eyebrow="Associates"
					title="Voices from the field"
					subtitle="Hear from team leads, volunteers and partners around the world."
					eyebrowIcon={LuAward}
				/>
				<AnimatedTestimonials
					autoplay={true}
					testimonials={[
						{
							quote: "The impact of charity isn't in the size of the gift but in the love, care, and hope it carries into someone's heart.",
							name: "Rosemary Emmanuel",
							designation: "Team Lead, FCT",
							src: "/images/team/team-1.jpg",
						},
						{
							quote: "True giving is when you expect nothing in return but offer everything you can to light up someone else's life.",
							name: "Temi Esther Aiyegbayo",
							designation: "Team Lead, Ibadan",
							src: "/images/team/team-2.jpg",
						},
						{
							quote: "Charity is a universal language of love that reminds us we are never too small to make a difference in someone else's life.",
							name: "Wisdom Madunwe",
							designation: "Admin, FCT",
							src: "/images/team/team-3.jpg",
						},
						{
							quote: "Helping one person might not change the world, but it could change the world for that one person. That's the beauty of charity.",
							name: "Thompson Ubong",
							designation: "Team Lead, Lagos",
							src: "/images/team/team-4.jpg",
						},
						{
							quote: "Charity is not measured by how much you give but by the joy and hope your giving inspires in those who receive it.",
							name: "Faith Ojo",
							designation: "Admin, Lagos",
							src: "/images/team/team-5.jpg",
						},
						{
							quote: "When we give with open hands and hearts, we remind others that humanity is connected by compassion, love, and a shared purpose to uplift.",
							name: "Prosper Fortune",
							designation: "Team Lead, Imo",
							src: "/images/team/team-6.jpg",
						},
						{
							quote: "Every act of kindness, no matter how simple, plants a seed of hope in someone's life and blossoms into a brighter tomorrow.",
							name: "Rhema Obadife",
							designation: "Admin, Imo",
							src: "/images/team/team-7.jpg",
						},
						{
							quote: "True charity isn't about giving what's easy; it's about giving what makes a difference, no matter how small it seems to you.",
							name: "Tola Abigael Aiyegbayo",
							designation: "Admin, Ibadan",
							src: "/images/team/team-8.jpg",
						},
						{
							quote: "Charity is the bridge that connects those who can give with those in need, creating a world where kindness knows no limits.",
							name: "Dr Naison Gumbo",
							designation: "Regional Leader, Zimbabwe",
							src: "/images/team/team-9.jpg",
						},
					]}
				/>
			</section>

			<Suspense fallback={<div>Loading...</div>}>
				<ProgramListSummary />
			</Suspense>
		</>
	);
}

export default PublicHomePage;
