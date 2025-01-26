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
				<div className="max-w-md p-5 mx-auto bg-slate-100 rounded-md mb-10">
					<h3 className="text-2xl font-bold">Donation methods</h3>
					<CascadeAnimation parentClassName="space-y-3">
						<div>
							<h4 className="font-bold">Bank Transfer</h4>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Bank name:</span>
								<span>Virgin Money</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Account Name:</span>
								<span>
									Self Discovery Organization
								</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Account Type:</span>
								<span>Business</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>BIC:</span>
								<span>CLYDGB21842</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>IBAN:</span>
								<span>GB19CLYD82120800079508</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Sort Code:</span>
								<span>82-12-08</span>
							</p>
							<p className="flex flex-wrap gap-2 text-sm">
								<span>Account Number:</span>
								<span>00079508</span>
							</p>
						</div>
						{/* <div>
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
						</div> */}
					</CascadeAnimation>
				</div>

				<CascadeAnimation parentClassName="max-w-3xl p-5 mx-auto rounded-md space-y-4">
					<p>
						Self discovery organization is a Uk registered
						charity incorporated organization. At Self Discovery
						Organization, we are driven by a powerful vision: to
						help heal the world by uniting people with a sense
						of purpose. we believe that many of the world&apos;s
						greatest challenges stem from individuals who have
						not yet discovered their unique role in making our
						world a better place. Our mission is to reach out to
						individuals from all walks of life, empowering them
						to uncover and live out their purpose, creating a
						ripple effect of positive change in their
						communities.
					</p>

					<p>
						But achieving this vision means going beyond
						words—it requires tangible support. We recognize
						that to foster purpose, we must first help meet
						essential needs. That&apos;s why we organize charity
						events, from providing food to struggling families
						to funding tuition for children and young adults who
						may otherwise lack access to education. Each act of
						giving isn&apos;t just about providing relief;
						it&apos;s about inspiring lives, breaking cycles of
						poverty, and opening doors to self-discovery.
					</p>

					<p>
						We need your support to expand this life-changing
						work. By partnering with Self Discovery
						Organization, you&apos;re not just
						donating—you&apos;re investing in a future where
						more individuals find their purpose and use it to
						build stronger, healthier communities. Together, we
						can transform lives and create a world united in
						purpose and strength. Please join us on this
						mission; your support will make a lasting
						difference.
					</p>
				</CascadeAnimation>
			</div>
		</>
	);
}

export default SupportPage;
