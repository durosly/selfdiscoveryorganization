import ThankYouCelebration from "./thank-you-celebration";

export const metadata = {
	title: "Thank you for your gift",
	description: "Your donation to Self Discovery Organization has been received.",
	robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }) {
	const params = await searchParams;
	const sessionId = params?.session_id ?? null;

	return (
		<section className="bg-linear-to-b from-primary/5 via-base-100 to-base-200 min-h-[calc(100dvh-4rem)]">
			<ThankYouCelebration sessionId={sessionId} />
		</section>
	);
}
