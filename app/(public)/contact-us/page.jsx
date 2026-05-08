import CascadeAnimation from "@/app/components/animations/cascade-animation";
import { LuMail, LuMapPin, LuPhoneCall, LuSend } from "react-icons/lu";
import CoverImage from "../components/cover";
import ContactForm from "./components/contact-form";
import { LuClock3, LuHeart, LuSparkles } from "react-icons/lu";
import SectionHeading from "@/app/components/ui/section-heading";

export const metadata = {
	title: "Contact Us",
	description:
		"Get in touch with Self Discovery Organization. Email, call, or visit us — we respond to every enquiry within 24 hours.",
	openGraph: {
		title: "Contact Self Discovery Organization",
		description:
			"Email, call or send us a message — we'd love to hear from you.",
	},
};

function ContactUsPage() {
	return (
		<>
			<CoverImage title="Contact Us" />

			<section className="relative px-6 sm:px-10 py-16 sm:py-20">
				<div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
				<div className="relative max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-start">
						<div>
							<CascadeAnimation animationDirection="up">
								<SectionHeading
									eyebrow="Get in touch"
									title="We can&apos;t wait to hear from you"
									subtitle="Give us a call or drop by anytime. We answer all enquiries within 24 hours."
									align="left"
									eyebrowIcon={LuHeart}
								/>
								<div className="mt-6 flex flex-wrap gap-3">
									<span className="inline-flex items-center gap-2 rounded-full border border-base-300/70 bg-base-100 px-4 py-2 text-xs font-semibold text-neutral shadow-sm">
										<LuClock3 className="w-4 h-4 text-primary" />
										Reply within 24 hours
									</span>
									<span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold text-neutral shadow-sm">
										<LuSparkles className="w-4 h-4 text-primary" />
										Let&apos;s turn your message into impact
									</span>
								</div>
							</CascadeAnimation>

							<div className="mt-10">
								<ContactForm />
							</div>
						</div>

						<CascadeAnimation parentClassName="space-y-5">
							<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm hover:shadow-md transition-shadow">
								<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<LuMapPin className="w-6 h-6" />
								</div>
								<h3 className="font-bold text-neutral">Address</h3>
								<p className="mt-2 capitalize text-sm text-neutral/70 leading-relaxed">
									40 saint Austell avenue, Macclesfield,
									<br />
									SK10 3NN England,
									<br />
									United Kingdom
								</p>
							</div>

							<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm hover:shadow-md transition-shadow">
								<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<LuMail className="w-6 h-6" />
								</div>
								<h3 className="font-bold text-neutral">Email Us</h3>
								<a
									href="mailto:selfdiscoveryorganization@gmail.com"
									className="mt-2 inline-flex text-sm text-primary font-semibold hover:underline break-all">
									selfdiscoveryorganization@gmail.com
								</a>
							</div>

							<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm hover:shadow-md transition-shadow">
								<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<LuPhoneCall className="w-6 h-6" />
								</div>
								<h3 className="font-bold text-neutral">Phone numbers</h3>
								<div className="mt-3 flex flex-col gap-2 text-sm">
									<a
										href="tel:+447301046564"
										className="btn btn-outline btn-sm rounded-full justify-start gap-2 border-base-300/70">
										<span className="font-semibold">Call</span>
										<span className="text-neutral/70">+44 7301 046564</span>
									</a>
									<a
										href="https://wa.me/+447301046564"
										target="_blank"
										rel="noreferrer"
										className="btn btn-outline btn-sm rounded-full justify-start gap-2 border-base-300/70">
										<span className="font-semibold">WhatsApp</span>
										<span className="text-neutral/70">+44 7301 046564</span>
									</a>
								</div>
							</div>

							<div className="rounded-3xl bg-base-100 border border-base-300/60 p-6 shadow-sm hover:shadow-md transition-shadow">
								<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<LuSend className="w-6 h-6" />
								</div>
								<h3 className="font-bold text-neutral">Social Media</h3>
								<div className="mt-3 flex flex-col text-sm gap-2">
									<a
										href="https://x.com/selfdiscoveryog"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center text-neutral/70 hover:text-primary font-semibold">
										<span className="inline-flex items-center gap-1">X</span>
										<span>@selfdiscoveryog</span>
									</a>
									<a
										href="https://tiktok.com/@selfdiscoveryorg"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center text-neutral/70 hover:text-primary font-semibold">
										<span className="inline-flex items-center gap-1">TikTok</span>
										<span>@selfdiscoveryorg</span>
									</a>
									<a
										href="https://instagram.com/selfdiscoveryorganization"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center text-neutral/70 hover:text-primary font-semibold">
										<span className="inline-flex items-center gap-1">IG</span>
										<span>@selfdiscoveryorganization</span>
									</a>
									<a
										href="https://threads.net/selfdiscoveryorganization"
										target="_blank"
										rel="noreferrer"
										className="flex gap-2 items-center text-neutral/70 hover:text-primary font-semibold">
										<span className="inline-flex items-center gap-1">Thread</span>
										<span>@selfdiscoveryorganization</span>
									</a>
								</div>
							</div>
						</CascadeAnimation>
					</div>
				</div>
			</section>
		</>
	);
}

export default ContactUsPage;
