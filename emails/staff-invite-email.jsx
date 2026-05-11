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

export const StaffInviteEmail = ({
	inviteUrl = baseUrl,
	organizationName = "Self Discovery Organization",
}) => (
	<Html>
		<Head />
		<Preview>You&apos;re invited to join the admin team</Preview>
		<Tailwind>
			<Body className="bg-white my-auto mx-auto font-sans">
				<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[480px]">
					<Section className="mt-[24px] text-center">
						<Img
							src={`${baseUrl}/images/logo.png`}
							width="48"
							height="48"
							alt={organizationName}
							className="my-0 mx-auto"
						/>
					</Section>
					<Heading className="text-[#1f2933] text-[22px] font-bold text-center mt-[24px] mb-[8px]">
						Admin invitation
					</Heading>
					<Text className="text-[#1f2933] text-[14px] leading-[22px]">
						You&apos;ve been invited to help manage {organizationName}. Click the
						button below to choose a password and activate your account.
					</Text>
					<Section className="text-center mt-[24px]">
						<Link
							href={inviteUrl}
							className="bg-[#f5a623] rounded-full text-white text-[14px] font-semibold no-underline px-[20px] py-[10px]">
							Accept invitation
						</Link>
					</Section>
					<Text className="text-[#6b7280] text-[12px] leading-[18px] mt-[24px] text-center">
						If you didn&apos;t expect this email, you can ignore it.
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default StaffInviteEmail;
