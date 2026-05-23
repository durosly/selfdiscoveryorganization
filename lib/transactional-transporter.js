import nodemailer from "nodemailer";

const port = Number(process.env.TRANSACTIONAL_SMTP_PORT) || 587;

const transactionalTransporter = nodemailer.createTransport({
	host: process.env.TRANSACTIONAL_SMTP_SERVER,
	port,
	secure: port === 465,
	auth: {
		user: process.env.TRANSACTIONAL_SMTP_USERNAME,
		pass: process.env.TRANSACTIONAL_SMTP_PASSWORD,
	},
});

export default transactionalTransporter;
