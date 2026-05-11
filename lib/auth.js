import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import bcrypt from "bcryptjs";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { getClient } from "@/lib/connectDB";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { normalizeUserAccess } from "@/lib/permissions";

/** Stored bcrypt hashes start with `$2a$` / `$2b$` / `$2y$`. Better Auth defaults to scrypt (`salt:hex`). */
function isLegacyBcryptPasswordHash(hash) {
	return typeof hash === "string" && hash.startsWith("$2");
}

/**
 * After a successful email sign-in, replace bcrypt with the framework default hash (scrypt via better-auth/crypto).
 */
async function migratePasswordHashAfterEmailSignIn(ctx) {
	if (!ctx.path?.endsWith("/sign-in/email")) return {};
	const returned = ctx.context.returned;
	if (!returned || typeof returned !== "object" || !returned.token || !returned.user) return {};

	const email = ctx.body?.email;
	const password = ctx.body?.password;
	if (!email || !password) return {};

	try {
		const row = await ctx.context.internalAdapter.findUserByEmail(email, {
			includeAccounts: true,
		});
		const credential = row?.accounts?.find((a) => a.providerId === "credential");
		if (!credential?.id || !credential.password) return {};
		if (!isLegacyBcryptPasswordHash(credential.password)) return {};

		const newHash = await ctx.context.password.hash(password);
		await ctx.context.internalAdapter.updateAccount(credential.id, { password: newHash });
	} catch (err) {
		ctx.context.logger.error("Password hash migration failed", err);
	}
	return {};
}

const { client, db } = await getClient();

const trustedOrigins = [];
if (process.env.NEXT_PUBLIC_URL) {
	trustedOrigins.push(process.env.NEXT_PUBLIC_URL);
}

const authOptions = {
	database: mongodbAdapter(db, { client }),

	session: {
		expiresIn: 4 * 60 * 60, // 4 hours (parity with previous next-auth maxAge)
		updateAge: 60 * 60, // 1 hour (parity with previous updateAge)
	},

	user: {
		modelName: "users",
		additionalFields: {
			account_type: {
				type: "string",
				required: false,
			},
		},
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		password: {
			hash: hashPassword,
			verify: async ({ hash, password }) => {
				if (isLegacyBcryptPasswordHash(hash)) {
					return bcrypt.compare(password, hash);
				}
				return verifyPassword({ hash, password });
			},
		},
	},

	hooks: {
		after: migratePasswordHashAfterEmailSignIn,
	},

	plugins: [
		customSession(async ({ user, session }) => {
			const fullUser = await getUserByEmail(user.email);
			const access = normalizeUserAccess(fullUser);
			return {
				user: {
					...user,
					account_type: fullUser?.account_type ?? user.account_type ?? null,
					role: access.role,
					permissions: access.permissions,
				},
				session,
			};
		}),
		nextCookies(),
	],

	baseURL: process.env.NEXT_PUBLIC_URL,
	basePath: "/api/auth",
	secret: process.env.BETTER_AUTH_SECRET,
};

if (trustedOrigins.length) {
	authOptions.trustedOrigins = trustedOrigins;
}

export const auth = betterAuth(authOptions);
