/**
 * One-shot migration: copy legacy bcrypt hashes from `users.password` into
 * better-auth `account` documents (`providerId: "credential"`).
 *
 * Run: npm run migrate:auth
 * Requires MONGODB_URL in .env.local (or environment).
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;

async function migrateCredentialAccounts() {
	if (!MONGODB_URL) {
		throw new Error("MONGODB_URL is required");
	}

	await mongoose.connect(MONGODB_URL);
	const client = mongoose.connection.getClient();
	const db = MONGODB_NAME ? client.db(MONGODB_NAME) : mongoose.connection.db;

	console.log("Connected to MongoDB");

	const accounts = db.collection("account");
	const usersCol = db.collection("users");

	const users = await usersCol
		.find({
			password: { $exists: true, $nin: [null, ""] },
		})
		.toArray();

	let created = 0;
	let skipped = 0;

	for (const user of users) {
		const exists = await accounts.findOne({
			userId: user._id,
			providerId: "credential",
		});

		if (exists) {
			skipped++;
			continue;
		}

		await accounts.insertOne({
			accountId: user._id.toString(),
			providerId: "credential",
			userId: user._id,
			password: user.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		created++;
	}

	console.log(`Created ${created} credential account(s)`);
	console.log(`Skipped ${skipped} existing account(s)`);

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
