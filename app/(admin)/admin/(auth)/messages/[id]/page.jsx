import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import Link from "next/link";
import DeleteBtn from "./components/delete-btn";

async function AdminMessageDetailsPage({ params: { id } }) {
	await connectMongo();
	const message = await MessageModel.findById(id);
	if (!message) {
		notFound();
	}

	message.read = true;
	await message.save();

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold mb-2">Message</h1>
			</div>
			<p>
				Date/Time:{" "}
				<span className="font-bold">
					{DateTime.fromJSDate(message.created_at).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</span>
			</p>
			<p>
				From: <span className="font-bold">{message.name}</span>
			</p>
			<p>
				Email: <span className="font-bold">{message.email}</span>
			</p>
			<p>
				Address: <span className="font-bold">{message.address}</span>
			</p>
			<div className="divider">Message</div>
			<pre>{message.message}</pre>

			<div className="text-right mt-10 mb-4">
				<Link
					href={`/admin/mailer?user=${message.name}&email=${message.email}`}
					className="btn btn-primary btn-sm"
				>
					Reply
				</Link>
			</div>
			<DeleteBtn id={message.id} />
		</div>
	);
}

export default AdminMessageDetailsPage;
