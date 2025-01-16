import { BsFileEarmarkPdf } from "react-icons/bs";
import CoverImage from "../components/cover";

export const metadata = {
	title: "Legal Documents",
};

function LegalPage() {
	return (
		<>
			<CoverImage title="Legal" />
			<div className="px-5 sm:px-10">
				<p>
					Find everything you need to know about our legal agreements
					and campaign terms and conditions.
				</p>

				<div className="my-10">
					<h2 className="text-2xl font-bold">Documents</h2>
					<div className="flex flex-wrap gap-10 mt-10">
						<a
							target="_blank"
							href="/docs/CHIOMA-ONWENONYE-ORGANIZATION-CERTIFICATE.pdf">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Certificate
						</a>
						<a
							target="_blank"
							href="/docs/CHIOMA-ONWENONYE-ORGANIZATION-TRUSTEES.pdf">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Constitution
						</a>
						<a
							target="_blank"
							href="/docs/CHIOMA-ONWENONYE-REG.pdf">
							<BsFileEarmarkPdf className="w-10 h-10 mx-auto" />
							Trustees
						</a>
					</div>
				</div>
				<div>
					<p className="text-xs font-bold">
						For enquiries or complain, you can email us at{" "}
						<a href="mailto:team@chiomaorganization.com">
							team@chiomaorganization.com
						</a>
					</p>
				</div>
			</div>
		</>
	);
}

export default LegalPage;
