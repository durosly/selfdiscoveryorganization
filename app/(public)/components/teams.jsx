import CascadeAnimation from "@/app/components/animations/cascade-animation";
import SectionHeading from "@/app/components/ui/section-heading";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

const team = [
	{
		name: "Dr. Uchenna John",
		role: "President / Founder",
		image: "/images/team/president.jpg",
	},
	{
		name: "Dr. Jessica John",
		role: "Co-founder & PM",
		image: "/images/team/co-president.jpg",
	},
	{
		name: "Kingsley Chinedum Egbuchulam",
		role: "Director of Operations & Administration",
		image: "/images/team/admin.jpg",
	},
];

function Teams() {
	return (
		<section
			aria-labelledby="team-heading"
			className="px-6 sm:px-10 max-w-7xl mx-auto">
			<SectionHeading
				eyebrow="Our Team"
				title="Meet the people behind the mission"
				subtitle="A purpose-driven team uniting communities across the UK, Nigeria and Zimbabwe."
				eyebrowIcon={LuStar}
			/>
			<CascadeAnimation
				animationDirection="down"
				parentClassName="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{team.map((member) => (
					<div
						key={member.name}
						className="group rounded-3xl overflow-hidden bg-base-100 border border-base-300/60 shadow-sm hover:shadow-xl transition-all">
						<div className="relative aspect-4/5 overflow-hidden">
							<Image
								fill
								src={member.image}
								alt={member.name}
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-neutral/70 via-transparent to-transparent" />
							<div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<a
									href="#"
									aria-label="Instagram"
									className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg">
									<FaInstagram className="w-4 h-4" />
								</a>
							</div>
						</div>
						<div className="p-5 text-center">
							<h3 className="font-bold text-lg text-neutral">
								{member.name}
							</h3>
							<p className="text-sm text-neutral/70">
								{member.role}
							</p>
						</div>
					</div>
				))}
			</CascadeAnimation>
		</section>
	);
}

export default Teams;
