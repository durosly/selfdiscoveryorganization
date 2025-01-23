import roundImg from "@/public/images/banner-round.png";
import Image from "next/image";
import Link from "next/link";
import {
	LuBook,
	LuCalendarDays,
	LuGrip,
	LuHexagon,
	LuMoveRight,
	LuNewspaper,
	LuStar,
} from "react-icons/lu";
import CoverImage from "../components/cover";
import CascadeAnimation from "@/app/components/animations/cascade-animation";
import Teams from "../components/teams";

export const metadata = {
	title: "About Us",
};

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
							src="https://images.pexels.com/photos/11742874/pexels-photo-11742874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Self Discovery"
							className="object-cover"
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
								In the early days, the journey to
								establish Choima Organization was
								far from easy. It began with a
								simple yet powerful idea: to make a
								meaningful impact on the world and
								uplift those in need. But turning
								that vision into reality was a
								formidable challenge.
							</p>
							<p>
								The path was marked by numerous
								obstacles and setbacks, each one a
								testament to the magnitude of the
								mission. Financial constraints,
								bureaucratic hurdles, and doubts
								from some quarters made the struggle
								very real. But the founders were
								undeterred, fueled by an unwavering
								commitment to their cause.
							</p>
							<p>
								Through perseverance, dedication,
								and the support of like-minded
								individuals, Self Discovery
								organization slowly but steadily
								gained momentum. It grew from a
								small idea into a full-fledged
								organization, determined to bring
								positive change to communities and
								lives around the world.
							</p>
							<p>
								Today, Choima Organization stands as
								a testament to the power of
								determination and the belief that
								even the most significant challenges
								can be overcome when people come
								together with a shared purpose. The
								struggle was real, but so was the
								passion to make a difference, and
								that passion continues to drive us
								forward.
							</p>
						</CascadeAnimation>

						<div>
							<p className="font-bold">Self Discovery</p>
							<p className="text-xs italic">
								CEO/Founder
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
						<li>
							Protecting the environment and natural
							resources.
						</li>
						<li>Advocating for social justice and equality.</li>
					</ul>
				</CascadeAnimation>
				<CascadeAnimation
					animationDirection="up"
					parentClassName="flex-1 bg-primary/10 p-10 space-y-4">
					<h2 className="text-3xl font-bold">Our Vision</h2>
					<p>
						Our vision at Self Discovery organization is a world
						where hope, opportunity, and well-being are
						accessible to all. We envision a future where our
						mission has been realized, and communities thrive,
						individuals prosper, and the planet flourishes.
					</p>
					<p>
						To achieve this vision, we work tirelessly, guided
						by our values of compassion, integrity, and
						innovation. We believe in a world where
						collaboration and unity are the driving forces
						behind progress, and we are committed to being a
						catalyst for positive change.
					</p>
					<ul className="list-disc list-inside">
						<li>
							A world where every child has access to
							quality education.
						</li>
						<li>
							A world where healthcare is a basic right,
							not a privilege.
						</li>
						<li>
							A world where the environment is protected
							for future generations.
						</li>
						<li>
							A world where social justice and equality
							are upheld.
						</li>
					</ul>
				</CascadeAnimation>
			</div>

			<Teams />

			<div className="flex flex-col sm:flex-row-reverse gap-10 px-10">
				<div className="flex-1 relative">
					<div className="relative">
						<div className="relative overflow-hidden w-full rounded-2xl aspect-square">
							<Image
								fill
								src="https://images.pexels.com/photos/1198171/pexels-photo-1198171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
							/>
						</div>
						<div className="absolute w-1/3 aspect-square rounded-full border-4 overflow-hidden bottom-0 right-10">
							<Image
								fill
								src="https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
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

			<div className="px-10">
				<CascadeAnimation animationDirection="up">
					<h2 className="text-xl">
						<LuNewspaper className="inline-block stroke-indigo-700" />{" "}
						Latest Blog
					</h2>
					<p className="text-4xl font-bold">
						Latest news, articles and events
					</p>
				</CascadeAnimation>

				<CascadeAnimation
					animationDirection="down"
					animationDelay={0.5}
					parentClassName="flex flex-col sm:flex-row gap-5 flex-wrap mt-10">
					<div className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10">
						<div className=" h-32 relative rounded-xl overflow-hidden">
							<Image
								fill
								src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
							/>
						</div>
						<div className=" space-y-2 mt-5">
							<p className="text-slate-500 flex gap-2 items-center">
								<LuCalendarDays className="inline-block stroke-current" />{" "}
								27/04/2024
							</p>
							<h2 className="font-semibold text-2xl">
								Build secure life for the poor
							</h2>
							<p>
								Lorem ipsum dolor sit amet
								consectetur, adipisicing elit.
								Asperiores esse quae veniam...
							</p>
							<div className="text-right">
								<Link
									href="/"
									className="link link-hover">
									Read more{" "}
									<LuMoveRight className="inline stroke-primary" />
								</Link>
							</div>
						</div>
					</div>
					<div className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10">
						<div className=" h-32 relative rounded-xl overflow-hidden">
							<Image
								fill
								src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
							/>
						</div>
						<div className=" space-y-2 mt-5">
							<p className="text-slate-500 flex gap-2 items-center">
								<LuCalendarDays className="inline-block stroke-current" />{" "}
								27/04/2024
							</p>
							<h2 className="font-semibold text-2xl">
								Build secure life for the poor
							</h2>
							<p>
								Lorem ipsum dolor sit amet
								consectetur, adipisicing elit.
								Asperiores esse quae veniam...
							</p>
							<div className="text-right">
								<Link
									href="/"
									className="link link-hover">
									Read more{" "}
									<LuMoveRight className="inline stroke-primary" />
								</Link>
							</div>
						</div>
					</div>
					<div className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10">
						<div className=" h-32 relative rounded-xl overflow-hidden">
							<Image
								fill
								src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
							/>
						</div>
						<div className=" space-y-2 mt-5">
							<p className="text-slate-500 flex gap-2 items-center">
								<LuCalendarDays className="inline-block stroke-current" />{" "}
								27/04/2024
							</p>
							<h2 className="font-semibold text-2xl">
								Build secure life for the poor
							</h2>
							<p>
								Lorem ipsum dolor sit amet
								consectetur, adipisicing elit.
								Asperiores esse quae veniam...
							</p>
							<div className="text-right">
								<Link
									href="/"
									className="link link-hover">
									Read more{" "}
									<LuMoveRight className="inline stroke-primary" />
								</Link>
							</div>
						</div>
					</div>
					<div className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10">
						<div className=" h-32 relative rounded-xl overflow-hidden">
							<Image
								fill
								src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
							/>
						</div>
						<div className=" space-y-2 mt-5">
							<p className="text-slate-500 flex gap-2 items-center">
								<LuCalendarDays className="inline-block stroke-current" />{" "}
								27/04/2024
							</p>
							<h2 className="font-semibold text-2xl">
								Build secure life for the poor
							</h2>
							<p>
								Lorem ipsum dolor sit amet
								consectetur, adipisicing elit.
								Asperiores esse quae veniam...
							</p>
							<div className="text-right">
								<Link
									href="/"
									className="link link-hover">
									Read more{" "}
									<LuMoveRight className="inline stroke-primary" />
								</Link>
							</div>
						</div>
					</div>
					<div className="sm:w-[calc((100%_-_2_*_1.25rem_)_/_3)] rounded-xl overflow-hidden p-3 bg-primary/10">
						<div className=" h-32 relative rounded-xl overflow-hidden">
							<Image
								fill
								src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
								className="object-cover"
							/>
						</div>
						<div className=" space-y-2 mt-5">
							<p className="text-slate-500 flex gap-2 items-center">
								<LuCalendarDays className="inline-block stroke-current" />{" "}
								27/04/2024
							</p>
							<h2 className="font-semibold text-2xl">
								Build secure life for the poor
							</h2>
							<p>
								Lorem ipsum dolor sit amet
								consectetur, adipisicing elit.
								Asperiores esse quae veniam...
							</p>
							<div className="text-right">
								<Link
									href="/"
									className="link link-hover">
									Read more{" "}
									<LuMoveRight className="inline stroke-primary" />
								</Link>
							</div>
						</div>
					</div>
				</CascadeAnimation>
			</div>
		</>
	);
}

export default AboutUsPage;
