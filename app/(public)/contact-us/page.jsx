import CascadeAnimation from "@/app/components/animations/cascade-animation";
import { LuMail, LuMapPin, LuPhoneCall, LuSend } from "react-icons/lu";
import CoverImage from "../components/cover";
import ContactForm from "./components/contact-form";

export const metadata = {
	title: "Contact Us",
};

function ContactUsPage() {
	return (
		<>
			<CoverImage title="Contact Us" />

			<div className="px-10">
				<CascadeAnimation animationDirection="up">
					<h2 className="text-4xl font-bold">
						We can&apos;t wait to here from you
					</h2>
					<p>
						Give us a call or drop by anytime, we answer all
						enquiries within 24 hours.
					</p>
				</CascadeAnimation>

				<div className="flex flex-col md:flex-row gap-20 sm:gap-10 mt-10">
					<ContactForm />
					<CascadeAnimation parentClassName="flex-1 space-y-5">
						<div className="flex gap-4 sm:gap-10">
							<LuMapPin className="stroke-primary w-10 md:w-20 h-10 md:h-20" />
							<div>
								<h3 className="font-bold mb-2">
									Address
								</h3>
								<p className="capitalize text-sm">
									40 saint Austell avenue
									Macclesfield,
									<br /> SK10 3nn England,
									<br /> United Kingdom
								</p>
							</div>
						</div>
						<div className="flex gap-4 sm:gap-10">
							<LuMail className="stroke-primary w-10 md:w-20 h-10 md:h-20" />
							<div>
								<h3 className="font-bold mb-2">
									Email Us
								</h3>
								<a
									href="mailto:selfdiscoveryorganization@gmail.com"
									className="text-sm">
									selfdiscoveryorganization@gmail.com
								</a>
							</div>
						</div>
						<div className="flex gap-4 sm:gap-10">
							<LuPhoneCall className="stroke-primary w-10 md:w-20 h-10 md:h-20" />
							<div>
								<h3 className="font-bold mb-2">
									Phonenumbers
								</h3>
								<div className="flex flex-col gap-0.5 text-sm">
									<a href="tel:+447301046564">
										<span>Call:</span>
										<span>
											+447301046564
										</span>
									</a>
									<a
										href="https://wa.me/+447301046564"
										target="_blank">
										<span>
											Whatsapp:
										</span>
										<span>
											+447301046564
										</span>
									</a>
								</div>
							</div>
						</div>
						<div className="flex gap-4 sm:gap-10">
							<LuSend className="stroke-primary w-10 md:w-20 h-10 md:h-20" />
							<div>
								<h3 className="font-bold mb-2">
									Social Media
								</h3>
								<div className="flex flex-col text-sm gap-0.5">
									<a
										href="https://x.com/selfdiscoveryog"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center">
										<span className="inline-flex items-center gap-1">
											X:
										</span>
										<span>
											@selfdiscoveryog
										</span>
									</a>
									<a
										href="https://tiktok.com/@selfdiscoveryorg"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center">
										<span className="inline-flex items-center gap-1">
											TikTok:
										</span>
										<span>
											@selfdiscoveryorg
										</span>
									</a>
									<a
										href="https://instagram.com/selfdiscoveryorganization"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center">
										<span className="inline-flex items-center gap-1">
											IG:
										</span>
										<span>
											@selfdiscoveryorganization
										</span>
									</a>
									<a
										href="https://threads.net/selfdiscoveryorganization"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center">
										<span className="inline-flex items-center gap-1">
											Thread:
										</span>
										<span>
											@selfdiscoveryorganization
										</span>
									</a>
								</div>
							</div>
						</div>
					</CascadeAnimation>
				</div>
			</div>
		</>
	);
}

export default ContactUsPage;
