import ThankYouCelebration, {
	DevPreviewBanner,
} from "./thank-you-celebration";

export const metadata = {
	title: "Thank you for your gift",
	description: "Your donation to Self Discovery Organization has been received.",
	robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }) {
	const params = await searchParams;
	const sessionId = params?.session_id ?? null;

	const isDev = process.env.NODE_ENV === "development";
	const preview =
		isDev &&
		(params?.preview === "1" || params?.preview === "true");

	const previewOptions = preview
		? {
			amount: params?.amount,
			name: params?.name,
			designation: params?.designation,
			recurring: params?.recurring,
		}
		: {};

	return (
		<section className="pt-10 sm:pt-14">
			{preview ? <DevPreviewBanner /> : null}
			<ThankYouCelebration
				sessionId={sessionId}
				preview={preview}
				previewOptions={previewOptions}
			/>
		</section>
	);
}
