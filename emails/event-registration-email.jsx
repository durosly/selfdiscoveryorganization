import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "react-email";

const baseUrl = process.env.NEXT_PUBLIC_URL;

/** Inline PNG attachment id (Nodemailer `attachments[].cid`); Gmail strips `data:` URLs but accepts CID images. */
export const REGISTRATION_EMAIL_QR_CID = "checkin-qr@selfdiscovery.email";

export const EventRegistrationEmail = ({
	name = "Friend",
	eventTitle = "Self Discovery Event",
	eventDate = "",
	eventLocation = "",
	status = "confirmed",
	eventUrl = baseUrl,
	ticketCode = "",
	checkInUrl = "",
	/** When true, HTML references an inline attachment with {@link REGISTRATION_EMAIL_QR_CID}. */
	includeCheckInQrImage = false,
}) => {
	const isWaitlisted = status === "waitlisted";
	return (
		<Html>
			<Head />
			<Preview>
				{isWaitlisted
					? `You're on the waitlist for ${eventTitle}`
					: `You're registered for ${eventTitle}`}
			</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[480px]">
						<Section className="mt-[24px] text-center">
							<Img
								src={`${baseUrl}/images/logo.png`}
								width="48"
								height="48"
								alt="Self Discovery Organization"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-[#1f2933] text-[22px] font-bold text-center mt-[24px] mb-[8px]">
							{isWaitlisted
								? "You're on the waitlist!"
								: "You're registered!"}
						</Heading>
						<Text className="text-[#1f2933] text-[14px] leading-[22px]">
							Hello {name},
						</Text>
						<Text className="text-[#1f2933] text-[14px] leading-[22px]">
							Thank you for registering for{" "}
							<strong>{eventTitle}</strong>.
							{isWaitlisted
								? " The event is currently full, but we've added you to the waitlist and will email you if a place opens up."
								: " We've saved your place — we look forward to seeing you there!"}
						</Text>
						{eventDate ? (
							<Text className="text-[#1f2933] text-[14px] leading-[22px]">
								<strong>When:</strong> {eventDate}
							</Text>
						) : null}
						{eventLocation ? (
							<Text className="text-[#1f2933] text-[14px] leading-[22px]">
								<strong>Where:</strong> {eventLocation}
							</Text>
						) : null}
						{ticketCode ? (
							<Section className="mt-[20px] p-[16px] bg-[#f9fafb] rounded-lg border border-solid border-[#e5e7eb]">
								<Text className="text-[#1f2933] text-[14px] font-semibold m-0 mb-[8px]">
									Your entry details
								</Text>
								<Text className="text-[#1f2933] text-[16px] font-mono font-bold tracking-wide m-0 mb-[12px]">
									{ticketCode}
								</Text>
								<Text className="text-[#6b7280] text-[12px] leading-[18px] m-0 mb-[12px]">
									Show this code or the QR below at check-in. Staff may also look you up by
									name or email.
								</Text>
								{includeCheckInQrImage ? (
									<Section className="text-center">
										<Img
											src={`cid:${REGISTRATION_EMAIL_QR_CID}`}
											width="220"
											height="220"
											alt="Check-in QR code"
											className="mx-auto block border border-solid border-[#e5e7eb] rounded-lg bg-white"
										/>
									</Section>
								) : null}
							</Section>
						) : null}
						<Section className="text-center mt-[24px]">
							<Link
								href={eventUrl}
								className="bg-[#f5a623] rounded-full text-white text-[14px] font-semibold no-underline px-[20px] py-[10px]">
								View event details
							</Link>
						</Section>
						<Text className="text-[#6b7280] text-[12px] leading-[18px] mt-[24px] text-center">
							Self Discovery Organization — UK-Registered
							Charity
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default EventRegistrationEmail;
