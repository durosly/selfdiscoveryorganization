/**
 * Create or promote an owner account (role "owner") for the admin area.
 *
 * Requires MONGODB_URL (and optional MONGODB_NAME) in .env.local or .env.
 *
 * Usage:
 *   node scripts/add-owner.mjs --email you@org.com --password 'your-secure-password' [--name "Your Name"]
 *
 * Environment (alternative to flags):
 *   OWNER_EMAIL, OWNER_PASSWORD, OWNER_NAME
 *
 * If the user already exists, sets role to owner. With --password, sets or updates
 * the credential (email/password) login hash to match lib/auth.js (bcrypt, cost 12).
 */
import bcrypt from "bcryptjs";
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

const MIN_PASSWORD_LENGTH = 8;

function parseArgs(argv) {
	const out = {};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === "--email" || a === "-e") out.email = argv[++i];
		else if (a === "--password" || a === "-p") out.password = argv[++i];
		else if (a === "--name" || a === "-n") out.name = argv[++i];
		else if (a === "--help" || a === "-h") out.help = true;
	}
	return out;
}

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(12);
	return bcrypt.hash(password, salt);
}

async function addOwner() {
	const args = parseArgs(process.argv);
	if (args.help) {
		console.log(`
Create or promote an owner account.

  node scripts/add-owner.mjs --email <email> --password <password> [--name <display name>]

Environment: OWNER_EMAIL, OWNER_PASSWORD, OWNER_NAME

Requires MONGODB_URL in .env.local (optional MONGODB_NAME).
`);
		process.exit(0);
	}

	const emailRaw =
		args.email || process.env.OWNER_EMAIL || process.env.ADMIN_EMAIL;
	const password = args.password || process.env.OWNER_PASSWORD;
	const nameArg = args.name || process.env.OWNER_NAME;

	if (!emailRaw?.trim()) {
		console.error("Error: provide --email or set OWNER_EMAIL.");
		process.exit(1);
	}

	const email = emailRaw.trim().toLowerCase();
	const displayName =
		nameArg?.trim() ||
		email.split("@")[0].replace(/[._-]/g, " ");

	const MONGODB_URL = process.env.MONGODB_URL;
	const MONGODB_NAME = process.env.MONGODB_NAME;

	if (!MONGODB_URL) {
		console.error("Error: MONGODB_URL is required.");
		process.exit(1);
	}

	await mongoose.connect(MONGODB_URL);
	const client = mongoose.connection.getClient();
	const db = MONGODB_NAME ? client.db(MONGODB_NAME) : mongoose.connection.db;

	const usersCol = db.collection("users");
	const accountsCol = db.collection("account");

	const existing = await usersCol.findOne({ email });

	if (existing) {
		await usersCol.updateOne(
			{ _id: existing._id },
			{ $set: { role: "owner", name: displayName, updatedAt: new Date() } },
		);
		console.log(`Updated existing user to owner: ${email}`);

		if (password) {
			if (password.length < MIN_PASSWORD_LENGTH) {
				console.error(
					`Error: password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
				);
				process.exit(1);
			}
			const hash = await hashPassword(password);
			const cred = await accountsCol.findOne({
				userId: existing._id,
				providerId: "credential",
			});
			const now = new Date();
			if (cred) {
				await accountsCol.updateOne(
					{ _id: cred._id },
					{ $set: { password: hash, updatedAt: now } },
				);
				console.log("Credential password updated.");
			} else {
				await accountsCol.insertOne({
					accountId: existing._id.toString(),
					providerId: "credential",
					userId: existing._id,
					password: hash,
					createdAt: now,
					updatedAt: now,
				});
				console.log("Credential account created for existing user.");
			}
		} else {
			const cred = await accountsCol.findOne({
				userId: existing._id,
				providerId: "credential",
			});
			if (!cred) {
				console.warn(
					"No credential account found; sign-in may fail until you run with --password.",
				);
			}
		}

		await mongoose.disconnect();
		console.log("Done.");
		process.exit(0);
		return;
	}

	if (!password || typeof password !== "string") {
		console.error(
			"Error: password is required for a new user (--password or OWNER_PASSWORD).",
		);
		process.exit(1);
	}
	if (password.length < MIN_PASSWORD_LENGTH) {
		console.error(
			`Error: password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
		);
		process.exit(1);
	}

	const userId = new mongoose.Types.ObjectId();
	const now = new Date();
	const hash = await hashPassword(password);

	await usersCol.insertOne({
		_id: userId,
		email,
		name: displayName,
		emailVerified: false,
		image: null,
		createdAt: now,
		updatedAt: now,
		account_type: null,
		role: "owner",
	});

	await accountsCol.insertOne({
		accountId: userId.toString(),
		providerId: "credential",
		userId: userId,
		password: hash,
		createdAt: now,
		updatedAt: now,
	});

	console.log(`Created owner account: ${email}`);
	await mongoose.disconnect();
	console.log("Done.");
	process.exit(0);
}

addOwner().catch((err) => {
	console.error(err);
	process.exit(1);
});
