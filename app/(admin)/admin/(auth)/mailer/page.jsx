import MailerForm from "./components/form";

function AdminMailerPage() {
	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold mb-2">Mailer</h1>
				<p className="text-xs">Send custom email to anyone</p>
			</div>
			<MailerForm />
		</div>
	);
}

export default AdminMailerPage;
