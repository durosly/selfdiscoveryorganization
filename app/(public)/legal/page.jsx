import { BsFileEarmarkPdf } from "react-icons/bs";
import CoverImage from "../components/cover";
import CascadeAnimation from "@/app/components/animations/cascade-animation";

export const metadata = {
	title: "Legal Documents",
};

function LegalPage() {
	return (
		<>
			<CoverImage title="Legal" />
			<div className="px-5 sm:px-10">
				<CascadeAnimation animationDirection="right">
					<p>
						Find everything you need to know about our legal
						agreements and campaign terms and conditions.
					</p>
				</CascadeAnimation>

				<div className="my-10">
					<CascadeAnimation animationDirection="right">
						<h2 className="text-2xl font-bold">Documents</h2>
					</CascadeAnimation>
					<CascadeAnimation
						animationDirection="up"
						parentClassName="flex flex-wrap gap-10 mt-10">
						<a target="_blank" href="/docs/">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Certificate
						</a>
						<a target="_blank" href="/docs/">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Constitution
						</a>
						<a target="_blank" href="/docs/">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Trustees
						</a>
					</CascadeAnimation>
				</div>
				<CascadeAnimation>
					<p className="text-xs font-bold">
						For enquiries or complain, you can email us at{" "}
						<a href="mailto:team@chiomaorganization.com">
							team@chiomaorganization.com
						</a>
					</p>
				</CascadeAnimation>
			</div>
		</>
	);
}

export default LegalPage;
