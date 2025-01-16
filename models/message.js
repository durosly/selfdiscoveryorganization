import mongoose from "mongoose";
import { z } from "zod";
import paginate from "mongoose-paginate-v2";

const messageSchema = new mongoose.Schema({
	name: String,
	email: String,
	created_at: { type: Date, default: Date.now },
	address: String,
	message: String,
	read: { type: Boolean, default: false },
});

messageSchema.plugin(paginate);
messageSchema.index({
	name: "text",
	email: "text",
	address: "text",
	message: "text",
});
// messageSchema.index({ desc: "text" });
// messageSchema.index({ location: "text" });

const MessageModel =
	mongoose.models.Message || mongoose.model("Message", messageSchema);

const MessageValidationSchema = z.object({
	name: z.string().min(3),
	email: z.string().min(5),
	address: z.string(),
	message: z.string().min(2),
});

export { MessageValidationSchema };

export default MessageModel;
