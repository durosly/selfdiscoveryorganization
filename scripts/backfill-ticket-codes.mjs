/**
 * One-off: assign ticketCode to EventRegistration docs missing it.
 * Run from repo root: node scripts/backfill-ticket-codes.mjs
 * Requires MONGODB_URI in environment.
 */
import crypto from "crypto";
import mongoose from "mongoose";

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
function generateTicketSegment(length = 8) {
	const bytes = crypto.randomBytes(length);
	let out = "";
	for (let i = 0; i < length; i++) {
		out += ALPHABET[bytes[i] % ALPHABET.length];
	}
	return out;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
	console.error("Set MONGODB_URI");
	process.exit(1);
}

const regSchema = new mongoose.Schema({}, { strict: false, collection: "eventregistrations" });
const EventRegistration =
	mongoose.models._BackfillReg ||
	mongoose.model("_BackfillReg", regSchema);

await mongoose.connect(uri);
const missing = await EventRegistration.find({
	$or: [{ ticketCode: { $exists: false } }, { ticketCode: null }, { ticketCode: "" }],
}).lean();

let n = 0;
for (const doc of missing) {
	let code = generateTicketSegment(8);
	let attempts = 0;
	while (attempts < 20) {
		const clash = await EventRegistration.findOne({
			program: doc.program,
			ticketCode: code,
		}).lean();
		if (!clash) break;
		code = generateTicketSegment(8);
		attempts++;
	}
	await EventRegistration.updateOne({ _id: doc._id }, { $set: { ticketCode: code } });
	n++;
}
console.log(`Backfilled ticketCode on ${n} registration(s).`);
await mongoose.disconnect();
