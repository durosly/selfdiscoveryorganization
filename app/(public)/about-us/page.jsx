import CascadeAnimation from "@/app/components/animations/cascade-animation";
import { StickyScroll } from "@/app/components/ui/sticky-scroll-reveal";
import roundImg from "@/public/images/banner-round.png";
import Image from "next/image";
import { LuBook, LuHexagon, LuStar } from "react-icons/lu";
import CoverImage from "../components/cover";
import ProgramListSummary from "../components/program-list";
import Teams from "../components/teams";
import { Suspense } from "react";

export const revalidate = 60;

export const metadata = {
	title: "About Us",
};

const content = [
	{
		title: "President/Founder",
		description: (
			<div className="space-y-2">
				<p>
					Dr. Uchenna John is an author, inspiring speaker, and
					visionary leader dedicated to transforming lives and
					empowering humanity. He is the founder of the Self-Discovery
					Organization, a charitable incorporated organization, a
					charitable incorporated organization with a vision to heal
					the world of its infirmities by uniting people with a sense
					of purpose.
				</p>
				<p>
					Guided by a deep passion for service to God and humanity,
					Dr. John is committed to uplifting individuals and
					communities through powerful sermons, insightful writings,
					and impactful charitable initiatives. His unwavering
					dedication continues to inspire countless lives, leaving a
					legacy of hope, unity, and transformation.
				</p>
			</div>
		),
		content: (
			<div className="h-full w-full  flex items-center justify-center text-white">
				<Image
					src="/images/team/president.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="President/Founder"
				/>
			</div>
		),
	},
	{
		title: "Co-founder and project manager",
		description: (
			<div className="space-y-2">
				<p>
					Dr. Jessica John is a General Practitioner and an
					accomplished entrepreneur. As the co-founder and project
					manager of the Self-Discovery Organization, she plays a
					pivotal role in leading initiatives that inspire purpose and
					empower communities.
				</p>
				<p>
					Dr John is Passionate about improving lives and combines her
					medical expertise, entrepreneurial spirit, and leadership
					skills to create meaningful impact. With an unwavering
					commitment to service, she continues to contribute to the
					betterment of individuals and society as a whole.
				</p>
			</div>
		),
		content: (
			<div className="h-full w-full  flex items-center justify-center text-white">
				<Image
					src="/images/team/co-president.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Co founder and project manager"
				/>
			</div>
		),
	},
	{
		title: "Director of operations and administration",
		description: (
			<div className="space-y-2">
				<p>
					Kingsley Chinedum Egbuchulam is a distinguished educator,
					administrator, human resource professional, and teens&apos;
					coach with an undying passion for shaping young minds and
					fostering personal growth in the younger generation. With
					years of experience, Kingsley has dedicated his life to the
					holistic development of individuals, especially teenagers,
					by providing them with the tools they need to thrive
					academically, emotionally, and socially. His mentorship has
					positively impacted countless young lives, instilling values
					that resonate far beyond the classroom.
				</p>
				<p>
					As an administrator, Kingsley has demonstrated exceptional
					leadership and organizational skills. He has successfully
					managed educational institutions and programs, ensuring they
					run efficiently while fostering an environment that
					encourages collaboration and growth. He also possesses a
					knack for identifying talent, nurturing potential, and
					creating strategies that align organizational goals with
					individual growth.
				</p>
				<p>
					Kingsley is an ardent lover of God, a musician, and a born
					leader who has served in diverse capacities. He is currently
					serving as the Director of Operations and Administration at
					the Self Discovery Organization International.
				</p>
			</div>
		),
		content: (
			<div className="h-full w-full  flex items-center justify-center text-white">
				<Image
					src="/images/team/admin.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Director of operations and administration"
				/>
			</div>
		),
	},
];

function AboutUsPage() {
	return (
		<>
			<CoverImage title="About Us" />

			<CascadeAnimation
				animationDirection="down"
				parentClassName="text-center px-10 py-20 sm:p-20">
				<h2 className="text-4xl sm:text-6xl font-bold">
					Making a Difference Together
				</h2>
				<p>
					Dedicated to making a positive impact on the world. Our
					mission is to empower individuals and communities, providing
					the support and resources they need to thrive.
				</p>
			</CascadeAnimation>

			<div className="px-10">
				<CascadeAnimation animationDirection="up">
					<h2 className="text-center text-2xl">
						<LuBook className="stroke-orange-400 inline-block" />{" "}
						Our Story
					</h2>
				</CascadeAnimation>
				<div className="flex flex-col sm:flex-row gap-5 mt-10">
					<div className="relative flex-1 h-48 aspect-video sm:aspect-auto sm:h-auto rounded-2xl overflow-hidden">
						<Image
							fill
							src="/images/make-difference.jpg"
							alt="Self Discovery"
							className="object-cover brightness-75"
						/>
					</div>
					<div className="flex-1">
						<CascadeAnimation animationDirection="up">
							<h3 className="text-4xl font-bold">
								The Struggle to Make a Difference
							</h3>
						</CascadeAnimation>
						<CascadeAnimation
							animationDirection="down"
							parentClassName="space-y-3 my-5">
							<p>
								SDO was founded in 2017 in Ukraine
								and officially registered in the UK
								in 2023. Our charitable incorporated
								organization is committed to healing
								the world of its infirmities by
								uniting people with a sense of
								purpose. We currently operate in the
								UK, Nigeria, and Zimbabwe.
							</p>
							<p>
								Through our Families and Prisoners
								Initiative(FAPI), we provide support
								to indigent families, homeless
								individuals, and prisoners, ensuring
								they receive the resources needed to
								thrive in society.
							</p>
							<p>
								Our Send a Child to School Scheme
								supplies academic materials to
								underprivileged children, empowering
								them to achieve academic excellence.
							</p>
							<p>
								In commemoration of World Menstrual
								Hygiene Day, we distribute sanitary
								products to young girls and women,
								promoting health, dignity, and
								menstrual education.
							</p>
							<p>
								In commemoration of World Menstrual
								Hygiene Day, we distribute sanitary
								products to young girls and women,
								promoting health, dignity, and
								menstrual education.
							</p>
							<p>
								We also host a monthly podcast where
								we encourage people to live
								purpose-driven lives.
							</p>
							<p>
								At the heart of our mission is a
								commitment to empower individuals
								and communities to overcome
								challenges and thrive through
								self-discovery, personal
								development, and collective action.
							</p>
						</CascadeAnimation>

						<div>
							<p className="font-bold">
								Self Discovery organization
							</p>
							<p className="text-xs italic">
								president/Founder
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row">
				<CascadeAnimation
					animationDirection="up"
					parentClassName="flex-1 border border-l-0 p-10 space-y-4">
					<h2 className="text-3xl font-bold">Our Mission</h2>
					<p>
						At Self Discovery organization, our mission is to
						make a meaningful and lasting impact on the world.
						We are dedicated to addressing some of the most
						pressing challenges that our global community faces,
						and we do so with a deep sense of purpose and
						commitment.
					</p>
					<p>
						Our mission is not just a statement; it&apos;s a
						driving force that guides everything we do. We
						strive to create positive change by providing
						support, resources, and solutions where they are
						needed most.
					</p>
					<ul className="list-disc list-inside">
						<li>Empowering individuals and communities.</li>
						<li>Promoting education and healthcare access.</li>
						<li>Advocating for social justice and equality.</li>
					</ul>
				</CascadeAnimation>
				<CascadeAnimation
					animationDirection="up"
					parentClassName="flex-1 bg-primary/10 p-10 space-y-4">
					<h2 className="text-3xl font-bold">Our Vision</h2>
					<p>
						At Self Discovery Organization, we envision a world
						where people can thrive, harness their full
						potential, and accomplish their purpose, regardless
						of who they are or where they come from. A world
						where opportunities are accessible to all, and the
						well-being of individuals is prioritized.
					</p>
					<p>
						Guided by our values of compassion, integrity, and
						innovation, we believe in the transformative power
						of collaboration and unity to create lasting change.
						We are committed to being a catalyst for positive
						transformation, working tirelessly toward a
						brighter, more inclusive future.
					</p>

					<p>Our goals are clear:</p>
					<ul className="list-disc list-inside">
						<li>
							A world where every child has access to
							quality education.
						</li>
						<li>
							A world where healthcare is a universal
							right, not a privilege.
						</li>
						<li>
							A world where individuals are empowered to
							become the best versions of themselves.
						</li>
						<li>
							A world where global poverty is reduced, and
							no one has to go to bed hungry.
						</li>
						<li>
							A world where global poverty is reduced, and
							no one has to go to bed hungry.
						</li>
					</ul>
				</CascadeAnimation>
			</div>

			<Teams />

			<div className="px-10 py-20">
				<CascadeAnimation
					animationDirection="up"
					parentClassName="text-center">
					<h2 className="text-2xl text-center">
						<LuStar className="inline-block stroke-success" />{" "}
						Team Bio
					</h2>
					<p className="text-4xl sm:text-6xl font-bold">
						Learn more about each member of the team
					</p>
				</CascadeAnimation>
				<StickyScroll content={content} />
			</div>

			<div className="flex flex-col sm:flex-row-reverse gap-10 px-10">
				<div className="flex-1 relative">
					<div className="relative">
						<div className="relative overflow-hidden w-full rounded-2xl aspect-square">
							<Image
								fill
								src="/images/collab-1.jpg"
								alt=""
								className="object-cover brightness-50"
							/>
						</div>
						<div className="absolute w-1/3 aspect-square rounded-full border-4 overflow-hidden bottom-0 right-10">
							<Image
								fill
								src="/images/collab-2.jpg"
								alt=""
								className="object-cover brightness-50"
							/>
						</div>
					</div>
					<div className="absolute top-0 w-full overflow-hidden">
						<Image
							src={roundImg}
							alt=""
							className="animate-[spin_20s_linear_infinite] object-contain"
						/>
					</div>
				</div>
				<div className="flex-1 space-y-5">
					<CascadeAnimation animationDirection="up">
						<h2 className="flex gap-1 items-center text-primary">
							<LuHexagon className="w-5 h-5" />
							TEAMWORK
						</h2>
						<h3 className="font-bold text-2xl sm:text-4xl">
							Empowering the World Through Collaborative
							Efforts
						</h3>
					</CascadeAnimation>
					<CascadeAnimation
						animationDirection="down"
						parentClassName="space-y-3">
						<p>
							We firmly believe in the power of teamwork
							and collaboration as catalysts for positive
							change. Our mission is to empower
							individuals, communities, and organizations
							to work together, transcending boundaries,
							and addressing some of the world&apos;s most
							pressing challenges.
						</p>
						<p>
							Collaboration is at the heart of our
							organization&apos;s philosophy. We
							understand that the world&apos;s problems
							are complex and interconnected, and they
							require collective action. Through strategic
							partnerships, innovative solutions, and a
							shared commitment to making a difference, we
							strive to create a better future for all.
						</p>
						<p>
							Our collaborative efforts span a wide range
							of initiatives, from healthcare and
							education to environmental conservation and
							social empowerment. We bring together
							experts, volunteers, and stakeholders from
							diverse backgrounds, fostering an
							environment where ideas flourish, knowledge
							is shared, and impactful projects are born.
						</p>
						<p>
							By harnessing the collective wisdom and
							resources of our global network, we aim to
							leave a lasting legacy of positive change.
							Together, we envision a world where teamwork
							is the driving force behind progress, where
							every challenge is an opportunity, and where
							the power of collaboration knows no bounds.
						</p>
					</CascadeAnimation>
				</div>
			</div>

			<Suspense fallback={<div>Loading...</div>}>
				<ProgramListSummary />
			</Suspense>
		</>
	);
}

export default AboutUsPage;
