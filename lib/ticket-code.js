import crypto from "crypto";

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Random ticket segment for display and lookup (unguessable enough for events).
 */
export function generateTicketSegment(length = 8) {
	const bytes = crypto.randomBytes(length);
	let out = "";
	for (let i = 0; i < length; i++) {
		out += ALPHABET[bytes[i] % ALPHABET.length];
	}
	return out;
}

/**
 * HMAC signature for QR payload: programId + ticketCode (prevents forged QR URLs).
 */
export function signTicketPayload(programId, ticketCode, secret) {
	const payload = `${programId}:${ticketCode}`;
	return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function getTicketSecret() {
	return (
		process.env.TICKET_SIGNING_SECRET ||
		process.env.BETTER_AUTH_SECRET ||
		""
	);
}

export function verifyTicketSignature(programId, ticketCode, sig, secret) {
	if (!sig || !programId || !ticketCode) return false;
	const expected = signTicketPayload(programId, ticketCode, secret);
	try {
		return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(sig, "hex"));
	} catch {
		return false;
	}
}
