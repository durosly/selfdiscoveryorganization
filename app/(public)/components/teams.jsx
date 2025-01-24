import CascadeAnimation from "@/app/components/animations/cascade-animation";
import Image from "next/image";
import { LuStar } from "react-icons/lu";

function Teams() {
	return (
		<div className="px-10">
			<CascadeAnimation animationDirection="up" parentClassName="text-center">
				<h2 className="text-2xl text-center">
					<LuStar className="inline-block stroke-success" /> Our Team
				</h2>
				<p className="text-4xl sm:text-6xl font-bold">
					Meet the team behind the establishment
				</p>
			</CascadeAnimation>
			<CascadeAnimation
				animationDirection="down"
				parentClassName="flex flex-wrap gap-5 sm:gap-10 justify-center mt-5">
				<div>
					<div className="relative w-40 mx-auto aspect-square rounded-full overflow-hidden border-4">
						<Image
							fill
							src="/images/president.jpg"
							alt="Dr. Uchenna John"
							className="object-cover"
							sizes="152px"
						/>
					</div>
					<div className="text-center">
						<h3 className="font-bold">Dr. Uchenna John</h3>
						<p>President/Founder</p>
					</div>
				</div>
				<div>
					<div className="relative w-40 mx-auto aspect-square rounded-full overflow-hidden border-4">
						<Image
							fill
							src="/images/co-president.jpg"
							alt="Dr. Jessica John"
							className="object-cover"
							sizes="152px"
						/>
					</div>
					<div className="text-center">
						<h3 className="font-bold">Dr. Jessica John</h3>
						<p>
							Co-founder &amp;{" "}
							<abbr title="project manager">PM</abbr>
						</p>
					</div>
				</div>
				<div>
					<div className="relative w-40 mx-auto aspect-square rounded-full overflow-hidden border-4">
						<Image
							fill
							src="https://images.pexels.com/photos/20336005/pexels-photo-20336005/free-photo-of-a-black-and-white-photo-of-a-woman-with-a-head-wrap.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Pierre"
							className="object-cover"
							sizes="152px"
						/>
					</div>
					<div className="text-center">
						<h3 className="font-bold">
							Kingsley Chinedum Egbuchulam
						</h3>
						<p>
							Director of operations <br />
							&amp; administration
						</p>
					</div>
				</div>

				{/* <div>
						<div className="relative w-40 mx-auto aspect-square rounded-full overflow-hidden border-4">
							<Image
								fill
								src="https://images.pexels.com/photos/30140701/pexels-photo-30140701/free-photo-of-stylish-portrait-of-a-person-with-red-curly-hair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt="Self Discovery"
								className="object-cover"
								sizes="152px"
							/>
						</div>
						<div className="text-center">
							<h3 className="font-bold">Grace C.,</h3>
							<p>Legal Adviser</p>
						</div>
					</div> */}
			</CascadeAnimation>
		</div>
	);
}

export default Teams;
