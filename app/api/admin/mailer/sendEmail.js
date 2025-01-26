import MailUser from "@/emails/mail-user";
import transporter from "@/lib/transporter";
import { render } from "@react-email/render";

async function sendEmail(request) {
	try {
		const { email, message, title, username } = await request.json();

		if (!email) {
			return Response.json(
				{
					status: false,
					message: "Email cannot be empty",
				},
				{
					status: 400,
				}
			);
		} else if (!message) {
			return Response.json(
				{
					status: false,
					message: "Message cannot be empty",
				},
				{
					status: 500,
				}
			);
		}

		const html = render(
			<MailUser title={title} message={message} username={username} />,
			{
				pretty: true,
			}
		);

		const options = {
			from: `${process.env.SMTP_INFO} <${process.env.SMTP_USERNAME}>`,
			to: email,
			subject: title,
			html,
		};

		await transporter.sendMail(options);

		return Response.json({ status: true, message: "success" });
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: error.message,
			},
			{
				status: 500,
			}
		);
	}
}

export default sendEmail;
