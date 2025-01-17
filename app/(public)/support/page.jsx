import React from "react";
import { BsPaypal } from "react-icons/bs";
import CoverImage from "../components/cover";
import CascadeAnimation from "@/app/components/animations/cascade-animation";

export const metadata = {
	title: "Support",
};

function SupportPage() {
	return (
		<>
			<CoverImage title="support" />
			<h2 className="text-4xl text-center font-bold px-5 sm:px-10">
				Join us in helping millions of others in need
			</h2>
			<div className="px-5">
				<div className="max-w-md p-5 mx-auto bg-slate-100 rounded-md">
					<h3 className="text-2xl font-bold">Donation methods</h3>
					<CascadeAnimation parentClassName="space-y-3">
						<div>
							<h4 className="font-bold">Bank Transfer</h4>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Bank name:</span>
								<span>FCMB</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Account Name:</span>
								<span>
									Self Discovery Organization
								</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Account Number:</span>
								<span>2001075110</span>
							</p>
						</div>
						<div>
							<h4 className="font-bold">Crypto</h4>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Token:</span>
								<span>Bitcoin</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Address:</span>
								<span>
									bc1qt7d2q50lzlkue0fwqcja4u4kr43eutsz9gjlja
								</span>
							</p>
						</div>
						<div>
							<h4 className="font-bold">Paypal</h4>
							<a
								href="https://www.paypal.me/"
								target="_blank"
								className="btn btn-primary">
								<BsPaypal />
								<span>PayPal</span>
							</a>
						</div>
					</CascadeAnimation>
				</div>
			</div>
		</>
	);
}

export default SupportPage;
