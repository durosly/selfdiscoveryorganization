/**
 * One-shot migration: copy legacy bcrypt hashes from `users.password` into
 * better-auth `account` documents (`providerId: "credential"`).
 *
 * Invite acceptance and `add-owner` only write the hash to `account`, not
 * `users.password`, so this script only helps **legacy** rows that still have
 * `users.password`. If you have a user with no credential row, use
 * `node scripts/add-owner.mjs --email … --password …` instead.
 *
 * Run: node scripts/migrate-credential-accounts.mjs
 * Requires MONGODB_URL in .env.local (or environment).
 */
import { existsSync, readFileSync } from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath) {
	if (!existsSync(filePath)) return;
	const raw = readFileSync(filePath, "utf8");
	for (let line of raw.split(/\r?\n/)) {
		line = line.trim();
		if (!line || line.startsWith("#")) continue;
		const eq = line.indexOf("=");
		if (eq === -1) continue;
		const key = line.slice(0, eq).trim();
		let val = line.slice(eq + 1).trim();
		if (
			(val.startsWith('"') && val.endsWith('"')) ||
			(val.startsWith("'") && val.endsWith("'"))
		) {
			val = val.slice(1, -1);
		}
		if (process.env[key] === undefined) process.env[key] = val;
	}
}

loadEnvFile(path.join(__dirname, "..", ".env.local"));
loadEnvFile(path.join(__dirname, "..", ".env"));

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;

/** Non-empty password string from legacy `users.password` (handles odd types). */
function normalizedUserPassword(raw) {
	if (raw == null) return null;
	if (typeof raw === "string") {
		const t = raw.trim();
		return t.length ? t : null;
	}
	if (Buffer.isBuffer(raw)) {
		const t = raw.toString("utf8").trim();
		return t.length ? t : null;
	}
	const t = String(raw).trim();
	return t.length ? t : null;
}

/** Credential row may store `userId` as ObjectId or hex string depending on writer. */
function credentialLookupFilter(userId) {
	const hex =
		userId instanceof mongoose.Types.ObjectId
			? userId.toHexString()
			: String(userId);
	return {
		providerId: "credential",
		$or: [{ userId: userId }, { userId: hex }],
	};
}

async function migrateCredentialAccounts() {
	if (!MONGODB_URL) {
		throw new Error("MONGODB_URL is required");
	}

	await mongoose.connect(MONGODB_URL);
	const client = mongoose.connection.getClient();
	const db = MONGODB_NAME ? client.db(MONGODB_NAME) : mongoose.connection.db;

	console.log("Connected to MongoDB");
	console.log(
		`Database: ${db.databaseName}${MONGODB_NAME ? ` (MONGODB_NAME=${MONGODB_NAME})` : " (default on connection string)"}`,
	);

	const accounts = db.collection("account");
	const usersCol = db.collection("users");

	const userCount = await usersCol.countDocuments();
	const credRowCount = await accounts.countDocuments({
		providerId: "credential",
	});
	console.log(
		`Totals: ${userCount} document(s) in "users", ${credRowCount} credential row(s) in "account"`,
	);

	const withPasswordKey = await usersCol
		.find({ password: { $exists: true, $ne: null } })
		.toArray();
	const users = withPasswordKey.filter((u) => normalizedUserPassword(u.password));

	console.log(
		`Users with a usable legacy users.password field: ${users.length} (candidates from ${withPasswordKey.length} with password key)`,
	);

	let created = 0;
	let skipped = 0;

	for (const user of users) {
		const hash = normalizedUserPassword(user.password);
		if (!hash) continue;

		const exists = await accounts.findOne(credentialLookupFilter(user._id));

		if (exists) {
			skipped++;
			continue;
		}

		await accounts.insertOne({
			accountId: user._id.toString(),
			providerId: "credential",
			userId: user._id,
			password: hash,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		created++;
	}

	console.log(`Created ${created} credential account(s)`);
	console.log(`Skipped ${skipped} existing account(s)`);

	const allUsers = await usersCol.find({}).toArray();
	const missingCredential = [];
	for (const u of allUsers) {
		const cred = await accounts.findOne(credentialLookupFilter(u._id));
		if (!cred) missingCredential.push(u.email || String(u._id));
	}
	if (missingCredential.length) {
		console.log("");
		console.log(
			`Users with no credential account row (${missingCredential.length}):`,
		);
		for (const id of missingCredential) console.log(`  - ${id}`);
		console.log(
			"If these accounts should sign in with email/password, run add-owner with --password for that email, or restore users.password and re-run this migration.",
		);
	}

	await mongoose.disconnect();
}

migrateCredentialAccounts()
	.then(() => {
		console.log("Done");
		process.exit(0);
	})
	.catch((err) => {
		console.error("Migration failed", err);
		process.exit(1);
	});
