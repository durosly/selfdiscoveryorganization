import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const MailUser = ({
	username = "user",
	title = `Message from Choima Organization`,
	message = "Thank you for contacting us",
}) => {
	return (
		<Html>
			<Head />
			<Preview>{title}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/images/logo.png`}
								width="40"
								height="37"
								alt="Choima Organization"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							{title}
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							{message}
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default MailUser;
