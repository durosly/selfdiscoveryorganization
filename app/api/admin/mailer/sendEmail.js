const { NextResponse } = require("next/server");
import { render } from "@react-email/render";
import MailUser from "@/emails/mail-user";
import transporter from "@/lib/transporter";

async function sendEmail(request) {
	try {
		const { email, message, title, username } = await request.json();

		if (!email) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Email cannot be empty",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} else if (!message) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Message cannot be empty",
				}),
				{
					status: 500,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		const html = render(
			<MailUser
				title={title}
				message={message}
				username={username}
			/>,
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

		return NextResponse.json({ status: true, message: "success" });
	} catch (error) {
		return new Response(
			JSON.stringify({
				status: false,
				message: error.message,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export default sendEmail;
